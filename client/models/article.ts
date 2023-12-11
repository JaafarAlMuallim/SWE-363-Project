import Tag from "./tag";
import Comment from "./comment";
import User from "./user";

export default interface Article {
  article_id?: string;
  user_id?: string;
  org_id?: string;
  title: string;
  content: HTMLParagraphElement;
  subtitle?: string;
  date?: string;
  article_image?: string;
  article_tags?: Tag[];
  comment?: Comment[];
  likes?: number;
  views?: number;
  bookmarks?: boolean;
  article_status?: string;
  user?: User;
}
