'use client';

import { useState, useRef } from 'react';
import { FillInTheGap as FillInTheGapType } from '@/types/questions';

interface FillInTheGapProps {
  fillInTheGap: FillInTheGapType;
}

export default function FillInTheGap({ fillInTheGap }: FillInTheGapProps) {
  const [droppedWords, setDroppedWords] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const draggedRef = useRef<string>('');

  // Split sentence by underscores to create gaps
  const parts = fillInTheGap.sentence.split('____');
  const numberOfGaps = parts.length - 1;

  // Use provided options or fall back to gaps + distractors for backward compatibility
  const availableWords = fillInTheGap.options || [
    ...fillInTheGap.gaps,
    'variable', 'function', 'loop', 'array'
  ];
  
  const shuffledWords = [...availableWords].sort(() => Math.random() - 0.5);

  const handleDragStart = (word: string) => {
    draggedRef.current = word;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, gapIndex: number) => {
    e.preventDefault();
    const word = draggedRef.current;
    if (word) {
      setDroppedWords(prev => ({
        ...prev,
        [gapIndex]: word
      }));
      draggedRef.current = '';
    }
  };

  const removeWord = (gapIndex: number) => {
    setDroppedWords(prev => {
      const newDropped = { ...prev };
      delete newDropped[gapIndex];
      return newDropped;
    });
  };

  const checkAnswers = () => {
    setShowResult(true);
  };

  const resetQuestion = () => {
    setDroppedWords({});
    setShowResult(false);
  };

  const isCorrect = () => {
    for (let i = 0; i < numberOfGaps; i++) {
      if (droppedWords[i] !== fillInTheGap.gaps[i]) {
        return false;
      }
    }
    return Object.keys(droppedWords).length === numberOfGaps;
  };

  const getUsedWords = () => {
    return Object.values(droppedWords);
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-2xl drop-shadow-2xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Fill in the gaps
      </h3>
      
      {/* Sentence with gaps */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg text-lg leading-relaxed">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < numberOfGaps && (
              <span
                className={`inline-block min-w-[80px] h-8 mx-1 px-2 border-2 border-dashed rounded transition-colors ${
                  droppedWords[index]
                    ? showResult
                      ? droppedWords[index] === fillInTheGap.gaps[index]
                        ? 'bg-green-100 border-green-400 text-green-800'
                        : 'bg-red-100 border-red-400 text-red-800'
                      : 'bg-blue-100 border-blue-400 text-blue-800'
                    : 'border-gray-400 bg-white'
                } relative cursor-pointer`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => !showResult && droppedWords[index] && removeWord(index)}
              >
                <span className="text-sm">
                  {droppedWords[index] || ''}
                </span>
                {droppedWords[index] && !showResult && (
                  <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    ×
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Available words */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Drag words into the gaps:</h4>
        <div className="flex flex-wrap gap-2">
          {shuffledWords
            .filter(word => !getUsedWords().includes(word))
            .map((word, index) => (
              <span
                key={index}
                draggable
                onDragStart={() => handleDragStart(word)}
                className="px-3 py-1 bg-[#1E1C8B] text-white rounded-lg cursor-move hover:bg-[#16155C] transition-colors select-none"
              >
                {word}
              </span>
            ))}
        </div>
      </div>

      {/* Check button */}
      {Object.keys(droppedWords).length === numberOfGaps && !showResult && (
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-[#4255FF] text-white rounded-lg hover:bg-[#3644CC] transition-colors"
        >
          Check Answers
        </button>
      )}

      {/* Results */}
      {showResult && (
        <div className="mt-4">
          <p className={`text-center font-medium ${isCorrect() ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect() ? '✓ Correct!' : '✗ Some answers are incorrect'}
          </p>
          <button
            onClick={resetQuestion}
            className="mt-3 mx-auto block px-4 py-2 bg-[#4255FF] text-white rounded-lg hover:bg-[#3644CC] transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
