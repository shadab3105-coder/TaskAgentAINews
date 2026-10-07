# AI Competitor Watch Agent (MERN)

This project is an AI-powered competitor news monitoring agent, also known as a News Gatherer. It collects news from multiple sources worldwide and uses AI to analyze and verify the information for accuracy and credibility.

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

* `MONGO_URI` – Optional, for saving history/because it save every search history stored in Database
* `ANTHROPIC_API_KEY` – Here you can use OpenRouter APi which will be easy for New Developers 

Few Screenshots:- 
<img width="1258" height="858" alt="image" src="https://github.com/user-attachments/assets/55a4648a-fadf-472a-bdaa-b143299b0da6" />

<img width="1081" height="855" alt="image" src="https://github.com/user-attachments/assets/b35d6974-2a79-4b47-a3cb-23a42d5e06f2" />



