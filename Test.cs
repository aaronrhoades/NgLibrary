
using Bogus;
using NgLibrary.Data;
using NgLibrary.Models;
namespace NgLibrary
{
    public static class Test
    {
        public static void UseFaker(DataContext context) {
            //Set the randomizer seed if you wish to generate repeatable data sets.
            Randomizer.Seed = new Random(8675309);
            var ISBNGenerator = new Randomizer().Replace("###-#-###-#####-#");
            var random = new Randomizer();

            var categories = new[] { "Action", "Adventure", "Comedy", "Romance", "Fiction", "Non-Fiction" };

            var testBooks = new Faker<Book>()
                //Ensure all properties have rules. By default, StrictMode is false
                //Set a global policy by using Faker.DefaultStrictMode
                .StrictMode(true)
                .RuleFor(b => b.Id, f => Guid.NewGuid().ToString())
                //Author Name
                .RuleFor(b => b.Author, f => f.Name.FirstName() + ' ' + f.Name.LastName())
                //A few words for a title
                .RuleFor(b => b.Title, f => f.Lorem.Word() + ' ' + f.Hacker.Noun())
                // Total and available start as 1
                .RuleFor(b => b.TotalCount, f => 1)
                .RuleFor(b => b.Available, f => 1)
                // Published date from past
                .RuleFor(b => b.PublishedDate, f => f.Date.Past(400, DateTime.Today))
                // Cover image using Picsum
                .RuleFor(b => b.CoverImg, f => f.Image.PicsumUrl())
                .RuleFor(b => b.Description, f => f.Name.JobDescriptor())
                .RuleFor(b => b.Publisher, f => f.Company.CompanyName())
                .RuleFor(b => b.Category, f => categories[random.Number(0, categories.Length - 1)])
                .RuleFor(b => b.PageCount, f => f.Random.Number(1, 100000))
                .RuleFor(b => b.ISBN, f => ISBNGenerator);

            var booksToCreate = 100;
            var books = new List<Book>();

            for (var i = 0; i < booksToCreate; i++) {
                books.Add(testBooks.Generate());
            }
            context.Books.AddRange(books);
            context.SaveChanges();
        }
    }
}