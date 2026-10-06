// Upar wala "Intelligence Brief" - overview + har company ka ek-line takeaway

export default function BriefSummary({ brief, generatedAt }) {
  return (
    <section className="panel brief">
      <header>
        <h2>Intelligence brief</h2>
        <small>
          {new Date(generatedAt).toLocaleString()} · {brief.mode === "ai" ? "written by AI" : "rule-based summary"}
        </small>
      </header>

      {brief.overview && <p className="overview">{brief.overview}</p>}

      <div className="brief-grid">
        {brief.companies.map((c) => (
          <article key={c.company}>
            <h3>{c.company}</h3>
            <p className="headline">{c.headline}</p>
            {c.highlights.length > 0 && (
              <ul>
                {c.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
