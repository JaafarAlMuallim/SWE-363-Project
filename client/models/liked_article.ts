import Article from "./article";
export default interface LikedArticle {
  article: Article;
  liked_id: string;
  user_id: string;
  article_id: string;
}
