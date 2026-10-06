// STEP 5: Final intelligence brief
// ANTHROPIC_API_KEY ho to Claude se likhwao, warna rule-based brief.

function ruleBasedBrief(results) {
  const companies = results.map((r) => {
    if (r.updates.length === 0) {
      return { company: r.company, headline: "No meaningful updates found.", highlights: [] };
    }
    const catCount = {};
    r.updates.forEach((u) => (catCount[u.category] = (catCount[u.category] || 0) + 1));
    const mix = Object.entries(catCount).map(([c, n]) => `${n} ${c}`).join(", ");
    return {
      company: r.company,
      headline: `${r.updates.length} updates (${mix}).`,
      highlights: r.updates.slice(0, 3).map((u) => `[${u.category}] ${u.title}`),
    };
  });
  return { mode: "rule-based", overview: null, companies };
}

async function aiBrief(results) {
  // Send only the top 5 updates per company (to save tokens)
  const compact = results.map((r) => ({
    company: r.company,
    updates: r.updates.slice(0, 5).map((u) => ({ title: u.title, category: u.category, source: u.sources[0] })),
  }));

//below is master prompt ye hi h jo json ko ek perfect format mei render krta h

  const prompt = `You are a competitive intelligence analyst. Below are categorized recent updates for several companies.
Write a concise brief as JSON ONLY (no markdown, no backticks) in this exact shape:
{"overview": "3-4 sentence cross-company takeaway",
 "companies": [{"company": "name", "headline": "one-line takeaway", "highlights": ["max 3 short bullets"]}]}
Only use facts present in the titles. Do not invent details.



DATA:
${JSON.stringify(compact)}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4.6",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`OpenRouter error ${res.status}`);
  const data = await res.json();
  const text = data.choices[0].message.content;
  const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
  return { mode: "ai", ...parsed };
}

async function generateBrief(results) {
  if (process.env.OPENROUTER_API_KEY) {
    try {
      return await aiBrief(results);
    } catch (err) {
      console.warn("AI brief failed, falling back to rule-based:", err.message);
    }
  }
  return ruleBasedBrief(results);
}

module.exports = { generateBrief };
