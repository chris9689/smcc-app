import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Disclaimer } from '@/components/ui/Card';
import { formatYen } from '@/hooks/utils';
import {
  museFaqById,
  museFlowById,
  museProductById,
  museSuggestedFlowIdsByUser,
  museGreeting,
  matchMuseFlow,
  type MuseFlow,
  type MuseProduct,
} from '@/mock-data/muse';

interface MuseMessage {
  id: string;
  role: 'muse' | 'user';
  text: string;
  productIds?: string[];
  faqId?: string;
  followUp?: string;
}

let msgSeq = 0;
const nextId = () => `m${++msgSeq}`;

/** Chapter 7 — Shopping Muse: conversational marketplace + FAQ support. */
export function MuseScreen() {
  const { appUser, appUserProfile } = useDemo();
  const firstName = appUserProfile.name.split(' ')[0];

  const [messages, setMessages] = useState<MuseMessage[]>(() => [
    { id: nextId(), role: 'muse', text: museGreeting(appUser, firstName) },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [followUps, setFollowUps] = useState<MuseFlow[]>([]);
  const [cart, setCart] = useState<MuseProduct | null>(null);
  const [purchased, setPurchased] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pushMuse = (flow: MuseFlow) => {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      const reply: MuseMessage = {
        id: nextId(),
        role: 'muse',
        text: flow.answer,
        productIds: flow.productIds,
        faqId: flow.faqId,
        followUp: flow.followUp,
      };
      setMessages((m) => [...m, reply]);
      setFollowUps(
        (flow.followUpIds ?? [])
          .map((id) => museFlowById(id))
          .filter((f): f is MuseFlow => Boolean(f)),
      );
    }, 650);
    timers.current.push(t);
  };

  const send = (flow: MuseFlow, label?: string) => {
    setShowChips(false);
    setFollowUps([]);
    const userMsg: MuseMessage = { id: nextId(), role: 'user', text: label ?? flow.prompt };
    setMessages((m) => [...m, userMsg]);
    pushMuse(flow);
  };

  const resetChat = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMessages([{ id: nextId(), role: 'muse', text: museGreeting(appUser, firstName) }]);
    setInput('');
    setTyping(false);
    setShowChips(true);
    setFollowUps([]);
    setCart(null);
    setPurchased(false);
  };

  const handleFreeText = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setShowChips(false);
    setFollowUps([]);
    const userMsg: MuseMessage = { id: nextId(), role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    const flow = matchMuseFlow(text);
    if (flow) {
      pushMuse(flow);
    } else {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        const reply: MuseMessage = {
          id: nextId(),
          role: 'muse',
          text: "I can help you shop with cashback or answer a question about your card. Try one of these to get started:",
        };
        setMessages((m) => [...m, reply]);
        setShowChips(true);
      }, 650);
      timers.current.push(t);
    }
  };

  const suggested = (museSuggestedFlowIdsByUser[appUser] ?? [])
    .map((id) => museFlowById(id))
    .filter((f): f is MuseFlow => Boolean(f));

  const openCheckout = (p: MuseProduct) => {
    setPurchased(false);
    setCart(p);
  };

  const cashbackYen = cart ? Math.round((cart.price * cart.cashbackPct) / 100) : 0;

  return (
    <Screen chapterId={7}>
      <div className="flex h-full flex-col gap-3 pt-2">
        {/* Assistant identity header */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-3 shadow-card">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full brand-gradient text-white">
            <Icon name="auto_awesome" filled className="text-lg" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-base font-bold text-on-surface">Shopping Muse</p>
            <p className="truncate text-[11px] text-on-surface-variant">
              Shop with cashback · get answers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {messages.length > 1 && (
              <button
                type="button"
                onClick={resetChat}
                aria-label="Back to Muse start"
                title="Back to start"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-container-high bg-surface-container-low text-on-surface-variant transition-colors hover:text-primary active:scale-90"
              >
                <Icon name="arrow_back" className="text-lg" />
              </button>
            )}
            <span className="rounded-full bg-secondary-fixed px-2.5 py-1 text-[10px] font-bold text-secondary">
              AI
            </span>
          </div>
        </div>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto no-scrollbar pb-1"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} onBuy={openCheckout} />
          ))}

          {typing && (
            <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-md bg-surface-container-low px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-on-surface-variant"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          )}

          {/* Suggested prompt chips */}
          <AnimatePresence>
            {showChips && !typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-2"
              >
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggested.map((flow) => (
                    <button
                      key={flow.id}
                      type="button"
                      onClick={() => send(flow)}
                      className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-surface-container-lowest px-3 py-2 text-left text-xs font-semibold text-primary shadow-sm transition-colors hover:bg-primary/[0.04] active:scale-95"
                    >
                      <Icon
                        name={
                          flow.category === 'shop'
                            ? 'shopping_bag'
                            : flow.category === 'cashback'
                              ? 'savings'
                              : 'help'
                        }
                        className="text-sm"
                      />
                      {flow.prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Follow-up prompt chips offered after a Muse reply */}
          <AnimatePresence>
            {followUps.length > 0 && !typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-2"
              >
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted">
                  You might also ask
                </p>
                <div className="flex flex-wrap gap-2">
                  {followUps.map((flow) => (
                    <button
                      key={flow.id}
                      type="button"
                      onClick={() => send(flow)}
                      className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-surface-container-lowest px-3 py-2 text-left text-xs font-semibold text-primary shadow-sm transition-colors hover:bg-primary/[0.04] active:scale-95"
                    >
                      <Icon
                        name={
                          flow.category === 'shop'
                            ? 'shopping_bag'
                            : flow.category === 'cashback'
                              ? 'savings'
                              : 'help'
                        }
                        className="text-sm"
                      />
                      {flow.prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-lowest p-1.5 shadow-card">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFreeText();
            }}
            placeholder="Ask Muse to shop or help…"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
            aria-label="Message Shopping Muse"
          />
          <button
            type="button"
            onClick={handleFreeText}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform active:scale-90"
          >
            <Icon name="arrow_upward" className="text-lg" />
          </button>
        </div>

        <Disclaimer>Conversational assistant is illustrative and for demonstration only.</Disclaimer>
      </div>

      {/* Checkout / transaction modal */}
      <Modal open={Boolean(cart)} onClose={() => setCart(null)} title={purchased ? undefined : 'Checkout'}>
        {cart && !purchased && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-3">
              <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl brand-gradient-soft text-3xl">
                {cart.emoji}
                {cart.image && (
                  <img
                    src={cart.image}
                    alt={cart.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-bold text-ink">{cart.name}</p>
                <p className="text-[11px] text-muted">{cart.brand}</p>
              </div>
              <p className="font-heading text-sm font-bold text-ink">{formatYen(cart.price)}</p>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-primary/25 bg-primary/[0.05] px-3 py-2.5">
              <span className="flex items-center gap-2 text-xs font-bold text-primary">
                <Icon name="savings" filled className="text-base" />
                Cashback ({cart.cashbackPct}%)
              </span>
              <span className="font-heading text-sm font-extrabold text-primary">
                +{formatYen(cashbackYen)}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-surface-container-low px-3 py-2 text-[11px] text-muted">
              <Icon name="credit_card" className="text-base text-on-surface-variant" />
              Paying with your SMCC card ·••• 4820
            </div>

            <Button fullWidth size="lg" onClick={() => setPurchased(true)}>
              Pay {formatYen(cart.price)}
            </Button>
            <button
              type="button"
              onClick={() => setCart(null)}
              className="text-center text-xs font-bold text-on-surface-variant"
            >
              Keep browsing
            </button>
          </div>
        )}

        {cart && purchased && (
          <div className="flex flex-col items-center gap-3 text-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-white"
            >
              <Icon name="check" filled className="text-3xl" />
            </motion.span>
            <h3 className="font-heading text-lg font-extrabold text-ink">Purchase complete</h3>
            <p className="text-sm text-muted">
              {cart.name} is on its way. <span className="font-bold text-primary">{formatYen(cashbackYen)} cashback</span> will
              be credited to your SMCC card.
            </p>
            <Button fullWidth size="md" className="mt-1" onClick={() => setCart(null)}>
              Back to Muse
            </Button>
          </div>
        )}
      </Modal>
    </Screen>
  );
}

/** A single chat bubble, optionally with shoppable product cards or an FAQ card. */
function MessageBubble({ msg, onBuy }: { msg: MuseMessage; onBuy: (p: MuseProduct) => void }) {
  const isMuse = msg.role === 'muse';
  const faq = msg.faqId ? museFaqById(msg.faqId) : undefined;
  const products = (msg.productIds ?? [])
    .map((id) => museProductById(id))
    .filter((p): p is MuseProduct => Boolean(p));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={isMuse ? 'flex flex-col items-start gap-2' : 'flex flex-col items-end gap-2'}
    >
      <div
        className={
          isMuse
            ? 'max-w-[85%] rounded-2xl rounded-bl-md bg-surface-container-low px-4 py-3 text-sm leading-relaxed text-on-surface'
            : 'max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-white'
        }
      >
        {msg.text}
      </div>

      {/* FAQ answer card */}
      {faq && (
        <div className="w-[92%] rounded-2xl border border-secondary/25 bg-secondary-fixed/40 p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold text-secondary">
            <Icon name="support_agent" filled className="text-base" />
            {faq.question}
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-on-surface">{faq.answer}</p>
        </div>
      )}

      {/* Shoppable product cards */}
      {products.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-3 shadow-card"
            >
              <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl brand-gradient-soft text-3xl">
                {p.emoji}
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate font-heading text-sm font-bold text-on-surface">{p.name}</p>
                  {p.tag && (
                    <span className="shrink-0 rounded-full bg-tertiary-fixed px-1.5 py-0.5 text-[9px] font-bold text-tertiary">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="truncate text-[11px] text-on-surface-variant">{p.brand} · {p.blurb}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    {formatYen(p.price)}
                  </span>
                  <span className="flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    <Icon name="savings" filled className="text-[13px]" />
                    {p.cashbackPct}% back
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onBuy(p)}
                className="shrink-0 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-white transition-transform active:scale-95"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Follow-up question from Muse */}
      {msg.followUp && (
        <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface-container-low px-4 py-3 text-sm leading-relaxed text-on-surface">
          {msg.followUp}
        </div>
      )}
    </motion.div>
  );
}
