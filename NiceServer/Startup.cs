using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NiceServer.Extensions;
using NiceServer.Services;

namespace NiceServer
{
    public class Startup
    {

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment CurrentEnvironment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NiceServer", Version = "v1" });
            });

            // setup auth
            services.ConfigureAuthentication(Configuration);

            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                        builder => builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .SetIsOriginAllowed(origin =>
                        {
                            if (string.IsNullOrWhiteSpace(origin)) return false;
                            // Only add this to allow testing with localhost, remove this line in production!
                            if (origin.ToLower().StartsWith("http://localhost")) return true;
                            // Insert your production domain here.
                            if (origin.ToLower().StartsWith("https://dev.mydomain.com")) return true;
                            return false;
                        })
                    );
            });

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                var connStr = Configuration.GetConnectionString("SQLDatabase");
                options.UseSqlServer(connStr);
            });

            services.AddScoped<IUserAccessor, UserAccessor>();

        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors("CorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "NiceServer v1");
                    c.RoutePrefix = "swagger";
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseIdentityServer();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


    }
}
