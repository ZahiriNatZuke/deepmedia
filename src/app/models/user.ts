import {PivotUserVideo} from "./pivot-user-video";

export class User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  pivot?: PivotUserVideo;
}
