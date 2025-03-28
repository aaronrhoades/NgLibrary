using System.ComponentModel.DataAnnotations.Schema;

namespace NgLibrary.Models.Dto
{
    public class addReviewDto
    {
        public string BookId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string ReviewText { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime DatePosted { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
