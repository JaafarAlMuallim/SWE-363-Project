export default interface User {
  user_id?: string;
  name: string;
  email: string;
  username: string;
  role: string;
  verified: boolean;
  user_image?: File;
  x_account?: string;
  linkdin_account?: string;
  website?: string;
  overview?: string;
}
