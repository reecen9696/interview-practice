'use client';

import { useState } from 'react';
import { Flashcard as FlashcardType } from '@/types/questions';

interface FlashcardProps {
  flashcard: FlashcardType;
}

export default function Flashcard({ flashcard }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="relative w-full h-48 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front side */}
          <div className="absolute inset-0 w-full h-full bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center p-6 backface-hidden">
            <p className="text-center text-lg font-medium">{flashcard.question}</p>
          </div>
          
          {/* Back side */}
          <div className="absolute inset-0 w-full h-full bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-center p-6 backface-hidden rotate-y-180">
            <p className="text-center text-lg">{flashcard.answer}</p>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        Click to {isFlipped ? 'see question' : 'reveal answer'}
      </p>
    </div>
  );
}
