import { useEffect, useState } from "react";
import { ToolCard } from "./components/ToolCard";
import { getAiTools } from "./services/freeserp";
import type { AiTool } from "./types/tool";
import "./App.css";

type SortOption = "went_live" | "dr";

interface CategoryOption {
  label: string;
  value: string;
}

const categories: CategoryOption[] = [
  { label: "All", value: "" },
  { label: "Chatbots", value: "Chatbot & Assistant" },
  { label: "Images", value: "Image Generation" },
  { label: "Video", value: "Video Generation" },
  { label: "Code", value: "Code & Dev Tools" },
  { label: "Writing", value: "LLM & Prompt Tools" },
];

function App() {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortOption>("went_live");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function loadTools() {
      try {
        setLoading(true);
        setError("");

        const result = await getAiTools(query, sort, category);
        setTools(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load AI tools. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void loadTools();
  }, [query, sort, category, retryCount]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(search.trim());
  }

  function handleSurpriseMe() {
    if (tools.length === 0) return;

    const randomTool = tools[Math.floor(Math.random() * tools.length)];
    window.open(randomTool.url, "_blank", "noopener,noreferrer");
  }

  return (
      <div className="app">
        <header className="header">
          <div className="container header__inner">
            <a className="logo" href="/">
              AI Radar
            </a>

            <a
                className="github-link"
                href="https://github.com/Reezllyk/ai-radar"
                target="_blank"
                rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="container">
              <span className="eyebrow">AI TOOLS DIRECTORY</span>

              <h1>Discover useful AI tools.</h1>

              <p>
                Explore new AI-powered websites for work, creativity
                and development.
              </p>

              <form className="search" onSubmit={handleSearch}>
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search AI tools..."
                    aria-label="Search AI tools"
                />

                <button type="submit">Search</button>
              </form>

              <div className="hero-actions">
                <button
                    className="surprise-button"
                    type="button"
                    disabled={loading || tools.length === 0}
                    onClick={handleSurpriseMe}
                >
                  ✦ Surprise me
                </button>

                {!loading && tools.length > 0 && (
                    <span className="hero-count">
                      {tools.length} AI tools available
                    </span>
                )}
              </div>
            </div>
          </section>

          <section className="container catalog">
            <div className="toolbar">
              <div className="categories">
                {categories.map((item) => (
                    <button
                        key={item.value || "all"}
                        type="button"
                        className={category === item.value ? "active" : ""}
                        onClick={() => setCategory(item.value)}
                    >
                      {item.label}
                    </button>
                ))}
              </div>

              <select
                  value={sort}
                  aria-label="Sort AI tools"
                  onChange={(event) =>
                      setSort(event.target.value as SortOption)
                  }
              >
                <option value="went_live">Newest</option>
                <option value="dr">Domain Rating</option>
              </select>
            </div>


            {loading && (
                <div className="state">
                  <div className="loader" />
                  <p>Loading AI tools...</p>
                </div>
            )}

            {!loading && error && (
                <div className="state">
                  <h2>Something went wrong</h2>
                  <p>{error}</p>

                  <button
                      type="button"
                      onClick={() => setRetryCount((count) => count + 1)}
                  >
                    Try again
                  </button>
                </div>
            )}

            {!loading && !error && tools.length === 0 && (
                <div className="state">
                  <h2>No AI tools found</h2>
                  <p>Try another search query or category.</p>
                </div>
            )}

            {!loading && !error && tools.length > 0 && (
                <>
                  <div className="results-header">
                    <span>{tools.length} tools found</span>
                  </div>

                  <div className="tool-grid">
                    {tools.map((tool) => (
                        <ToolCard
                            key={`${tool.domain}-${tool.url}`}
                            tool={tool}
                        />
                    ))}
                  </div>
                </>
            )}
          </section>
        </main>

        <footer>
          <div className="container">
            <span>AI Radar</span>
            <span>Powered by FreeSerp API</span>
          </div>
        </footer>
      </div>
  );
}

export default App;
