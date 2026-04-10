import Sentiment from "sentiment";


const sentimentAnalyzer = new Sentiment();

export const analyzeSentiment = (text) => {
  const result = sentimentAnalyzer.analyze(text);

  return {
    label:
      result.score > 0
        ? "positive"
        : result.score < 0
        ? "negative"
        : "neutral",
    score: result.score,
    comparative: result.comparative,
  };
};


export const calculateGlobalSentiment = (articles)=>{
  if(articles.length === 0 ) return 0
  
  const totalScore = articles.reduce((sum,article)=>{
    return sum + (article.sentimentComparative ?? 0)
  } ,0)
  const avg = totalScore / articles.length
  return ((Math.max(-1 , Math.min(1,avg)) + 1) /2) * 100
}