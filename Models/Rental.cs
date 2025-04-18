﻿using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NgLibrary.Models
{
    [PrimaryKey("UserId", "BookId")]
    public class Rental
    {
        [ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;
        [ForeignKey("Book")]
        public string BookId { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public int Renewals { get; set; }
    }
}
