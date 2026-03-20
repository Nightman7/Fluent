import { useMemo, useState } from "react";
import { WalletProvider, useWallet } from "./context/WalletContext";
import {
  ConnectWalletButton,
  PaywallModal,
  ArticleCard,
  TransactionStatus,
} from "./components";
import type { Article } from "./types";
import "./App.css";

interface UnlockRecord {
  id: string;
  articleTitle: string;
  txId: string;
  amount: string;
  timestamp: Date;
  status: "confirmed" | "pending";
}

const initialArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Decentralized Media on Bitcoin",
    preview:
      "Exploring how Layer 2 solutions like Stacks are enabling programmable Bitcoin for content creators...",
    author: "Satoshi Nakamoto",
    category: "Protocol",
    readTimeMinutes: 6,
    price: "0.0005",
    isLocked: true,
    isPurchased: false,
    createdAt: new Date(),
    content:
      "This is the full article content that would be unlocked after payment...",
  },
  {
    id: "2",
    title: "Understanding sBTC: Wrapped Bitcoin on Stacks",
    preview:
      "A deep dive into how sBTC works and its implications for DeFi on the Bitcoin network...",
    author: "Vitalik Buterin",
    category: "Explainer",
    readTimeMinutes: 9,
    price: "0.0003",
    isLocked: true,
    isPurchased: false,
    createdAt: new Date(),
    content: "Full article content...",
  },
  {
    id: "3",
    title: "Cowboy Bebop and the Aesthetics of Web3",
    preview:
      "Why lo-fi, high-tech design is the future of blockchain interfaces...",
    author: "Design Enthusiast",
    category: "Culture",
    readTimeMinutes: 4,
    price: "0.0002",
    isLocked: false,
    isPurchased: true,
    createdAt: new Date(),
    content: "Full unlocked article content...",
  },
  {
    id: "4",
    title: "Monetization Playbook for Independent Crypto Journalists",
    preview:
      "How creators can structure premium tiers, bundle unlocks, and grow recurring readership...",
    author: "Nadia Chain",
    category: "Creator",
    readTimeMinutes: 7,
    price: "0.0004",
    isLocked: true,
    isPurchased: false,
    createdAt: new Date(),
    content: "Playbook content...",
  },
];

