using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sessi_Market.Data;
using Sessi_Market.Models;

namespace Sessi_Market.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username && u.Password_Hash == request.Password);

            if (user == null)
                return Unauthorized("Nom d'utilisateur ou mot de passe incorrect");

            user.Last_Login = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Connexion réussie",
                Username = user.Username,
                Role = user.Role
            });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
