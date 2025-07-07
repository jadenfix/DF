'use client';

import { useState } from 'react';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpSolid, HandThumbDownIcon as HandThumbDownSolid } from '@heroicons/react/24/solid';

interface FeedbackCollectorProps {
  outputId: string;
  imageUrl?: string;
  prompt?: string;
  output?: string;
  onFeedback?: (feedback: {
    outputId: string;
    rating: 'positive' | 'negative';
    imageUrl?: string;
    prompt?: string;
    output?: string;
    timestamp: string;
  }) => void;
}

export default function FeedbackCollector({ 
  outputId, 
  imageUrl, 
  prompt, 
  output, 
  onFeedback 
}: FeedbackCollectorProps) {
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedback = async (feedbackType: 'positive' | 'negative') => {
    setIsSubmitting(true);
    setRating(feedbackType);

    const feedback = {
      outputId,
      rating: feedbackType,
      imageUrl,
      prompt,
      output,
      timestamp: new Date().toISOString()
    };

    try {
      // Send feedback to RL pipeline
      const response = await fetch('/api/rl/collect-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackData: `${outputId},${feedbackType},${prompt}`,
          preferences: [feedback]
        }),
      });

      if (response.ok) {
        onFeedback?.(feedback);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">
        Rate this response:
      </span>
      
      <button
        onClick={() => handleFeedback('positive')}
        disabled={isSubmitting || rating !== null}
        className={`p-2 rounded-lg transition-colors ${
          rating === 'positive'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
            : rating === null
            ? 'hover:bg-green-50 dark:hover:bg-green-900/20 text-slate-500 hover:text-green-600'
            : 'opacity-50 cursor-not-allowed text-slate-400'
        }`}
        title="Good response"
      >
        {rating === 'positive' ? (
          <HandThumbUpSolid className="w-5 h-5" />
        ) : (
          <HandThumbUpIcon className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={() => handleFeedback('negative')}
        disabled={isSubmitting || rating !== null}
        className={`p-2 rounded-lg transition-colors ${
          rating === 'negative'
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            : rating === null
            ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 hover:text-red-600'
            : 'opacity-50 cursor-not-allowed text-slate-400'
        }`}
        title="Poor response"
      >
        {rating === 'negative' ? (
          <HandThumbDownSolid className="w-5 h-5" />
        ) : (
          <HandThumbDownIcon className="w-5 h-5" />
        )}
      </button>

      {rating && (
        <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
          Thank you for your feedback!
        </span>
      )}
    </div>
  );
}
