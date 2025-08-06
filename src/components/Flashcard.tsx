"use client";

import { useState } from "react";
import { Flashcard as FlashcardType } from "@/types/questions";

interface FlashcardProps {
  flashcard: FlashcardType;
}

export default function Flashcard({ flashcard }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="relative w-full h-80 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front side */}
          <div className="absolute inset-0 w-full h-full bg-white text-gray-800 rounded-lg shadow-2xl drop-shadow-2xl flex flex-col backface-hidden">
            <div className="flex-1 flex items-center justify-center p-6">
              <p className="text-center text-lg font-medium">
                {flashcard.question}
              </p>
            </div>
            <div className="bg-[#1E1C8B] text-white text-center py-3 text-sm font-medium rounded-b-lg">
              Click the card to flip
            </div>
          </div>

          {/* Back side */}
          <div className="absolute inset-0 w-full h-full bg-white text-gray-800 rounded-lg shadow-2xl drop-shadow-2xl flex items-start justify-start p-6 backface-hidden rotate-y-180">
            <p className="text-left text-lg whitespace-pre-line">
              {flashcard.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
