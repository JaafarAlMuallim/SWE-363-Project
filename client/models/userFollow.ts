import User from "./user";

export default interface UserFollow {
  follow_id: string;
  user_id: string;
  followed_id: string;
  followed?: User;
  user?: User;
}
