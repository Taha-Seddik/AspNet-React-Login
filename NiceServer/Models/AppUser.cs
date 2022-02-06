using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace NiceServer.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    }
}
