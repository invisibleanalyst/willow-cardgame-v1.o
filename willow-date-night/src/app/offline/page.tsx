'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from '@/components/Icons';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-willow-dark text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <HeartIcon className="w-24 h-24 text-willow-green mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-craftwork-heavy text-3xl text-willow-green mb-4"
        >
          You're Offline
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-craftwork text-willow-gray mb-8 leading-relaxed"
        >
          Don't worry! You can still enjoy Willow's offline features. 
          Check your connection and come back for the full experience.
        </motion.p>

        {/* Retry Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.location.reload()}
          className="btn-willow px-8 py-4 text-lg font-craftwork-heavy"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>

        {/* Offline Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-black bg-opacity-30 rounded-2xl border border-white border-opacity-10"
        >
          <h3 className="font-craftwork-heavy text-lg text-willow-green mb-4">
            Available Offline
          </h3>
          <div className="space-y-2 text-sm text-willow-gray">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-willow-green rounded-full"></div>
              <span>Browse your saved prompts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-willow-green rounded-full"></div>
              <span>View your intimacy progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-willow-green rounded-full"></span>
              <span>Practice with sample questions</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
