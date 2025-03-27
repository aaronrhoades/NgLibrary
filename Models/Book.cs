﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NgLibrary.Models
{
    public class Book : IRentable
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key] public string Id { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string CoverImg { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public DateTime? PublishedDate { get; set; }
        public string Category { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public int PageCount { get; set; }
        public int Available { get; set; }
        public int TotalCount { get; set; } = 1;
    }
}
