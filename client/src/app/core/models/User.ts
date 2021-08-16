import { Campus, Degree } from "./campus";
import { Community } from "./community";

export interface User {
    _id?: String;
    token:string;
    firstName:string;
    lastName:string;
    image?: String;
    email:string;
    password:string;
    bio:string;
    degree:Degree;
    campus:Campus;
    phone:number;
    socialLinks:SocialLinks;
    status:number;
    communities: Community[];
    saved:string;
    role:number;
    strikes:number;
    verified:string;
}
export interface SocialLinks{
  instagram:string;
  twitter:string;
  facebook:string;
  tiktok:string;
  phone: string;
}
