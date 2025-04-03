import { Book } from "./book";

export class RentalBook extends Book {
    userId: string = '';
    bookId: string = '';
    dueDate?: Date = new Date();
    renewals?: number = 0;
}