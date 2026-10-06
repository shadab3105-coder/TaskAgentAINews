// STEP 4: Category lagana (rule-based keyword scoring)
// Jis category ke keywords sabse zyada match karein, wahi category milti hai.

const CATEGORIES = {
  product: [
    "launch","launches","unveil","unveils","releases","release","introduces","rolls out",
    "new model","feature","upgrade","chip","gpu","iphone","model","beta","robotaxi",
  ],
  pricing: [
    "price","pricing","price cut","price hike","discount","subscription","plan","fee","cheaper",
    "free tier","costs","tariff",
  ],
  hiring: [
    "hiring","hires","hired","layoff","layoffs","job cuts","jobs","recruit","workforce",
    "appoints","appointed","joins as","talent","poach","headcount","employees","engineers",
  ],
  partnership: [
    "partnership","partners","partnered","collaboration","collaborates","alliance","joint venture",
    "teams up","deal with","signs","agreement","acquires","acquisition","acquire","invests in","stake",
  ],
  financial: [
    "earnings","revenue","profit","quarter","q1","q2","q3","q4","guidance","funding","raises",
    "valuation","ipo","billion","forecast","results","dividend",
  ],
  legal: [
    "lawsuit","sues","sued","regulator","regulation","antitrust","fine","fined","probe","investigation",
    "court","ban","compliance","privacy","settlement","ruling","ftc","doj",
  ],
  leadership: [
    "ceo","cfo","cto","chairman","steps down","resigns","resign","executive","board","successor","leadership",
  ],
};

// Kaunsi category kitni important hai (brief me ranking ke liye)
const CATEGORY_WEIGHT = {
  product: 5, pricing: 5, partnership: 5, legal: 4, leadership: 4, hiring: 3, financial: 3, other: 1,
};

function categorize(article) {
  const title = article.title.toLowerCase();
  const text = `${title} ${article.snippet}`.toLowerCase();
  let best = "other";
  let bestScore = 0;

  for (const [category, words] of Object.entries(CATEGORIES)) {
    // title ke match ko double weight
    const score = words.reduce((sum, w) => {
      const inTitle = title.includes(w) ? 2 : 0;
      const inText = text.includes(w) ? 1 : 0;
      return sum + inTitle + inText;
    }, 0);
    if (score > bestScore) { best = category; bestScore = score; }
  }
  return best;
}

// Importance score = category weight + kitne sources ne cover kiya + recency
function scoreImportance(article) {
  const ageDays = (Date.now() - new Date(article.date)) / (1000 * 60 * 60 * 24);
  const recency = Math.max(0, 3 - ageDays * 0.4);
  const coverage = Math.min(article.sources.length, 5);
  return +(CATEGORY_WEIGHT[article.category] + coverage + recency).toFixed(2);
}

function categorizeAll(articles) {
  return articles.map((a) => {
    const withCat = { ...a, category: categorize(a) };
    return { ...withCat, importance: scoreImportance(withCat) };
  });
}

module.exports = { categorizeAll, CATEGORIES: [...Object.keys(CATEGORIES), "other"] };
