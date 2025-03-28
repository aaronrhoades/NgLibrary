using Microsoft.AspNetCore.Identity;

namespace NgLibrary.Models
{
  public class User : IdentityUser
  {
        public Role? Role { get; set; }
    }

    public enum Role
    {
        Librarian,
        User
    }
}
