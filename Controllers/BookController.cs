using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NgLibrary.Data;
using NgLibrary.Models;

namespace NgLibrary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("Development")]
    [Produces("application/json")]
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
    }
}
