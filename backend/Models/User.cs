namespace Sessi_Market.Models
{
        public class User
        {
            public int Id_User { get; set; }
            public string Username { get; set; } = string.Empty;
            public string Password_Hash { get; set; } = string.Empty;
            public string? Email { get; set; }
            public string Role { get; set; } = "Manager";
            public DateTime? Last_Login { get; set; }
            public bool Is_Active { get; set; } = true;
        }
    }
