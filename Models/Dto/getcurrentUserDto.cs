namespace NgLibrary.Models.Dto
{
    public class getCurrentUserDto
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;

        public string NormalizedUserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string NormalizedEmail = string.Empty;

        public Boolean EmailConfirmed { get; set; } = false;

    }
}
