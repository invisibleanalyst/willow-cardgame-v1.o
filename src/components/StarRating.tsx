'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onSubmit: (rating: number) => void;
  category?: 'squad' | 'ride-or-die';
}

export default function StarRating({ rating, onRatingChange, onSubmit, category }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (starRating: number) => {
    onRatingChange(starRating);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
  };

  const getRatingText = (rating: number) => {
    if (category === 'squad') {
      switch (rating) {
        case 1: return 'Meh, not really';
        case 2: return 'It was okay';
        case 3: return 'Pretty good vibes';
        case 4: return 'Really solid vibes';
        case 5: return 'Absolute fire vibes';
        default: return 'How good was this vibe?';
      }
    } else {
      switch (rating) {
        case 1: return 'Not romantic at all';
        case 2: return 'A little romantic';
        case 3: return 'Somewhat romantic';
        case 4: return 'Very romantic';
        case 5: return 'Extremely romantic';
        default: return 'How romantic was this?';
      }
    }
  };

  return (
    <div className="w-full">
      {/* Stars */}
      <div className="star-rating mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="star"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`${
                star <= (hoveredRating || rating)
                  ? 'text-willow-green'
                  : 'text-willow-gray'
              }`}
              animate={{
                scale: star <= (hoveredRating || rating) ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <StarIcon className="w-8 h-8" />
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Rating text */}
      <motion.div
        className="text-center mb-6"
        key={rating}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-craftwork text-lg text-willow-dark">
          {getRatingText(rating)}
        </p>
      </motion.div>

      {/* Submit button */}
      <div className="text-center">
        <motion.button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="btn-willow disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue
        </motion.button>
      </div>

      {/* Rating feedback */}
      {rating > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-willow-green bg-opacity-10 px-4 py-2 rounded-full">
            <span className="text-2xl">
              {category === 'squad' 
                ? (rating >= 4 ? '🤝' : rating >= 3 ? '😊' : '🤔')
                : (rating >= 4 ? '💖' : rating >= 3 ? '😊' : '🤔')
              }
            </span>
            <span className="font-craftwork text-sm text-willow-dark">
              {category === 'squad'
                ? (rating >= 4 ? 'Vibes were immaculate!' : rating >= 3 ? 'Good stuff!' : 'Keep the vibes flowing!')
                : (rating >= 4 ? 'Amazing!' : rating >= 3 ? 'Nice!' : 'Keep trying!')
              }
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

