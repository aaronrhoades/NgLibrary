using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NgLibrary.Models
{
    [Keyless]
    public class Rental
    {
        [ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;
        [ForeignKey("Book")]
        public string BookId { get; set; } = string.Empty;
        public virtual User User { get; set; } = new User();
        public virtual Book Book { get; set; } = new Book();
        public DateTime DueDate { get; set; }
        public int Renewals { get; set; }
    }
}
