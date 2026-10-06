// MAIN AGENT: saare steps ek ke baad ek chalata hai
//   fetch -> noise filter -> dedupe -> categorize -> rank -> brief

const COMPANIES = require("../config/companies");
const { fetchNews } = require("./newsFetcher");
const { filterNoise } = require("./noiseFilter");
const { dedupe } = require("./deduper");
const { categorizeAll } = require("./categorizer");
const { generateBrief } = require("./briefGenerator");

// Ek company ka pura pipeline. `fetcher` inject kar sakte hain (testing ke liye).
async function processCompany(company, days, fetcher = fetchNews) {
  const raw = await fetcher(company, days);
  const { kept, removed } = filterNoise(raw, company);
  const unique = dedupe(kept);
  const updates = categorizeAll(unique)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 12); // top 12 hi rakho

  return {
    company: company.name,
    stats: {
      fetched: raw.length,
      noiseRemoved: removed,
      duplicatesRemoved: kept.length - unique.length,
      final: updates.length,
    },
    updates,
  };
}

async function runAgent({ companyNames, days = 7, fetcher } = {}) {
  const selected = COMPANIES.filter((c) => companyNames.includes(c.name));
  if (selected.length === 0) throw new Error("Koi valid company select nahi hui.");

  // Saari companies parallel me, ek fail ho to baaki chalti rahein
  const settled = await Promise.allSettled(selected.map((c) => processCompany(c, days, fetcher)));

  const results = settled.map((s, i) =>
    s.status === "fulfilled"
      ? s.value
      : { company: selected[i].name, error: s.reason.message, stats: {}, updates: [] }
  );

  const brief = await generateBrief(results);
  return { generatedAt: new Date().toISOString(), days, brief, results };
}

module.exports = { runAgent, processCompany };
