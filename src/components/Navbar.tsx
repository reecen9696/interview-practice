"use client";

import Image from "next/image";

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
  return (
    <>
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
    </>
  );
}
