import NewsAPI from "newsapi";
import environment from "../config/environment.js";
const newsapi = new NewsAPI(environment.newsApiKey);
export const getNews = async (req, res) => {
  try {
    newsapi.v2
      .topHeadlines({
        country: "in",
        category: "technology",
        language: "en",
      })
      .then((response) => {
        const articles = response.articles.slice(0, 4).map((article) => ({
          title: article.title,
          author: article.author,
          url: article.url,
          publishedAt: article.publishedAt,
          urlToImage: article.urlToImage,
        }));
        res.status(200).json(articles);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
