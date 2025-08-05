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
      <header className="bg-white shadow-sm border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Coding Interview Practice</h1>
          <p className="text-gray-600 mt-1">Master programming concepts with interactive exercises</p>
        </div>
      </header>

      {/* Topic Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => onTabChange(topic)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === topic
                    ? 'border-blue-500 text-blue-600'
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
