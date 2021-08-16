import { User, Post } from 'src/app/core';
import { Community } from './community';

export interface Report
{
    slug:string;
    body:string;
    post:Post;
    user:User;
    by:User;
    community:Community;
    time:Date;
}
