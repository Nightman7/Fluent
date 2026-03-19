import React from "react";
import type { Article } from "../types";

interface ArticleCardProps {
  article: Article;
  onClickLocked?: () => void;
  onClickUnlocked?: () => void;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onClickLocked,
  onClickUnlocked,
  className = "",
}) => {
  const handleClick = () => {
    if (article.isLocked && !article.isPurchased) {
      onClickLocked?.();
    } else {
      onClickUnlocked?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`card cursor-pointer hover:border-bitcoin-orange transition-colors ${className}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-light-text flex-1">{article.title}</h3>
        <div className="ml-3 flex-shrink-0">
          {article.isLocked && !article.isPurchased ? (
            <span className="inline-block px-3 py-1 bg-accent text-space-grey text-xs font-bold">
              LOCKED
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-spike-blue text-white text-xs font-bold">
              UNLOCKED
            </span>
          )}
        </div>
      </div>

      {article.preview && (
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {article.preview}
        </p>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-accent">
        <span className="text-xs text-gray-500">
          By {article.author}
        </span>
        {article.isLocked && !article.isPurchased && (
          <span className="text-sm font-bold text-accent">
            {article.price} sBTC
          </span>
        )}
        {article.isPurchased && (
          <span className="text-xs text-spike-blue font-semibold">
            READ NOW
          </span>
        )}
      </div>
    </div>
  );
};
