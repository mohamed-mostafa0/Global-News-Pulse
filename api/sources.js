export default async function handler(req, res) {
  const { country = 'us', pageSize = 20 } = req.query;
  
  const apiKey = process.env.NEWS_API_KEY || "0a9069f5ff1f4805888d3ec74d79118f";
  
  const url = `https://newsapi.org/v2/top-headlines/sources?country=${country}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error("SourcesProxy Error:", error);
    res.status(500).json({ error: "Failed to fetch sources from NewsAPI." });
  }
}
