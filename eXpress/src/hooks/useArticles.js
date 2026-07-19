import { useEffect, useState } from "react";

const MEDIUM_FEED = "https://medium.com/feed/@djsexpresso";

function extractImage(html, fallback) {
  const match = html && html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : fallback;
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
}

// 1. Add this new helper function to extract the name
function extractAuthor(html, fallback) {
  // Scans the HTML for "brewed in-house by [Name]" ignoring case.
  // It stops matching when it hits a closing HTML tag (like </em> or </p>).
  const match = html && html.match(/brewed in-house by\s+([^<]+)/i);
  return match ? match[1].trim() : fallback;
}

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const proxied = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          MEDIUM_FEED
        )}`;
        const res = await fetch(proxied);
        if (!res.ok) throw new Error("Failed to reach Medium feed");
        const data = await res.json();
        if (data.status !== "ok") throw new Error("Medium feed returned an error");

        const mapped = data.items
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          .map((item, i, arr) => ({
            n: String(arr.length - i).padStart(3, "0"),
            title: item.title,
            
            // 2. Wrap item.content in the extractAuthor function here
            author: extractAuthor(item.content, item.author || "eXpress writers"),
            
            date: new Date(item.pubDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            url: item.link,
            img: extractImage(
              item.content,
              "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop"
            ),
            excerpt: stripHtml(item.description).slice(0, 140),
          }));

        if (!cancelled) {
          setArticles(mapped);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { articles, loading, error };
}