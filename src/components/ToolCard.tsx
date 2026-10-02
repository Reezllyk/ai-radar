import type { AiTool } from "../types/tool";
import "./ToolCard.css";

interface ToolCardProps {
    tool: AiTool;
}

export function ToolCard({ tool }: ToolCardProps) {
    return (
        <article className="tool-card">
            <div className="tool-card__top">
                <div className="tool-icon">
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(tool.domain)}&sz=64`}
                        alt=""
                    />
                </div>

                {tool.dr != null && (
                    <span className="domain-rating">DR {tool.dr}</span>
                )}
            </div>

            <h2>{tool.title || tool.domain}</h2>

            <p className="tool-domain">{tool.domain}</p>

            <p className="tool-description">
                {tool.ai_summary || "AI-powered website and digital tool."}
            </p>

            <div className="tool-meta">
                {tool.ai_categories?.slice(0, 2).map((category) => (
                    <span key={category}>{category}</span>
                ))}
            </div>

            <a
                className="visit-button"
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit website ↗
            </a>
        </article>
    );
}
