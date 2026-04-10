export default async function handler(req, res) {
  const { q = 'e', language = 'en', sortBy = 'publishedAt', pageSize = 20, page = 1 } = req.query;
  
  // Use environment variable fallback for local development if not in Vercel. 
  // IMPORTANT: The user must add this to Vercel environment variables!
  const apiKey = process.env.NEWS_API_KEY || "0a9069f5ff1f4805888d3ec74d79118f";

  const url = `https://newsapi.org/v2/everything?q=${q}&language=${language}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Set CORS headers so local testing works if needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error("NewsProxy Error:", error);
    res.status(500).json({ error: "Failed to fetch data from NewsAPI." });
  }
}
