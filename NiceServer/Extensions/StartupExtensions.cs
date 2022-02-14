using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NiceServer.Models;

namespace NiceServer.Extensions
{
    public static class StartupExtensions
    {
        public static string AbgiScheme = "Abgi";

        public static void ConfigureAuthentication(this IServiceCollection services,
            IConfiguration config)
        {
            // Identity 
            services.AddIdentityCore<AppUser>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
                options.SignIn.RequireConfirmedEmail = false;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddDefaultTokenProviders();

            // Identity server
            services.AddIdentityServer(options =>
            {
                options.UserInteraction.LoginUrl = "/login";
                options.UserInteraction.LogoutUrl = "/logout";
                options.UserInteraction.ErrorUrl = "/error";
                options.Authentication.CookieSameSiteMode = SameSiteMode.None;
            })
           .AddInMemoryIdentityResources(IdentityServerConfig.IdentityResources)
           .AddInMemoryApiScopes(IdentityServerConfig.ApiScopes)
           .AddInMemoryClients(IdentityServerConfig.Clients)
           .AddDeveloperSigningCredential();

            //services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            //.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
            //{
            //    options.Cookie.SameSite = SameSiteMode.None;
            //    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            //});

            // Authorization
            //services.AddAuthorization(options =>
            //{
            //    var policy = new AuthorizationPolicyBuilder(CookieAuthenticationDefaults.AuthenticationScheme)
            //        .RequireAuthenticatedUser()
            //        .Build();
            //    options.AddPolicy("RequireAuthenticatedUser", policy);
            //});

            services.AddAntiforgery(o => o.SuppressXFrameOptionsHeader = true);

            // see https://www.thinktecture.com/en/identity/samesite/prepare-your-identityserver/
            services.ConfigureNonBreakingSameSiteCookies();
        }
    }
}

