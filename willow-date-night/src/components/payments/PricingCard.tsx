'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentModal from './PaymentModal';

interface PricingCardProps {
  title: string;
  price: string;
  currency: string;
  features: string[];
  isPopular?: boolean;
  packType: 'romantic-escape' | 'beta-pass';
  onPurchase: (packType: string) => void;
}

export default function PricingCard({
  title,
  price,
  currency,
  features,
  isPopular = false,
  packType,
  onPurchase
}: PricingCardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <motion.div
        className={`relative p-8 rounded-2xl ${
          isPopular
            ? 'bg-willow-green text-willow-dark'
            : 'bg-white text-willow-dark'
        } shadow-willow`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-willow-dark text-willow-green px-4 py-1 rounded-full text-sm font-craftwork-heavy">
              Most Popular
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="font-craftwork-heavy text-2xl mb-2">{title}</h3>
          <div className="text-4xl font-craftwork-heavy mb-2">
            {currency} {price}
          </div>
          <p className="font-craftwork text-sm opacity-75">
            One-time payment
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-lg mt-0.5">✓</span>
              <span className="font-craftwork text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Purchase button */}
        <button
          onClick={() => setShowPaymentModal(true)}
          className={`w-full py-3 px-6 rounded-lg font-craftwork-heavy transition-all duration-200 ${
            isPopular
              ? 'bg-willow-dark text-willow-green hover:bg-opacity-90'
              : 'bg-willow-green text-willow-dark hover:bg-opacity-90'
          }`}
        >
          Get Started
        </button>
      </motion.div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        packType={packType}
        onSuccess={onPurchase}
      />
    </>
  );
}

