import { User } from './User';
export interface Campus
{
    name:string;
    campus:string;
    degrees: Degree[]
    slug:string;
}
export interface Degree
{
    name:string;
    members:User[];
    slug:string;
}
