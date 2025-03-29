import { IRentable } from "./rentable";

export class Book implements IRentable {
    Id: string = '';
    Description: string ='';
    CoverImg: string = '';
    Title: string = '';
    Author: string = '';
    Publisher: string = '';
    PublishedDate: Date = new Date();
    Category: string = '';
    ISBN: string = '';
    PageCount: number = 0;
    Available: number = 0;
    TotalCount: number = 1;
}