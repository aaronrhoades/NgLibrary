export class Review {
    bookId: string = '';
    userId: string = '';
    reviewText: string = '';
    datePosted?: Date = new Date();
    lastUpdated?: Date = new Date();
    rating: number = 0;
}
