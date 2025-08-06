"use client";

import { useState } from "react";
import { MultipleChoice as MultipleChoiceType } from "@/types/questions";

interface MultipleChoiceProps {
  multipleChoice: MultipleChoiceType;
}

export default function MultipleChoice({
  multipleChoice,
}: MultipleChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    setShowResult(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer("");
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === multipleChoice.correctAnswer;

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-2xl drop-shadow-2xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {multipleChoice.question}
      </h3>

      <div className="space-y-3">
        {multipleChoice.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={showResult}
            className={`w-full p-3 text-left rounded-lg border transition-colors ${
              showResult
                ? option === multipleChoice.correctAnswer
                  ? "bg-green-100 border-green-500 text-green-800"
                  : option === selectedAnswer
                  ? "bg-red-100 border-red-500 text-red-800"
                  : "bg-gray-100 border-gray-300 text-gray-600"
                : "bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-800"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-4">
          <p
            className={`text-center font-medium ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          {!isCorrect && (
            <p className="text-center text-sm text-gray-600 mt-1">
              The correct answer is: {multipleChoice.correctAnswer}
            </p>
          )}
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
