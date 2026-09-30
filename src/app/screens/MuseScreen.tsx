import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemo } from '@/app/DemoContext';
import { Screen } from './Screen';
import { Icon } from '@/components/ui/Icon';
import { Disclaimer } from '@/components/ui/Card';
import { formatYen } from '@/hooks/utils';
import { feedMetaFor, formatDistance } from '@/services/feedRanking';
import {
  museFaqById,
  museFlowById,
  museProductById,
  museSuggestedFlowIdsByUser,
  museCategoryChipsByUser,
  museGreeting,
  matchMuseFlow,
  vPointsFor,
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
  /** Redeem confirmation payload — closes the discover→shop→earn→redeem loop. */
  redeemed?: { name: string; category?: string; points: number; newBalance: number };
}

let msgSeq = 0;
const nextId = () => `m${++msgSeq}`;

/** Chapter 7 — SMCC Agent: conversational marketplace + FAQ support. */
export function MuseScreen() {
  const { appUser, appUserProfile, pointsBalance, addPoints, setRedeemCategory, addRedeemedProduct, goToChapter } =
    useDemo();
  const firstName = appUserProfile.name.split(' ')[0];

  const [messages, setMessages] = useState<MuseMessage[]>(() => [
    { id: nextId(), role: 'muse', text: museGreeting(appUser, firstName) },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [followUps, setFollowUps] = useState<MuseFlow[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const didInit = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Keep the agent's first message in view on entry; auto-scroll only after that.
    if (!didInit.current) {
      didInit.current = true;
      el.scrollTo({ top: 0 });
      return;
    }
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
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
    didInit.current = false;
    setMessages([{ id: nextId(), role: 'muse', text: museGreeting(appUser, firstName) }]);
    setInput('');
    setTyping(false);
    setShowChips(true);
    setFollowUps([]);
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

  const categoryChips = museCategoryChipsByUser[appUser] ?? [];

  const sendChip = (flowId: string) => {
    const flow = museFlowById(flowId);
    if (flow) send(flow);
  };

  // Redeem closes the loop: earn points now, and re-rank the feed by category.
  const redeem = (p: MuseProduct) => {
    const points = vPointsFor(p.price);
    const newBalance = pointsBalance + points;
    addPoints(points);
    if (p.category) setRedeemCategory(p.category);
    addRedeemedProduct(p.id);
    setMessages((m) => [
      ...m,
      {
        id: nextId(),
        role: 'muse',
        text: '',
        redeemed: { name: p.name, category: p.category, points, newBalance },
      },
    ]);
  };

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
            <p className="truncate font-heading text-base font-bold text-on-surface">SMCC Agent</p>
            <p className="truncate text-[11px] text-on-surface-variant">
              Shop with cashback · get answers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <motion.span
              key={pointsBalance}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 rounded-full bg-secondary-fixed/60 px-2.5 py-1 text-[10px] font-bold text-secondary"
              title="Your V Points balance"
            >
              <Icon name="account_balance_wallet" filled className="text-[13px]" />
              {pointsBalance.toLocaleString()}
            </motion.span>
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

        {/* Leading category chips — show what you can ask before typing */}
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5">
          {categoryChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => sendChip(chip.flowId)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary/25 bg-surface-container-lowest px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition-colors hover:bg-primary/[0.05] active:scale-95"
            >
              <Icon name={chip.icon} filled className="text-sm" />
              {chip.label}
            </button>
          ))}
        </div>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto no-scrollbar pb-1"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} onRedeem={redeem} onSeeFeed={() => goToChapter(1)} />
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
            placeholder="Ask SMCC Agent to shop or help…"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
            aria-label="Message SMCC Agent"
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
    </Screen>
  );
}

/** A single chat bubble, optionally with shoppable product cards or an FAQ card. */
function MessageBubble({
  msg,
  onRedeem,
  onSeeFeed,
}: {
  msg: MuseMessage;
  onRedeem: (p: MuseProduct) => void;
  onSeeFeed: () => void;
}) {
  const isMuse = msg.role === 'muse';
  const faq = msg.faqId ? museFaqById(msg.faqId) : undefined;
  const products = (msg.productIds ?? [])
    .map((id) => museProductById(id))
    .filter((p): p is MuseProduct => Boolean(p));

  // Redeem confirmation card — the earn → redeem step made visible.
  if (msg.redeemed) {
    const r = msg.redeemed;
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex w-full flex-col items-start gap-2"
      >
        <div className="w-[92%] overflow-hidden rounded-2xl border border-success/30 bg-success/[0.06] p-3.5 shadow-card">
          <p className="flex items-center gap-1.5 text-xs font-bold text-success">
            <Icon name="check_circle" filled className="text-base" />
            Redeemed · cashback activated
          </p>
          <p className="mt-1.5 text-[13px] font-bold text-on-surface">{r.name}</p>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2">
            <span className="text-[11px] text-on-surface-variant">V Points earned</span>
            <span className="font-heading text-sm font-bold text-secondary">
              +{r.points.toLocaleString()}
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2">
            <span className="text-[11px] text-on-surface-variant">New balance</span>
            <motion.span
              key={r.newBalance}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-heading text-sm font-bold text-on-surface"
            >
              {r.newBalance.toLocaleString()} pts
            </motion.span>
          </div>
          <p className="mt-2.5 flex items-center gap-1 text-[11px] text-primary">
            <Icon name="auto_awesome" filled className="text-[13px]" />
            Your “For you” feed just re-ranked around {r.category ?? 'this pick'}.
          </p>
          <button
            type="button"
            onClick={onSeeFeed}
            className="mt-2 flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition-transform active:scale-95"
          >
            See it on Home
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </motion.div>
    );
  }

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

      {/* Shoppable product cards — full merchandising units */}
      {products.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          {products.map((p) => {
            const meta = feedMetaFor(p.id);
            return (
              <div
                key={p.id}
                className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-card"
              >
                <div className="flex items-stretch gap-3 p-3">
                  <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl brand-gradient-soft text-3xl">
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
                      <p className="min-w-0 flex-1 truncate font-heading text-sm font-bold text-on-surface">{p.name}</p>
                      {p.tag && (
                        <span className="shrink-0 rounded-full bg-tertiary-fixed px-1.5 py-0.5 text-[9px] font-bold text-tertiary">
                          {p.tag}
                        </span>
                      )}
                      <span className="flex shrink-0 items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                        <Icon name="savings" filled className="text-[12px]" />
                        {p.cashbackPct}%
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-on-surface-variant">{p.brand}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-on-surface-variant">
                      <span className="flex items-center gap-0.5">
                        <Icon name="near_me" className="text-[12px]" />
                        {formatDistance(meta.distanceM)} away
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Icon name="schedule" className="text-[12px]" />
                        {meta.expiry}
                      </span>
                    </div>
                    <p className="mt-1 font-heading text-sm font-bold text-on-surface">
                      {formatYen(p.price)}
                      <span className="ml-1 text-[10px] font-semibold text-secondary">
                        +{vPointsFor(p.price).toLocaleString()} pts
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRedeem(p)}
                  className="flex w-full items-center justify-center gap-1.5 bg-primary py-2.5 text-xs font-bold text-white transition-colors hover:bg-primary/90 active:scale-[0.98]"
                >
                  <Icon name="redeem" filled className="text-sm" />
                  Redeem cashback offer
                </button>
              </div>
            );
          })}
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
