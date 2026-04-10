import React, { useEffect, useMemo, useState } from "react";
import notFoundImg from '../assets/notFoundImg.png'
import { GrShare } from "react-icons/gr";
import { timeAgo } from "../Components/Utils/dateAgo";
import { analyzeSentiment, calculateGlobalSentiment } from "../Components/Utils/sentiment";
import { fetchArticles } from "../Components/Services/newsService";
import DashboardStats from "../Components/Sections/DashboardStats";
import { FiFilter } from "react-icons/fi";
import MapChart from "../Components/Sections/MapChart";
import axios from "axios";
import SentimentTrendsChart from "../Components/Sections/SentimentTrendsChart";

export default  function Home() {
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(false);
const [numOfArticles, setnumOfArticles] = useState(0);
const [filterSentiment, setfilterSentiment] = useState('All')
const [LoadingMap, setLoadingMap] = useState(true)
const [CountrySentiment, setCountrySentiment] = useState({})
const filters = ["All" , "positive" , "neutral" , "negative"]


const globalSentiment = useMemo(()=>{
  return calculateGlobalSentiment(articles)  
},[articles])

const filteredArticlesBySentiment = useMemo(()=>{
      if(filterSentiment === "All") return articles
      
      return articles.filter((article)=>{
          return article.sentiment === filterSentiment
      })
        
      },[articles , filterSentiment])

const getArticles = async ()=>{
  setLoading(true)
  
  try{
    const {articles , numOfArticles} = await fetchArticles()
    // console.log(articles);
    
     setArticles(articles)
     setnumOfArticles(numOfArticles)
  }catch(err){
    console.log(err);
    
  }finally{
    setLoading(false)
  }
}

  useEffect(() => {
    const fetchSentiment = async () => {
      setLoadingMap(true);

      const countries = ["us", "au", "ar"];
      const results = {};

      try {
        await Promise.all(
          countries.map(async (country) => {
            let count = 0;
            let totalScore = 0;

            const res = await axios.get(
              "https://newsapi.org/v2/top-headlines/sources",
              {
                params: {
                  country,
                  pageSize: 20,
                  apiKey: "0a9069f5ff1f4805888d3ec74d79118f",
                },
              }
            );

            res.data.sources.forEach((article) => {
              const text = `${article.title || ""} ${
                article.description || ""
              }`;
                console.log(article);
                
              const sentiment = analyzeSentiment(text);

              totalScore += sentiment.score;
              count++;
            });

            const avg = count ? totalScore / count : 0;

            
            const normalized = Math.max(-30, Math.min(30, avg * 2));

            results[country.toUpperCase()] = Math.round(normalized);
          })
        );

        setCountrySentiment(results);
      } catch (err) {
        console.log("Error fetching sentiment:", err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchSentiment();
  }, []);



useEffect(() => {
  getArticles();
}, []);
 

  return (
    <>
    
      <div className="bg-background px-10 py-10">
          <DashboardStats numOfArticles={numOfArticles} globalSentiment={globalSentiment}/>
          <SentimentTrendsChart/>
        <MapChart sentimentData={CountrySentiment} />
        <div className="py-6 ">
          <div className="px-3 py-5 mb-8 bg-[#ffffff08] flex items-center justify-between rounded-2xl border border-white/10">
            <div className="flex items-center">
              <FiFilter className="text-neon-cyan text-xl mr-2"/>
              <h5 className="text-lg text-white/90">Filter Feed</h5>
            </div>
           <div>
            <div className="p-1 flex items-center border font-medium text-xs border-white/10 rounded-lg bg-black/20">
            {filters.map((filter)=><>
              <button
               className={`px-3 py-1  rounded-md ${filterSentiment === filter ? "bg-white/10 text-white":"text-white/40 hover:text-white/80"}  transition-all`}
               onClick={()=>{setfilterSentiment(filter);
               }}
               >{filter}</button>
            </>)}


            </div>
           </div> 
          </div>

          {loading && <p>Loading articles...</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticlesBySentiment.map((article, index) => (
              <div
                key={index}
                className="relative p-4 border overflow-hidden   bg-[#ffffff08] rounded-xl shadow flex flex-col h-full transition group hover:-translate-y-2 cursor-pointer duration-500 border-[#ffffff14]"
              >
                <div className="absolute inset-0  -translate-x-full group-hover:translate-x-full duration-700 transition-transform ease-in-out">
                    <div className="absolute inset-y-0 w-1/2
                 bg-linear-to-r from-white/20  to-transparent
                 blur-xl  origin-left"/>
                </div>
                {/* <img src={article.urlToImage ? article.urlToImage :notFoundImg} alt="" className="max-h-50 object-cover" /> */}
                <div className="flex justify-between">
                <h2 className="font-semibold mr-4 text-white hover:text-neon-cyan duration-300">{article.title}</h2> 
                <p className={`h-fit py-[2px] px-2 text-sm rounded-4xl border font-semibold ${
                    article.sentiment === "positive"
                      ? "text-neon-green border-neon-green/40 bg-neon-green/10 shadow-[0_0_10px_rgba(0,255,136,0.3)]"
                      : article.sentiment === "negative"
                      ? "text-pink-400 border-pink-400/40 bg-pink-500/10 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                      : "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10 shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                  }`}>{article.sentiment}</p>
                </div>
                <p className="text-sm text-gray-600">{article.source.name}</p>
                <p className="mt-2 text-white line-clamp-2 mb-3">{article.description}</p>
                <div className="mt-auto flex items-center justify-between">
                <p className="text-neon-cyan">{timeAgo(article.publishedAt)}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-cyan underline inline-block "
                >
                  <GrShare />
                </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

