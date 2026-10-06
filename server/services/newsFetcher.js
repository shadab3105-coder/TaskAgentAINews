// STEP 1: Recent news dhundna
// Google News RSS use kar rahe hain - free hai, API key nahi chahiye.

const Parser = require("rss-parser");
const parser = new Parser({ customFields: { item: ["source"] }, timeout: 15000 });

// Google News title ke end me " - Reuters" jaisa source hota hai, usse hata do
function cleanTitle(title = "") {
  return title.replace(/\s+-\s+[^-]+$/, "").trim();
}

async function fetchNews(company, days = 7) {
  const q = encodeURIComponent(`${company.query} when:${days}d`);
  const url = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;

  const feed = await parser.parseURL(url);

  return feed.items.map((item) => ({
    company: company.name,
    title: cleanTitle(item.title),
    rawTitle: item.title,
    link: item.link,
    date: item.isoDate || item.pubDate,
    source: (item.source && (item.source._ || item.source)) || "Unknown",
    snippet: (item.contentSnippet || "").trim(),
  }));
}

module.exports = { fetchNews };
