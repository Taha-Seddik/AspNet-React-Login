using Microsoft.AspNetCore.Identity;

namespace NiceServer.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

    }
}
