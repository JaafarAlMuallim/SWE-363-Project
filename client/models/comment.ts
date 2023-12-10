import User from "./user";

export default interface Comment {
  comment_id?: string;
  user_id?: string;
  article_id?: string;
  content: string;
  date?: string;
  comment_likes?: number;
  user: User;
}
