using Microsoft.AspNetCore.Identity;

namespace NgLibrary.Models
{
  public class User : IdentityUser
  {
        public ICollection<Review> Reviews { get; set; } = null!;
        public Role? Role { get; set; }
    }

    public enum Role
    {
        Librarian,
        User
    }
}
