using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NiceServer.Models;
using NiceServer.Services;
using System;
using System.Text;

namespace NiceServer.Extensions
{
    public static class StartupExtensions
    {
        //public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration,
        //    IWebHostEnvironment currentEnvironment)
        //{
        //services.AddAuthentication(options =>
        //    {
        //        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //    })
        //    .AddJwtBearer(options =>
        //    {
        //        options.Authority = "http://localhost:5000/";
        //        options.RequireHttpsMetadata = false;
        //    });

        //}

        public static IServiceCollection ConfigureAuthentication(this IServiceCollection services,
            IConfiguration config)
        {
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
        }
    }
}
