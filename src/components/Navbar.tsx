'use client';

interface NavbarProps {
  topics: string[];
  activeTab: string;
  onTabChange: (topic: string) => void;
}

export default function Navbar({ topics, activeTab, onTabChange }: NavbarProps) {
  return (
    <>
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Coding Interview Practice</h1>
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
                    ? 'border-[#1E1C8B] text-[#1E1C8B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
