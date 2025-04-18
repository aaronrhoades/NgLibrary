﻿using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NgLibrary.Models
{
    [PrimaryKey("BookId","UserId")]
    public class Review
    {
        [ForeignKey("Book")]
        public string BookId { get; set; } = string.Empty;
        [ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;
        public string ReviewText { get; set; } = string.Empty;
        public DateTime DatePosted { get; set; }
        public DateTime LastUpdated { get; set; }
        public int Rating { get; set; }
    }
}
