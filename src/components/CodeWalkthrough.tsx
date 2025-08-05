'use client';

import { useState } from 'react';
import { CodeWalkthrough as CodeWalkthroughType } from '@/types/questions';

interface CodeWalkthroughProps {
  codeWalkthrough: CodeWalkthroughType;
}

export default function CodeWalkthrough({ codeWalkthrough }: CodeWalkthroughProps) {
  const [expandedLines, setExpandedLines] = useState<{ [key: number]: boolean }>({});

  const toggleLineExplanation = (lineIndex: number) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineIndex]: !prev[lineIndex]
    }));
  };

  const expandAll = () => {
    const allExpanded = codeWalkthrough.codeLines.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {} as { [key: number]: boolean });
    setExpandedLines(allExpanded);
  };

  const collapseAll = () => {
    setExpandedLines({});
  };

  const allExpanded = codeWalkthrough.codeLines.every((_, index) => expandedLines[index]);
  const someExpanded = Object.values(expandedLines).some(Boolean);

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-md border border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Code Walkthrough
        </h3>
        <div className="space-x-2">
          {!allExpanded && (
            <button
              onClick={expandAll}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Expand All
            </button>
          )}
          {someExpanded && (
            <button
              onClick={collapseAll}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Collapse All
            </button>
          )}
        </div>
      </div>

      {/* Complete Code Block */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2 text-gray-700">Complete Code:</h4>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>
            {codeWalkthrough.codeLines.map((line, index) => (
              <div key={index} className="leading-relaxed">
                <span className="text-gray-500 text-xs mr-3 w-6 inline-block text-right">
                  {index + 1}
                </span>
                {line.code}
              </div>
            ))}
          </pre>
        </div>
      </div>

      <h4 className="text-md font-medium mb-4 text-gray-700">Line-by-Line Breakdown:</h4>

      <div className="space-y-4">
        {codeWalkthrough.codeLines.map((codeLine, lineIndex) => (
          <div key={lineIndex} className="border border-gray-600 rounded-lg overflow-hidden">
            {/* Code Line */}
            <div className="bg-gray-900 text-gray-100 p-4 font-mono text-sm">
              <div className="flex items-center">
                <span className="text-gray-500 text-xs mr-3 w-6 text-right">
                  {lineIndex + 1}
                </span>
                <code className="flex-1">{codeLine.code}</code>
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => toggleLineExplanation(lineIndex)}
              className="w-full p-3 bg-gray-50 border-t hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
            >
              <span className="text-sm font-medium text-gray-700">
                {expandedLines[lineIndex] ? 'Hide' : 'Show'} Explanation
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  expandedLines[lineIndex] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Explanation Section */}
            {expandedLines[lineIndex] && (
              <div className="bg-blue-50 border-t p-4">
                <div className="space-y-2">
                  {codeLine.explanation.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mt-0.5">
                        {stepIndex + 1}
                      </div>
                      <p className="text-sm text-gray-700 flex-1">
                        {step.startsWith(`${stepIndex + 1}.`) 
                          ? step.substring(step.indexOf('.') + 1).trim()
                          : step
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
        <p>
          💡 <strong>Tip:</strong> Click on each line&apos;s explanation button to understand what happens step by step.
          This helps build your mental model of how code executes.
        </p>
      </div>
    </div>
  );
}
