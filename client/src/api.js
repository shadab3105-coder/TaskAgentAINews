// Backend se baat karne wale saare functions yaha hain

export async function getCompanies() {
  const res = await fetch("/api/companies");
  return res.json();
}

export async function runAgent(companies, days) {
  const res = await fetch("/api/agent/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companies, days }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Agent fail ho gaya");
  return data;
}
