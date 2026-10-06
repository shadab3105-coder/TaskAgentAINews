// Company chips + days dropdown + Run button

export default function CompanySelector({ companies, selected, setSelected, days, setDays, onRun, loading }) {
  const toggle = (name) =>
    setSelected(selected.includes(name) ? selected.filter((c) => c !== name) : [...selected, name]);

  return (
    <section className="panel">
      <h2>Which of the Company You Want to Track?</h2>

      <div className="chips">
        {companies.map((name) => (
          <button
            key={name}
            className={selected.includes(name) ? "chip on" : "chip"}
            onClick={() => toggle(name)}
            aria-pressed={selected.includes(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="controls">
        <button className="link" onClick={() => setSelected(companies)}>Select all</button>
        <button className="link" onClick={() => setSelected([])}>Clear</button>

        <label className="days">
          Time window
          <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
            <option value={1}>Last 24 hours</option>
            <option value={3}>Last 3 days</option>
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
          </select>
        </label>

        <button className="run" onClick={onRun} disabled={loading || selected.length === 0}>
          {loading ? "Agent is now running…" : `Run agent (${selected.length})`}
        </button>
      </div>
    </section>
  );
}
