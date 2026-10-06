// Run: npm test
// Fake news data se pipeline test - internet / DB ki zarurat nahi.
const { processCompany } = require("./services/agent");
const COMPANIES = require("./config/companies");

const now = new Date().toISOString();
const mockFetcher = async (company) => [
  { company: company.name, title: "NVIDIA unveils new Blackwell GPU for data centers", source: "Reuters", link: "#1", date: now, snippet: "" },
  { company: company.name, title: "Nvidia unveils Blackwell GPU for data centers", source: "CNBC", link: "#2", date: now, snippet: "" },
  { company: company.name, title: "NVIDIA announces partnership with Reliance for AI cloud", source: "Mint", link: "#3", date: now, snippet: "" },
  { company: company.name, title: "Should you buy NVIDIA stock today?", source: "Motley Fool", link: "#4", date: now, snippet: "" },
  { company: company.name, title: "NVIDIA is hiring 2,000 engineers in India", source: "ET", link: "#5", date: now, snippet: "" },
  { company: company.name, title: "Best weather for weekend picnic this year", source: "Blog", link: "#6", date: now, snippet: "" },
];

(async () => {
  const nvidia = COMPANIES.find((c) => c.name === "NVIDIA");
  const out = await processCompany(nvidia, 7, mockFetcher);
  console.log("STATS:", out.stats);
  out.updates.forEach((u) => console.log(`- [${u.category}] ${u.title} (sources: ${u.sources.join(", ")}, score ${u.importance})`));
})();
