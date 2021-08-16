import { Category } from './category';
import { User } from "./User";

export interface Community
{
    name:string;
    slug:string;
    by:User;
    status:number;
    isJoined:boolean;
    category:Category;
    members:User[];
    membersCount?:number;
}
