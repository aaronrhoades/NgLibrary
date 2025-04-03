using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NgLibrary.Data;
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
        private readonly DataContext _context;
        public IdentityController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, DataContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost("add-role-to-user")]
        [Authorize]
        public async Task<ActionResult> addRoleToUser(addIdentityRoleToUserDto userIdAndRoleName)
        {
            var userFromId = await _userManager.FindByIdAsync(userIdAndRoleName.UserId);
            var roleFromName = await _roleManager.FindByNameAsync(userIdAndRoleName.RoleName);
            if (userFromId is not null && roleFromName is not null)
            {
                await _userManager.AddToRoleAsync(userFromId, userIdAndRoleName.RoleName);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
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
        [HttpGet("get-current-user-roles")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUserRoles()
        {

            var user = await _userManager.GetUserAsync(User);
            if (user is not null)
            {
                var roles = await _userManager.GetRolesAsync(user);
                

                return Ok(roles);
            }

            return NotFound();
        }
    }
}
