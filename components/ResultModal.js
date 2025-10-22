"use client";
import MemoCard from "./MemoCard";

export default function ResultModal({ isLoading, results, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          {isLoading && <p className="text-center">검색 중...</p>}

          {!isLoading && results.length === 0 && (
            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
          )}

          {!isLoading && results.length > 0 && (
            <div className="flex flex-col items-center space-y-4">
              {results.map((item) => (
                <MemoCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
