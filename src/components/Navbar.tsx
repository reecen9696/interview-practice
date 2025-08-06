"use client";

import { useState } from "react";
import Image from "next/image";
import HistoryModal from "./HistoryModal";
import { useVisitTracker } from "@/hooks/useVisitTracker";

interface NavbarProps {
  topics: string[];
  activeTab: string;
  onTabChange: (topic: string) => void;
}

export default function Navbar({
  topics,
  activeTab,
  onTabChange,
}: NavbarProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { stats } = useVisitTracker();

  return (
    <>
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Image
                src="/logo.png"
                alt="Codemate Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <h1 className="text-2xl font-bold text-[#2F49F5]">CODEMATE</h1>
            </div>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-[#2F49F5] text-white rounded-lg hover:bg-[#253FCC] transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>History</span>
              {stats.currentStreak > 0 && (
                <span className="bg-white text-[#2F49F5] px-2 py-0.5 rounded-full text-xs font-bold">
                  {stats.currentStreak}🔥
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Topic Navigation */}
      <nav className="bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => onTabChange(topic)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === topic
                    ? "border-[#2F49F5] text-[#2F49F5]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* History Modal */}
      <HistoryModal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />
    </>
  );
}
