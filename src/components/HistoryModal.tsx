'use client';

import { useVisitTracker } from '@/hooks/useVisitTracker';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const { stats, clearHistory } = useVisitTracker();

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your visit history? This cannot be undone.')) {
      clearHistory();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl drop-shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#2F49F5] text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Visit History</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2F49F5]">{stats.totalDays}</div>
              <div className="text-sm text-gray-600">Total Days</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2F49F5]">{stats.longestStreak}</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-green-800">
                  Current Streak: {stats.currentStreak} days
                </div>
                <div className="text-sm text-green-600">
                  {stats.currentStreak > 0 ? 'Keep it up! 🔥' : 'Start your streak today!'}
                </div>
              </div>
            </div>
          </div>

          {/* Visit Dates */}
          {stats.visitDates.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Visit History</h3>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {stats.visitDates
                  .slice()
                  .reverse()
                  .map((date, index) => (
                    <div
                      key={date}
                      className={`px-4 py-2 border-b border-gray-100 last:border-b-0 ${
                        index === 0 ? 'bg-blue-50' : 'bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{formatDate(date)}</span>
                        {index === 0 && (
                          <span className="text-xs bg-[#2F49F5] text-white px-2 py-1 rounded">
                            Today
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {stats.visitDates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No visit history yet.</p>
              <p className="text-sm">Your visits will be tracked starting today!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
          <button
            onClick={handleClearHistory}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Clear History
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2F49F5] text-white rounded-lg hover:bg-[#253FCC] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
