import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

interface OfferConfirmationProps {
  open: boolean;
  onContinueShopping: () => void;
  onViewSavedBenefits: () => void;
  title: string;
}

/** "Offer saved" confirmation shown after the CTA is triggered. */
export function OfferConfirmation({ open, onContinueShopping, onViewSavedBenefits }: OfferConfirmationProps) {
  return (
    <Modal open={open} onClose={onContinueShopping} title="">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white shadow-float"
        >
          <Icon name="check_circle" filled className="text-[48px]" />
        </motion.div>
        <h3 className="font-heading text-2xl font-bold text-on-surface">Offer saved</h3>
        <p className="mx-auto mt-2 max-w-xs text-sm text-on-surface-variant">
          Your offer is ready. View this offer again from your saved benefits
        </p>

        <Button fullWidth size="lg" className="mt-5" onClick={onContinueShopping}>
          Continue shopping
        </Button>
        <Button variant="outline" fullWidth size="md" className="mt-2" onClick={onViewSavedBenefits}>
          View saved benefits
        </Button>
      </div>
    </Modal>
  );
}
