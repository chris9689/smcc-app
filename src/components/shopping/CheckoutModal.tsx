import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { formatYen } from '@/hooks/utils';
import { vPointsFor, type MuseProduct } from '@/mock-data/muse';

interface CheckoutModalProps {
  /** Product being purchased, or null when the modal is closed. */
  product: MuseProduct | null;
  onClose: () => void;
}

/**
 * Shared in-app checkout + confirmation used by the Marketplace and Shopping
 * Muse. Frames the SMCC narrative: buy in-app, earn cashback and V Points.
 */
export function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [purchased, setPurchased] = useState(false);

  // Reset to the checkout step whenever a new product is opened.
  useEffect(() => {
    if (product) setPurchased(false);
  }, [product]);

  const cashbackYen = product ? Math.round((product.price * product.cashbackPct) / 100) : 0;
  const points = product ? vPointsFor(product.price) : 0;

  return (
    <Modal open={Boolean(product)} onClose={onClose} title={purchased ? undefined : 'Checkout'}>
      {product && !purchased && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-3">
            <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl brand-gradient-soft text-3xl">
              {product.emoji}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-bold text-ink">{product.name}</p>
              <p className="text-[11px] text-muted">{product.brand}</p>
            </div>
            <p className="font-heading text-sm font-bold text-ink">{formatYen(product.price)}</p>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-primary/25 bg-primary/[0.05] px-3 py-2.5">
            <span className="flex items-center gap-2 text-xs font-bold text-primary">
              <Icon name="savings" filled className="text-base" />
              Cashback ({product.cashbackPct}%)
            </span>
            <span className="font-heading text-sm font-extrabold text-primary">
              +{formatYen(cashbackYen)}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-secondary/25 bg-secondary-fixed/40 px-3 py-2.5">
            <span className="flex items-center gap-2 text-xs font-bold text-secondary">
              <Icon name="account_balance_wallet" filled className="text-base" />
              V Points earned
            </span>
            <span className="font-heading text-sm font-extrabold text-secondary">
              +{points.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-surface-container-low px-3 py-2 text-[11px] text-muted">
            <Icon name="credit_card" className="text-base text-on-surface-variant" />
            Paying with your SMCC card ·••• 4820
          </div>

          <Button fullWidth size="lg" onClick={() => setPurchased(true)}>
            Pay {formatYen(product.price)}
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="text-center text-xs font-bold text-on-surface-variant"
          >
            Keep browsing
          </button>
        </div>
      )}

      {product && purchased && (
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
            {product.name} is on its way.
          </p>
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between rounded-xl bg-primary/[0.05] px-3 py-2 text-xs">
              <span className="font-bold text-primary">Cashback earned</span>
              <span className="font-heading font-extrabold text-primary">+{formatYen(cashbackYen)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-secondary-fixed/40 px-3 py-2 text-xs">
              <span className="font-bold text-secondary">V Points earned</span>
              <span className="font-heading font-extrabold text-secondary">+{points.toLocaleString()}</span>
            </div>
          </div>
          <Button fullWidth size="md" className="mt-1" onClick={onClose}>
            Back to shopping
          </Button>
        </div>
      )}
    </Modal>
  );
}
