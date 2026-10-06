import { useEffect, useMemo, useState } from "react";
import { getCompanies, runAgent } from "./api";
import CompanySelector from "./components/CompanySelector.jsx";
import BriefSummary from "./components/BriefSummary.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import UpdateCard from "./components/UpdateCard.jsx";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [days, setDays] = useState(7);

  const [data, setData] = useState(null);      // agent ka poora output
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Page khulte hi company list laao
  useEffect(() => {
    getCompanies().then((d) => {
      setCompanies(d.companies);
      setCategories(d.categories);
      setSelected(d.companies); // by default saari 10
    });
  }, []);

  async function handleRun() {
    setLoading(true);
    setError("");
    setActiveCategory("all");
    try {
      setData(await runAgent(selected, days));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Saari companies ke updates ek list me, importance ke order me
  const allUpdates = useMemo(
    () => (data ? data.results.flatMap((r) => r.updates).sort((a, b) => b.importance - a.importance) : []),
    [data]
  );

  const counts = useMemo(() => {
    const c = { all: allUpdates.length };
    allUpdates.forEach((u) => (c[u.category] = (c[u.category] || 0) + 1));
    return c;
  }, [allUpdates]);

  const visible = activeCategory === "all" ? allUpdates : allUpdates.filter((u) => u.category === activeCategory);

  // Overall stats
  const totals = data?.results.reduce(
    (t, r) => ({
      fetched: t.fetched + (r.stats.fetched || 0),
      noise: t.noise + (r.stats.noiseRemoved || 0),
      dupes: t.dupes + (r.stats.duplicatesRemoved || 0),
    }),
    { fetched: 0, noise: 0, dupes: 0 }
  );
  const failed = data?.results.filter((r) => r.error) || [];

  return (
    <main className="page">
      <header className="top">
        <h1>Competitor Watch</h1>
        <p>Recent news, category-wise, without noise & dupliactes.</p>
      </header>

      <CompanySelector
        companies={companies}
        selected={selected}
        setSelected={setSelected}
        days={days}
        setDays={setDays}
        onRun={handleRun}
        loading={loading}
      />

      {error && <p className="error" role="alert">{error}</p>}

      {!data && !loading && !error && (
        <p className="empty">Select the companies and click “Run Agent.” The brief will appear here.</p>
      )}

      {data && (
        <>
          <p className="stats">
            {totals.fetched} articles mile → {totals.noise} noise hataye → {totals.dupes} duplicates merge → <strong>{allUpdates.length} meaningful updates</strong>
          </p>
          {failed.length > 0 && (
            <p className="error">Fetch fail hua: {failed.map((f) => f.company).join(", ")} (internet check karo)</p>
          )}

          <BriefSummary brief={data.brief} generatedAt={data.generatedAt} />

          <section className="panel">
            <h2>All updates</h2>
            <CategoryFilter categories={categories} active={activeCategory} setActive={setActiveCategory} counts={counts} />
            <div className="updates">
              {visible.length === 0 && <p className="empty">Is category me kuch nahi mila.</p>}
              {visible.map((u, i) => <UpdateCard key={u.link + i} update={u} />)}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
