import { User } from "./User";

export interface Comment
{
    body:string;
    time?:Date;
    by:User;
    slug?:string;
}
