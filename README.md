# AI Competitor Watch Agent (MERN)

This project is an AI-powered competitor news monitoring agent.

It tracks recent news about companies like Tesla, Google, Microsoft, Amazon, Apple, OpenAI, Meta, and others.

The agent:

* Fetches recent news from Google News RSS
* Removes irrelevant and duplicate articles
* Categorizes the news
* Ranks important updates
* Generates a short intelligence brief

## Tech Stack

* React.js + Vite
* Node.js + Express.js
* MongoDB + Mongoose
* Claude API (optional)
* Google News RSS

## Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open: `http://localhost:5173`

## Environment Variables

* `MONGO_URI` – Optional, for saving history
* `ANTHROPIC_API_KEY` – Optional, for Claude-generated briefs
  yaha pe meine openrouter dya h