import {User} from "./user";

export class Comment {
  id: number;
  user_id: number;
  video_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user?: User;
}
