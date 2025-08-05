'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Flashcard from '@/components/Flashcard';
import MultipleChoice from '@/components/MultipleChoice';
import FillInTheGap from '@/components/FillInTheGap';
import CodeWalkthrough from '@/components/CodeWalkthrough';
import questionsData from '@/data/questions.json';
import { QuestionsData } from '@/types/questions';

const typedQuestionsData: QuestionsData = questionsData as QuestionsData;

export default function Home() {
  const topics = Object.keys(typedQuestionsData);
  const [activeTab, setActiveTab] = useState(topics[0]);
  const [activeQuestionType, setActiveQuestionType] = useState<'flashcards' | 'multipleChoice' | 'fillInTheGap' | 'codeWalkthrough'>('flashcards');

  const currentTopic = typedQuestionsData[activeTab];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        topics={topics}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Question Type Selector */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveQuestionType('flashcards')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeQuestionType === 'flashcards'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Flashcards ({currentTopic.flashcards.length})
            </button>
            <button
              onClick={() => setActiveQuestionType('multipleChoice')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeQuestionType === 'multipleChoice'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Multiple Choice ({currentTopic.multipleChoice.length})
            </button>
            <button
              onClick={() => setActiveQuestionType('fillInTheGap')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeQuestionType === 'fillInTheGap'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fill in the Gap ({currentTopic.fillInTheGap.length})
            </button>
            <button
              onClick={() => setActiveQuestionType('codeWalkthrough')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeQuestionType === 'codeWalkthrough'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Code Walkthrough ({currentTopic.codeWalkthrough.length})
            </button>
          </div>

          {/* Question Content */}
          <div>
            {activeQuestionType === 'flashcards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTopic.flashcards.map((flashcard, index) => (
                  <Flashcard key={index} flashcard={flashcard} />
                ))}
              </div>
            )}

            {activeQuestionType === 'multipleChoice' && (
              <div className="space-y-6">
                {currentTopic.multipleChoice.map((question, index) => (
                  <MultipleChoice key={index} multipleChoice={question} />
                ))}
              </div>
            )}

            {activeQuestionType === 'fillInTheGap' && (
              <div className="space-y-6">
                {currentTopic.fillInTheGap.map((question, index) => (
                  <FillInTheGap key={index} fillInTheGap={question} />
                ))}
              </div>
            )}

            {activeQuestionType === 'codeWalkthrough' && (
              <div className="space-y-6">
                {currentTopic.codeWalkthrough.map((question, index) => (
                  <CodeWalkthrough key={index} codeWalkthrough={question} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
