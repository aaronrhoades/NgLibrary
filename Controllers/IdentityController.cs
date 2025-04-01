using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NgLibrary.Models;
using NgLibrary.Models.Dto;

namespace NgLibrary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("Development")]
    [Produces("application/json")]
    public class IdentityController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public IdentityController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet("get-current-user")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {

            var user = await _userManager.GetUserAsync(User);
            if (user is not null) {

                var currentUser = new getCurrentUserDto
                {
                    Id = user.Id,
                    UserName = (user.UserName is not null) ? user.UserName : "",
                    NormalizedUserName = (user.NormalizedUserName is not null) ? user.NormalizedUserName : "",
                    Email = (user.Email is not null) ? user.Email : "",
                    NormalizedEmail = (user.NormalizedEmail is not null) ? user.NormalizedEmail : "",
                    EmailConfirmed = user.EmailConfirmed
                };

                return Ok(currentUser);
            }

            return NotFound();
        }
    }
}
