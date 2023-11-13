export default interface Article {
  id?: number;
  title: string;
  content: string;
  subtitle?: string;
  author?: string;
  date?: string;
  image?: string;
  tags?: string[];
}
