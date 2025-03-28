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
    public class ReviewController : ControllerBase
    {
        private readonly DataContext _context;
        public ReviewController(DataContext context)
        {
            _context = context;
        }
        // GET: ReviewController
        [HttpGet]
        public async Task<ActionResult<List<Review>>> GetAllReviews()
        {
            var reviews = await _context.Reviews.ToListAsync();

            return Ok(reviews);
        }

        // GET: ReviewController/5/6
        [HttpGet("{bookId}/{userId}")]
        public async Task<ActionResult<Review>> GetReviewByIds(string bookId, string userId)
        {
            var review = await _context.Reviews.Where(r => r.BookId == bookId && (r.UserId == userId)).SingleOrDefaultAsync();
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        // POST: ReviewController
        [HttpPost]
        public async Task<ActionResult<Review>> CreateReview(addReviewDto addReviewDto) {
            var review = new Review();
            review.UserId = addReviewDto.UserId;
            review.BookId = addReviewDto.BookId;
            review.ReviewText = addReviewDto.ReviewText;
            review.Rating = addReviewDto.Rating;


            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateReview), new { userId = review.UserId, bookId = review.BookId }, review);
        }

        // PUT: ReviewController/5
        [HttpPut("{bookId}/{userId}")]
        public async Task<ActionResult<Review>> UpdateReview(string bookId, string userId, updateReviewDto updateReviewDto)
        {
            var review = await _context.Reviews.Where(r => (r.BookId == bookId && r.UserId == userId)).SingleOrDefaultAsync();
            if (review is null) { 
                return NotFound();
            }
            review.UserId = updateReviewDto.UserId;
            review.BookId = updateReviewDto.BookId;
            review.ReviewText = updateReviewDto.ReviewText;
            review.Rating = updateReviewDto.Rating;


            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{bookId}/{userId}")]
        public async Task<ActionResult<Review>> DeleteReview(string bookId, string userId)
        {
                var review = await _context.Reviews.Where(r => r.BookId == bookId && (r.UserId == userId)).SingleOrDefaultAsync();
            if (review is null)
            {
                return NotFound();
            }
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
