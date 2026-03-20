import React from "react";
import type { Article } from "../types";

interface ArticleCardProps {
  article: Article;
  onClickLocked?: () => void;
  onClickUnlocked?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onClickLocked,
  onClickUnlocked,
  isSaved = false,
  onToggleSave,
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
      className={`group relative overflow-hidden border border-border-gray bg-dark-grey/40 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-text-light-gray ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          {article.category && (
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-text-gray">
              {article.category}
            </p>
          )}
          <h3 className="flex-1 font-space-grotesk text-xl font-semibold leading-tight tracking-[-0.02em] text-white">
            {article.title}
          </h3>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleSave?.();
            }}
            className="border border-border-gray px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-text-gray transition-colors hover:border-text-light-gray hover:text-white"
          >
            {isSaved ? "Saved" : "Save"}
          </button>
          {article.isLocked && !article.isPurchased ? (
            <span className="inline-block border border-border-gray px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-light-gray">
              LOCKED
            </span>
          ) : (
            <span className="inline-block border border-white/90 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">
              UNLOCKED
            </span>
          )}
        </div>
      </div>

      {article.preview && (
        <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-text-light-gray">
          {article.preview}
        </p>
      )}

      <div className="flex items-end justify-between border-t border-border-gray pt-5">
        <div className="flex flex-col">
          <span className="mb-2 text-[11px] uppercase tracking-[0.16em] text-text-gray">
            By {article.author}
          </span>
          {!!article.readTimeMinutes && (
            <span className="mb-2 text-xs text-text-light-gray">
              {article.readTimeMinutes} min read
            </span>
          )}
          {article.isLocked && !article.isPurchased && (
            <span className="font-mono text-sm font-semibold text-white">
              {article.price} sBTC
            </span>
          )}
        </div>
        {article.isPurchased && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-light-gray transition-colors duration-300 group-hover:text-white">
            Read now
          </span>
        )}
      </div>
    </div>
  );
};
