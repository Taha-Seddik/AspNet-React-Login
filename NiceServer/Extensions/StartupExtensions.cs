using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
            .AddSignInManager<SignInManager<AppUser>>();

            // Identity server
            services.AddIdentityServer(options =>
            {
                options.UserInteraction.LoginUrl = "/login";
                options.UserInteraction.LogoutUrl = "/logout";
                options.UserInteraction.ErrorUrl = "/error";
            })
           .AddInMemoryIdentityResources(IdentityServerConfig.IdentityResources)
           .AddInMemoryApiScopes(IdentityServerConfig.ApiScopes)
           .AddInMemoryClients(IdentityServerConfig.Clients);

            // JWT AUTH
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                // base-address of your identityserver
                options.Authority = "https://localhost:5001/";
                options.RequireHttpsMetadata = false;
            });

            // Authorization
            services.AddAuthorization(options =>
            {
                var policy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .Build();
                options.AddPolicy("RequireAuthenticatedUser", policy);
            });

        }
    }
}

/*

//.AddOpenIdConnect("abgi-preprod", options =>
            //{
            //    var abgiSection = config.GetSection(AbgiScheme);
            //    options.Authority = "https://secure-auth.team.preprod.moovapps.com/abgi-preprod";
            //    options.ClientId = abgiSection["ClientId"];
            //    options.ClientSecret = abgiSection["ClientSecret"];
            //    options.ResponseType = OpenIdConnectResponseType.Code;
            //    options.ResponseMode = OpenIdConnectResponseMode.Query;
            //})
            //.AddOpenIdConnect("Google", options =>
            //{
            //    options.Authority = "https://accounts.google.com/";
            //    var googleAuthNSection = config.GetSection("Authentication:Google");
            //    options.ClientId = googleAuthNSection["ClientId"];
            //    options.ClientSecret = googleAuthNSection["ClientSecret"];
            //    options.CallbackPath = new PathString("/signin-oidc-google");
            //    options.ResponseType = OpenIdConnectResponseType.Code;
            //    // Add email scope
            //    options.Scope.Add("openid");
            //    options.Scope.Add("email");
            //});
 
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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
                //opt.Events = new JwtBearerEvents
                //{
                //    OnMessageReceived = context =>
                //    {
                //        var accessToken = context.Request.Query["access_token"];
                //        var path = context.HttpContext.Request.Path;
                //        if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                //        {
                //            context.Token = accessToken;
                //        }
                //        return Task.CompletedTask;
                //    }
                //};
            });

            services.AddAuthorization(options =>
            {
                var policy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .Build();
                options.AddPolicy("RequireAuthenticatedUser", policy);
            });

            services.AddScoped<TokenService>();

            return services;
 
 */