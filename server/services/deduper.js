// STEP 3: Duplicates hatana
// Ek hi khabar 10 websites pe alag title ke saath aati hai.
// Titles ko words me todna, aur Jaccard similarity se compare karo.

const STOP_WORDS = new Set([
  "the","a","an","and","or","of","to","in","on","for","with","at","by","from",
  "is","are","as","its","it","this","that","new","says","will","after","over",
]);

function tokens(title) {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

function similarity(a, b) {
  const inter = [...a].filter((w) => b.has(w)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

// Latest article pehle aayega. Similar articles ek group me merge honge.
function dedupe(articles, threshold = 0.5) {
  const sorted = [...articles].sort((x, y) => new Date(y.date) - new Date(x.date));
  const groups = [];

  for (const article of sorted) {
    const t = tokens(article.title);
    const match = groups.find((g) => similarity(t, g._tokens) >= threshold);

    if (match) {
      match.sources.push(article.source);
      match.relatedLinks.push({ source: article.source, link: article.link });
    } else {
      groups.push({
        ...article,
        sources: [article.source],
        relatedLinks: [{ source: article.source, link: article.link }],
        _tokens: t,
      });
    }
  }

  return groups.map(({ _tokens, ...rest }) => ({
    ...rest,
    sources: [...new Set(rest.sources)],
  }));
}

module.exports = { dedupe };
