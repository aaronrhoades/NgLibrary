using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NgLibrary.Data;
using NgLibrary.Models;
using NgLibrary.Models.Dto;

namespace NgLibrary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("Development")]
    [Produces("application/json")]
    [Authorize]
    public class BookController : ControllerBase
    {
        private readonly DataContext _context;
        public BookController(DataContext context)
        {
            _context = context;
        }
        // GET: BookController
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetAllBooks()
        {
            var books = await _context.Books.ToListAsync();

            return Ok(books);
        }

        [HttpPost("by-ids")]
        public async Task<ActionResult<List<Book>>> GetBooksByIds(string[] ids)
        {
            var booksByIds = await _context.Books.Where(b => ids.Contains(b.Id)).ToListAsync();

            return Ok(booksByIds);
        }

        [HttpGet("featured")]
        public async Task<ActionResult<List<getFeaturedBookDto>>> GetFeaturedBooks() {
            var books = await _context.Books.ToListAsync();
            //TODO: real randomize
            var featuredBooks = books.OrderBy(b => b.ISBN).Take(3);
            List<getFeaturedBookDto> featuredBookDtos = new List<getFeaturedBookDto>();
            foreach (var featuredBook in featuredBooks)
            {
                getFeaturedBookDto featuredBookDto = new getFeaturedBookDto();
                featuredBookDto.Id = featuredBook.Id;
                featuredBookDto.Description = featuredBook.Description;
                featuredBookDto.CoverImg = featuredBook.CoverImg;
                featuredBookDto.Title = featuredBook.Title;
                featuredBookDto.Author = featuredBook.Author;
                featuredBookDto.Publisher = featuredBook.Publisher;
                featuredBookDto.PublishedDate = featuredBook.PublishedDate;
                featuredBookDto.Category = featuredBook.Category;
                featuredBookDto.ISBN = featuredBook.ISBN;
                featuredBookDto.PageCount = featuredBook.PageCount;
                featuredBookDto.Available = featuredBook.Available;
                featuredBookDto.TotalCount = featuredBook.TotalCount;
                
                var reviews = await _context.Reviews.Where(review => review.BookId == featuredBook.Id).ToListAsync();
                double totalReviews = 0;
                if (reviews.Count() > 0)
                {
                    foreach (var review in reviews)
                    {
                        totalReviews += review.Rating;
                    }
                    featuredBookDto.AverageRating = totalReviews / (double)reviews.Count();
                }
                else {
                    featuredBookDto.AverageRating = 0;
                }

                featuredBookDtos.Add(featuredBookDto);
            }
            return Ok(featuredBookDtos);
        }

        // GET: BookController/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookById(string id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        // POST: BookController
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(addBookDto addBookDto) {
            var book = new Book();
            book.Id = Guid.NewGuid().ToString();
            book.Title = addBookDto.Title;
            book.Description = addBookDto.Description;
            book.Category = addBookDto.Category;
            book.Author = addBookDto.Author;
            book.Publisher = addBookDto.Publisher;
            book.PublishedDate = addBookDto.PublishedDate;
            book.CoverImg = addBookDto.CoverImg;
            book.ISBN = addBookDto.ISBN;
            book.Available = addBookDto.Available;
            book.TotalCount = addBookDto.TotalCount;
            book.PageCount = addBookDto.PageCount;


            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateBook), new { id = book.Id }, book);
        }

        // PUT: BookController/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> UpdateBook(string id, updateBookDto updateBookDto)
        {
            var book = await _context.Books.FindAsync(id);
            if (book is null) { 
                return NotFound();
            }
            book.Title = updateBookDto.Title;
            book.Author = updateBookDto.Author;
            book.Publisher = updateBookDto.Publisher;
            book.PublishedDate = updateBookDto.PublishedDate;
            book.Category = updateBookDto.Category;
            book.ISBN = updateBookDto.ISBN;
            book.PageCount = updateBookDto.PageCount;
            book.Available = updateBookDto.Available;
            book.TotalCount = updateBookDto.TotalCount;
            book.CoverImg = updateBookDto.CoverImg;
            book.Description = updateBookDto.Description;

            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBook(string id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book is null)
            {
                return NotFound();
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
