﻿using Microsoft.AspNetCore.Authorization;
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
    public class RentalController : ControllerBase
    {
        private readonly DataContext _context;
        public RentalController(DataContext context)
        {
            _context = context;
        }
        // GET: RentalController
        [HttpGet]
        public async Task<ActionResult<List<Rental>>> GetAllRentals()
        {
            var rentals = await _context.Rentals.ToListAsync();

            return Ok(rentals);
        }

        // GET: RentalController/5/5
        [HttpGet("{userId}/{bookId}")]
        public async Task<ActionResult<Rental>> GetRentalByIds(string userId, string bookId)
        {
            var rental = await _context.Rentals.Where(r => (r.UserId == userId && r.BookId == bookId)).SingleOrDefaultAsync();
            if (rental == null)
            {
                return NotFound();
            }
            return Ok(rental);
        }

        // GET: RentalController/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<Rental>> GetRentalsByUserId(string userId)
        {
            var rental = await _context.Rentals.Where(r => (r.UserId == userId)).ToListAsync();
            if (rental == null)
            {
                return NotFound();
            }
            return Ok(rental);
        }

        // POST: RentalController
        [HttpPost]
        public async Task<ActionResult<Rental>> CreateRentals(addRentalDto[] addRentalDtos) {
            List<Rental> rentals = [];
            foreach (var addRentalDto in addRentalDtos)
            {
                var rental = new Rental();
                rental.UserId = addRentalDto.UserId;
                rental.BookId = addRentalDto.BookId;
                rental.DueDate = DateTime.Now.AddDays(5);
                rental.Renewals = 3;

                rentals.Add(rental);

                var book = await _context.Books.SingleAsync<Book>(b => b.Id == addRentalDto.BookId);
                book.Available = book.Available - 1;

            }
            _context.Rentals.AddRange(rentals);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateRentals), rentals);
        }

        // PUT: RentalController/5
        [HttpPut("{userId}/{bookId}")]
        [Authorize(Roles = "Librarian")]
        public async Task<ActionResult<Rental>> UpdateRental(string userId, string bookId, updateRentalDto updateRentalDto)
        {
            var rental = await _context.Rentals.Where(r => (r.UserId == userId && r.BookId == bookId)).SingleOrDefaultAsync();
            if (rental is null) { 
                return NotFound();
            }
            rental.UserId = updateRentalDto.UserId;
            rental.BookId = updateRentalDto.BookId;
            rental.DueDate = updateRentalDto.DueDate;
            rental.Renewals = updateRentalDto.Renewals;

            _context.Rentals.Update(rental);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{userId}/{bookId}")]
        [Authorize (Roles="Librarian")]
        public async Task<ActionResult<Rental>> DeleteRental(string userId, string bookId)
        {
            
            var rental = await _context.Rentals.Where(r => (r.UserId == userId && r.BookId == bookId)).SingleOrDefaultAsync();
            if (rental is null)
            {
                return NotFound();
            }

            var book = await _context.Books.SingleAsync<Book>(b => b.Id == bookId);
            book.Available = book.Available + 1;

            _context.Rentals.Remove(rental);
            await _context.SaveChangesAsync();

            return Ok(rental);
        }

    }
}
