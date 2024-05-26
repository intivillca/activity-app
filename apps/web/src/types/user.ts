import { Image } from "./image";

export interface UserBaseData {
  ID: number;
  username: string;
  img?: Image;
}
