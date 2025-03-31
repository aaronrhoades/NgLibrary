import { IRentable } from "./rentable";

export class Book implements IRentable {
    id: string = '';
    description: string ='';
    coverImg: string = '';
    title: string = '';
    author: string = '';
    publisher: string = '';
    publishedDate: Date = new Date();
    category: string = '';
    isbn: string = '';
    pageCount: number = 0;
    available: number = 0;
    totalCount: number = 1;
}