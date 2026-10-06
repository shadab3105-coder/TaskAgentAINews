// STEP 2: Noise hatana
// Stock-tips, clickbait, listicles jaisi cheezein "meaningful update" nahi hain.

const NOISE_PATTERNS = [
  /should you buy/i,
  /stock (market )?today/i,
  /best (stocks?|ai stocks?|etfs?)/i,
  /price (prediction|target)/i,
  /\bhoroscope\b/i,
  /\b(coupon|promo code|deal of the day|giveaway)\b/i,
  /\btop \d+\b/i,
  /\bhere'?s why\b/i,
  /\bwhat you need to know\b/i,
  /\b(zacks|motley fool|benzinga)\b/i,
  /\b(shares?|stock) (rise|rises|fall|falls|jump|jumps|slip|slips|surge|surges|drop|drops)\b/i,
];

function isRelevant(article, company) {
  const text = `${article.title} ${article.snippet}`.toLowerCase();
  return company.aliases.some((alias) => text.includes(alias));
}

function isNoise(article) {
  return NOISE_PATTERNS.some((p) => p.test(article.title));
}

// returns { kept, removed }
function filterNoise(articles, company) {
  const kept = [];
  let removed = 0;
  for (const a of articles) {
    if (!a.title || a.title.length < 15) { removed++; continue; }     // bahut chhota title
    if (!isRelevant(a, company)) { removed++; continue; }             // company se related nahi
    if (isNoise(a)) { removed++; continue; }                          // clickbait / stock-tip
    kept.push(a);
  }
  return { kept, removed };
}

module.exports = { filterNoise };
