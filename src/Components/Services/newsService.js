import axios from "axios";
import { analyzeSentiment } from "../Utils/sentiment";



const NEWS_API_KEY = "0a9069f5ff1f4805888d3ec74d79118f";

export const fetchArticles = async () => {
  // Use Vercel Serverless Function proxy in production to bypass NewsAPI restriction
  const isLocalDev = import.meta.env.DEV;
  const baseUrl = isLocalDev ? "https://newsapi.org/v2/everything" : "/api/news";
  
  const params = {
    q: "e",
    language: "en",
    sortBy: "publishedAt",
    pageSize: 20,
    page: 1,
  };

  // Only pass API key directly if we are developing locally without the Vercel proxy
  if (isLocalDev) {
    params.apiKey = NEWS_API_KEY;
  }

  const res = await axios.get(baseUrl, { params });

    const numOfArticles = res.data.totalResults;

      const articlesWithSentiment = res.data.articles.map((article) => {
      const text = `${article.title || ""} ${article.description || ""}`;
      const sentiment = analyzeSentiment(text);

      return {
        ...article,
        sentiment: sentiment.label,
        sentimentScore: sentiment.score,
        sentimentComparative: sentiment.comparative,
      };
    });
  
    return {
        articles:articlesWithSentiment,
        numOfArticles
    }
};
