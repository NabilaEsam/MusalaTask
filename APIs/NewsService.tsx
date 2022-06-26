import { Network } from "./Network";

export class NewsService {
  static getNews(lang: string) {
    const API_KEY = "e1020b8ed7894a8dadec00a544983173";
    const Url: string = `https://newsapi.org/v2/everything?pageSize=20&q=economy&sortBy=popularity&apiKey=${API_KEY}&language=${lang}`;
    return Network.fetch(Url, {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    });
  }
}
