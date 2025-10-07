'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePaystackPayment } from 'react-paystack';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packType: 'romantic-escape' | 'premium' | 'beta-pass';
  onSuccess: (packType: string) => void;
}

export default function PaymentModal({ isOpen, onClose, packType, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const packDetails = {
    'romantic-escape': {
      name: 'Romantic Escape Pack',
      price: 650,
      currency: 'KES',
      features: [
        'All 3 tiers unlocked (335+ prompts)',
        'Full Vibe Check (100 prompts)',
        'Full Lock-In Level (200 prompts)',
        'Unlimited sessions',
        'Advanced intimacy tracking',
        'AI adaptive nudging',
        'Progressive tier unlocking'
      ]
    },
    'premium': {
      name: 'Premium Experience',
      price: 3000,
      currency: 'KES',
      features: [
        'Everything in Romantic Escape',
        'Exclusive premium prompts',
        'AI voice responses',
        'Advanced relationship analytics',
        'Priority support',
        'Founder badge & recognition',
        'Early access to new features'
      ]
    },
    'beta-pass': {
      name: 'Beta Pass',
      price: 1300,
      currency: 'KES',
      features: [
        'Early access to all features',
        'All tier unlocks',
        'Premium prompts',
        'Advanced analytics',
        'Priority support',
        'Exclusive beta content',
        'Lifetime access',
        'Founder badge'
      ]
    }
  };

  const currentPack = packDetails[packType];

  const config = {
    reference: `willow_${packType}_${Date.now()}`,
    email,
    amount: currentPack.price * 100, // Convert to kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    currency: 'KES',
    metadata: {
      custom_fields: [
        {
          display_name: "Pack Type",
          variable_name: "pack_type",
          value: packType
        },
        {
          display_name: "User ID",
          variable_name: "user_id",
          value: 'current-user-id' // This would come from auth context
        }
      ]
    },
  };

  const initializePayment = usePaystackPayment(config);

  const onPaymentSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    setIsProcessing(false);
    onSuccess(packType);
    onClose();
  };

  const onPaymentClose = () => {
    console.log('Payment closed');
    setIsProcessing(false);
  };

  const handlePayment = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsProcessing(true);
    initializePayment({
      onSuccess: onPaymentSuccess,
      onClose: onPaymentClose
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="modal-content max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-craftwork-heavy text-2xl text-willow-dark">
              {currentPack.name}
            </h2>
            <button
              onClick={onClose}
              className="text-willow-gray hover:text-willow-dark text-2xl"
            >
              ×
            </button>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="text-4xl font-craftwork-heavy text-willow-green mb-2">
              {currentPack.currency} {currentPack.price}
            </div>
            <p className="font-craftwork text-willow-gray">
              One-time payment
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-craftwork-heavy text-lg text-willow-dark mb-3">
              What's included:
            </h3>
            <ul className="space-y-2">
              {currentPack.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-willow-dark text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Email input */}
          <div className="mb-6">
            <label className="block font-craftwork text-willow-dark mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-willow-gray rounded-lg focus:outline-none focus:border-willow-green text-willow-dark"
              required
            />
          </div>

          {/* Payment button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || !email}
            className="w-full btn-willow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="loading-spinner w-5 h-5"></div>
                Processing...
              </div>
            ) : (
              `Pay ${currentPack.currency} ${currentPack.price}`
            )}
          </button>

          {/* Payment methods */}
          <div className="mt-4 text-center">
            <p className="font-craftwork text-xs text-willow-gray mb-2">
              Secure payment powered by Paystack
            </p>
            <div className="flex justify-center gap-4 text-xs text-willow-gray">
              <span>M-PESA</span>
              <span>•</span>
              <span>Bank Transfer</span>
              <span>•</span>
              <span>Card</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