const AppContent = () => {
  const { isConnected } = useWallet();
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "locked" | "unlocked">("all");
  const [unlockHistory, setUnlockHistory] = useState<UnlockRecord[]>([]);

  const visibleArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesQuery =
        query.trim().length === 0 ||
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.author.toLowerCase().includes(query.toLowerCase()) ||
        article.category?.toLowerCase().includes(query.toLowerCase());

      if (!matchesQuery) {
        return false;
      }

      if (filter === "locked") {
        return article.isLocked && !article.isPurchased;
      }

      if (filter === "unlocked") {
        return !article.isLocked || article.isPurchased;
      }

      return true;
    });
  }, [articles, filter, query]);

  const unlockedCount = articles.filter((article) => article.isPurchased).length;
  const avgUnlockPrice =
    unlockHistory.length > 0
      ? (
          unlockHistory.reduce((sum, item) => sum + Number(item.amount), 0) /
          unlockHistory.length
        ).toFixed(4)
      : "0.0000";

  const handleArticleClick = (article: Article) => {
    if (article.isLocked && !article.isPurchased) {
      setSelectedArticle(article);
      setShowPaywall(true);
    }
  };

  const toggleSavedArticle = (articleId: string) => {
    setSavedArticleIds((current) =>
      current.includes(articleId)
        ? current.filter((id) => id !== articleId)
        : [...current, articleId]
    );
  };

  const markArticleUnlocked = (articleId: string) => {
    setArticles((current) =>
      current.map((article) =>
        article.id === articleId
          ? { ...article, isLocked: false, isPurchased: true }
          : article
      )
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-space-grey text-light-text font-inter">
      <div className="flu-bg-gradient" aria-hidden="true" />
      <div className="flu-bg-ambient" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <header className="relative z-10 border-b border-border-gray/90 bg-space-grey/80 px-5 py-5 backdrop-blur md:px-10 md:py-7">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
          <div>
            <p className="mb-3 inline-flex border border-border-gray px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-text-gray">
              Stacks Native Media Rail
            </p>
            <h1 className="font-space-grotesk text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              FLUENT
            </h1>
          </div>
          <ConnectWalletButton showBalance />
        </div>

        <nav className="mx-auto mt-5 flex w-full max-w-6xl items-center gap-2 overflow-x-auto border-t border-border-gray pt-4 text-xs uppercase tracking-[0.2em] text-text-gray">
          <a className="border border-border-gray px-3 py-1.5 transition-colors hover:text-white" href="#feed">
            Feed
          </a>
          <a className="border border-border-gray px-3 py-1.5 transition-colors hover:text-white" href="#creators">
            Creators
          </a>
          <a className="border border-border-gray px-3 py-1.5 transition-colors hover:text-white" href="#history">
            History
          </a>
          <a className="border border-border-gray px-3 py-1.5 transition-colors hover:text-white" href="#trust">
            Trust
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:px-10 md:pt-20">
        <section className="mb-10 grid gap-3 rounded-none border border-border-gray bg-dark-grey/40 p-4 md:grid-cols-3 md:p-5">
          <div className="border border-border-gray p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-gray">1. Connect Wallet</p>
            <p className="mt-2 text-sm font-medium text-white">{isConnected ? "Complete" : "Pending"}</p>
          </div>
          <div className="border border-border-gray p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-gray">2. Pick an Article</p>
            <p className="mt-2 text-sm font-medium text-white">{selectedArticle ? "Selected" : "Choose from feed"}</p>
          </div>
          <div className="border border-border-gray p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-gray">3. Unlock via sBTC</p>
            <p className="mt-2 text-sm font-medium text-white">{unlockHistory.length > 0 ? "Completed" : "Ready"}</p>
          </div>
        </section>

        <section className="grid gap-10 border-b border-border-gray pb-16 md:grid-cols-[minmax(0,1fr)_290px] md:pb-20">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-text-gray">
              Tokenized publishing on Bitcoin
            </p>
            <h2 className="max-w-3xl font-space-grotesk text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl">
              Clean reader UX.
              <br />
              Bitcoin-native access rails.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-text-light-gray md:text-lg">
              Readers unlock premium articles in seconds using sBTC. Creators
              keep distribution open and monetization direct without ad noise.
            </p>
          </div>

          <aside className="border border-border-gray/90 bg-dark-grey/60 p-6 backdrop-blur">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-text-gray">
              Network Snapshot
            </p>
            <div className="space-y-5">
              <div className="border-b border-border-gray pb-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-gray">
                  Unlock time
                </p>
                <p className="mt-1 text-2xl font-semibold">&lt; 5 sec</p>
              </div>
              <div className="border-b border-border-gray pb-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-gray">
                  Fees
                </p>
                <p className="mt-1 text-2xl font-semibold">Micro</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-text-gray">
                  Avg unlock
                </p>
                <p className="mt-1 text-2xl font-semibold">{avgUnlockPrice} sBTC</p>
              </div>
            </div>
          </aside>
        </section>

        <section id="feed" className="border-b border-border-gray py-16 md:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-text-gray">
                Editorial Feed
              </p>
              <h2 className="font-space-grotesk text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                Latest Articles
              </h2>
            </div>
            <p className="max-w-md text-sm text-text-light-gray">
              Locked stories show transparent pricing before unlock. Purchased
              content opens instantly after confirmation.
            </p>
          </div>

          <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, author, category"
              className="border border-border-gray bg-space-grey px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-text-gray focus:border-text-light-gray"
            />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as "all" | "locked" | "unlocked")}
              className="border border-border-gray bg-space-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-text-light-gray"
            >
              <option value="all">All content</option>
              <option value="locked">Locked only</option>
              <option value="unlocked">Unlocked only</option>
            </select>
            <div className="border border-border-gray px-4 py-3 text-xs uppercase tracking-[0.16em] text-text-gray">
              {visibleArticles.length} results
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClickLocked={() => handleArticleClick(article)}
                onClickUnlocked={() => console.log("Read article", article.id)}
                isSaved={savedArticleIds.includes(article.id)}
                onToggleSave={() => toggleSavedArticle(article.id)}
              />
            ))}
          </div>

          {savedArticleIds.length > 0 && (
            <div className="mt-8 border border-border-gray p-5">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-text-gray">Saved Reading List</p>
              <div className="flex flex-wrap gap-2">
                {savedArticleIds.map((id) => {
                  const article = articles.find((item) => item.id === id);
                  if (!article) {
                    return null;
                  }
                  return (
                    <span key={id} className="border border-border-gray px-3 py-1 text-xs text-text-light-gray">
                      {article.title}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section id="creators" className="border-b border-border-gray py-16 md:py-20">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-text-gray">Creator Economy</p>
          <h2 className="mb-8 font-space-grotesk text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Creator Spotlight
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="border border-border-gray bg-dark-grey/30 p-5">
              <p className="text-sm font-semibold text-white">Satoshi Nakamoto</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-gray">Revenue this week</p>
              <p className="mt-2 text-2xl font-semibold">0.012 sBTC</p>
            </div>
            <div className="border border-border-gray bg-dark-grey/30 p-5">
              <p className="text-sm font-semibold text-white">Vitalik Buterin</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-gray">Unlock conversion</p>
              <p className="mt-2 text-2xl font-semibold">39%</p>
            </div>
            <div className="border border-border-gray bg-dark-grey/30 p-5">
              <p className="text-sm font-semibold text-white">Nadia Chain</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-gray">Bundle offers live</p>
              <p className="mt-2 text-2xl font-semibold">3</p>
            </div>
          </div>
        </section>

        <section id="history" className="border-b border-border-gray py-16 md:py-20">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-text-gray">Reader Proof</p>
          <h2 className="mb-8 font-space-grotesk text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Unlock History
          </h2>
          <div className="border border-border-gray bg-dark-grey/30 p-5">
            {unlockHistory.length === 0 ? (
              <p className="text-sm text-text-light-gray">
                No unlock transactions yet. Unlock any article to populate your proof-of-access log.
              </p>
            ) : (
              <div className="space-y-3">
                {unlockHistory.map((record) => (
                  <div key={record.id} className="flex flex-col justify-between gap-2 border border-border-gray p-4 md:flex-row md:items-center">
                    <div>
                      <p className="text-sm font-medium text-white">{record.articleTitle}</p>
                      <p className="mt-1 text-xs text-text-gray">
                        {record.timestamp.toLocaleString()} | {record.amount} sBTC
                      </p>
                    </div>
                    <a
                      className="text-xs uppercase tracking-[0.16em] text-text-light-gray underline-offset-4 hover:text-white hover:underline"
                      href={`https://explorer.hiro.so/txid/${record.txId}?chain=testnet`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View tx
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="trust" className="pt-16 md:pt-20">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-text-gray">
            Verification Layer
          </p>
          <h2 className="mb-10 font-space-grotesk text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Transaction Verification
          </h2>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="border border-border-gray bg-dark-grey/40 p-6 md:p-8">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-text-gray">
                Transaction ID
              </p>
              <p className="mb-8 max-w-full overflow-hidden text-ellipsis font-mono text-sm text-text-light-gray">
                0x1234567890abcdef1234567890abcdef12345678
              </p>
              <TransactionStatus
                txId="0x1234567890abcdef1234567890abcdef12345678"
                status="confirmed"
              />
            </div>
            <div className="border border-border-gray bg-dark-grey/30 p-6">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-text-gray">Security and Fees</p>
              <ul className="space-y-3 text-sm text-text-light-gray">
                <li>Post-condition protected transfers</li>
                <li>Explicit tx preview before signing</li>
                <li>Estimated unlock fee displayed in wallet</li>
                <li>Explorer-verifiable proof of unlock</li>
              </ul>
              <div className="mt-6 border-t border-border-gray pt-4 text-xs uppercase tracking-[0.16em] text-text-gray">
                Unlocked now: {unlockedCount} / {articles.length} articles
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Paywall Modal */}
      {showPaywall && selectedArticle && (
        <PaywallModal
          articleId={selectedArticle.id}
          articleTitle={selectedArticle.title}
          price={selectedArticle.price}
          creatorAddress="ST2CY5V39NXBXVKJJ3K6VF4N6J2Y9Q5X8C3YJ2J9C"
          onClose={() => {
            setShowPaywall(false);
            setSelectedArticle(null);
          }}
          onSuccess={(txId) => {
            if (!selectedArticle) {
              return;
            }

            markArticleUnlocked(selectedArticle.id);
            setUnlockHistory((current) => [
              {
                id: `${selectedArticle.id}-${Date.now()}`,
                articleTitle: selectedArticle.title,
                txId,
                amount: selectedArticle.price,
                status: "confirmed",
                timestamp: new Date(),
              },
              ...current,
            ]);
          }}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;
