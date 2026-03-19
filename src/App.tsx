import { useState } from "react";
import { WalletProvider } from "./context/WalletContext";
import {
  ConnectWalletButton,
  PaywallModal,
  ArticleCard,
  TransactionStatus,
} from "./components";
import type { Article } from "./types";
import "./App.css";

const AppContent = () => {
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const mockArticles: Article[] = [
    {
      id: "1",
      title: "The Future of Decentralized Media on Bitcoin",
      preview:
        "Exploring how Layer 2 solutions like Stacks are enabling programmable Bitcoin for content creators...",
      author: "Satoshi Nakamoto",
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
      price: "0.0002",
      isLocked: false,
      isPurchased: true,
      createdAt: new Date(),
      content: "Full unlocked article content...",
    },
  ];

  const handleArticleClick = (article: Article) => {
    if (article.isLocked && !article.isPurchased) {
      setSelectedArticle(article);
      setShowPaywall(true);
    }
  };

  return (
    <div className="min-h-screen bg-space-grey text-light-text">
      {/* Header */}
      <header className="border-b border-accent p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-accent font-space-grotesk">
              FLUENT
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Pay-to-unlock journalism on Bitcoin
            </p>
          </div>
          <ConnectWalletButton showBalance />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <section className="mb-12 p-8 border border-accent bg-dark-grey">
          <h2 className="text-3xl font-bold text-accent font-space-grotesk mb-4">
            Tokenized Journalism
          </h2>
          <p className="text-light-text mb-6">
            Unlock premium articles with minimal sBTC transfers. Fast, secure,
            and powered by Bitcoin's Layer 2.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="border border-accent p-4">
              <div className="text-accent font-bold">&lt;5s</div>
              <div className="text-gray-400">Fast blocks</div>
            </div>
            <div className="border border-accent p-4">
              <div className="text-accent font-bold">Nano</div>
              <div className="text-gray-400">Fees</div>
            </div>
            <div className="border border-accent p-4">
              <div className="text-accent font-bold">Bitcoin</div>
              <div className="text-gray-400">Native</div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section>
          <h2 className="text-2xl font-bold text-light-text font-space-grotesk mb-6">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClickLocked={() => handleArticleClick(article)}
                onClickUnlocked={() => console.log("Read article", article.id)}
              />
            ))}
          </div>
        </section>

        {/* Component Showcase */}
        <section className="mt-12 pt-12 border-t border-accent">
          <h2 className="text-2xl font-bold text-light-text font-space-grotesk mb-6">
            UI Components
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-lg font-bold text-accent mb-3">
                Transaction Status
              </h3>
              <TransactionStatus
                txId="0x1234567890abcdef1234567890abcdef12345678"
                status="confirmed"
              />
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
          onSuccess={(txId) => console.log("Purchase successful:", txId)}
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
