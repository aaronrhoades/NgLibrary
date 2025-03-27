using System.ComponentModel.DataAnnotations.Schema;

namespace NgLibrary.Models
{
    public class Review : IBaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = string.Empty;
        [ForeignKey("Book")]
        public string BookId { get; set; } = string.Empty;
        [ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;
        public virtual Book Book { get; set; } = new Book();
        public virtual User User { get; set; } = new User();
        public string ReviewText { get; set; } = string.Empty;
        public int Rating { get; set; }
    }
}
