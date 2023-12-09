import Tag from "./tag";
import Comment from "./comment";

export default interface Article {
  article_id?: string;
  user_id?: string;
  org_id?: string;
  title: string;
  content: string;
  subtitle?: string;
  date?: string;
  article_image?: string;
  article_tags?: Tag[];
  comment?: Comment[];
  likes?: number;
  views?: number;
  bookmarks?: boolean;
  article_status?: string;
}
