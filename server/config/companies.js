// Har company ke liye:
//  query   : Google News me search hone wala text
//  aliases : article relevant hai ya nahi, ye check karne ke liye naam
// Apple/Meta/Amazon jaise common words ke liye query thodi specific rakhi hai.

const COMPANIES = [
  { name: "Tesla",              query: "Tesla Inc",                aliases: ["tesla"] },
  { name: "IBM",                query: "IBM",                      aliases: ["ibm"] },
  { name: "Reliance Industries",query: "Reliance Industries",      aliases: ["reliance", "jio", "mukesh ambani"] },
  { name: "Microsoft",          query: "Microsoft",                aliases: ["microsoft", "azure", "copilot"] },
  { name: "Google",             query: "Google Alphabet",          aliases: ["google", "alphabet", "gemini", "deepmind"] },
  { name: "Amazon",             query: "Amazon AWS",               aliases: ["amazon", "aws"] },
  { name: "Apple",              query: "Apple Inc iPhone",         aliases: ["apple", "iphone", "ios"] },
  { name: "NVIDIA",             query: "NVIDIA",                   aliases: ["nvidia"] },
  { name: "OpenAI",             query: "OpenAI",                   aliases: ["openai", "chatgpt", "gpt"] },
  { name: "Meta",               query: "Meta Platforms Facebook",  aliases: ["meta", "facebook", "instagram", "whatsapp"] },
];

module.exports = COMPANIES;

//like product.js like file