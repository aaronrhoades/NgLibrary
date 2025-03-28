namespace NgLibrary.Models.Dto
{
    public class updateRentalDto
    {
        public string UserId { get; set; } = string.Empty;
        public string BookId { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public int Renewals { get; set; }
    }
}
