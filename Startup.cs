using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.Extensions.Options;
using NewSite.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace NewSite.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => 
            options.UseInMemoryDatabase("social-crush"));


            // services.AddDbContext<ApplicationDbContext>(options => 
            // options.UseSqlServer(Configuration.GetConnectionString("defaultConnection")));


            // services.AddIdentity<ApplicationUser, IdentityRole>()
            //     .AddEntityFrameworkStores<ApplicationDbContext>()
            //     .AddDefaultTokenProviders();

            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //     .AddJwtBearer(options =>
            //     options.TokenValidationParameters = new TokenValidationParameters
            //     {
            //         ValidateIssuer = true,
            //         ValidateAudience = true,
            //         ValidateLifetime = true,
            //         ValidateIssuerSigningKey = true,
            //         ValidIssuer = "yourdomain.com",
            //         ValidAudience = "yourdomain.com",
            //         IssuerSigningKey = new SymmetricSecurityKey(
            //         Encoding.UTF8.GetBytes(Configuration["Llave_super_secreta"])),
            //         ClockSkew = TimeSpan.Zero
            //     });


            services.AddMvc().AddJsonOptions(ConfigureJson);
        }

        private void ConfigureJson(MvcJsonOptions obj)
        {
            obj.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            if (!context.Messages.Any())
            {
                context.Messages.AddRange(new List<Message>()
                {
                    new Message(){Text = "Mensaje de prueba", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new Message(){Text = "Mensaje de prueba 2", Hour = 16, Minute = 44, Day = 8, Month = 7, Year = 2018 },
                    new Message(){Text = "Mensaje de prueba 3", Hour = 17, Minute = 45, Day = 9, Month = 8, Year = 2018 },
                    new Message(){Text = "Mensaje de prueba 4", Hour = 18, Minute = 46, Day = 10, Month = 9, Year = 2018 },
                    new Message(){Text = "Mensaje de prueba 5", Hour = 19, Minute = 47, Day = 11, Month = 10, Year = 2018 },
                    new Message(){Text = "Mensaje de prueba 6", Hour = 20, Minute = 48, Day = 12, Month = 11, Year = 2018 }                 
                });
                context.SaveChanges();
            }


            if (!context.NewsFeeds.Any())
            {
                context.NewsFeeds.AddRange(new List<NewsFeed>()
                {
                    new NewsFeed(){UserId = 6, Text = "Post de prueba", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 15, Minute = 43, Day = 7, Month = 5, Year = 2018 },
                    new NewsFeed(){UserId = 5, Text = "Post de prueba 2", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 16, Minute = 44, Day = 8, Month = 6, Year = 2018 },
                    new NewsFeed(){UserId = 4, Text = "Post de prueba 3", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 17, Minute = 45, Day = 9, Month = 7, Year = 2018 },

                    new NewsFeed(){UserId = 1, Text = "Post de prueba 4", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 15, Minute = 43, Day = 7, Month = 5, Year = 2018 },
                    new NewsFeed(){UserId = 2, Text = "Post de prueba 5", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 16, Minute = 44, Day = 8, Month = 6, Year = 2018 },
                    new NewsFeed(){UserId = 1, Text = "Post de prueba 6", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 17, Minute = 45, Day = 9, Month = 7, Year = 2018 },

                    new NewsFeed(){UserId = 5, Text = "Post de prueba 7", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 15, Minute = 43, Day = 7, Month = 5, Year = 2018 },
                    new NewsFeed(){UserId = 2, Text = "Post de prueba 8", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 16, Minute = 44, Day = 8, Month = 6, Year = 2018 },
                    new NewsFeed(){UserId = 1, Text = "Post de prueba 9", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 17, Minute = 45, Day = 9, Month = 7, Year = 2018 }
                });
                context.SaveChanges();
            }
            

            if (!context.Users.Any())
            {
                context.Users.AddRange(new List<User>()
                {
                    // new User(){UserId = 0, Name = "Nombre0", Lastname = "Apellido0", PhotoUrl = "https://image.flaticon.com/icons/png/512/206/206879.png", Email = "email0@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){Name = "Nombre1", Lastname = "Apellido1", PhotoUrl = "https://image.flaticon.com/icons/png/512/206/206879.png", Email = "email1@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){Name = "Nombre2", Lastname = "Apellido2", PhotoUrl = "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png", Email = "email2@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){Name = "Nombre3", Lastname = "Apellido3", PhotoUrl = "http://www.etnahitech.com/new/wp-content/uploads/2017/09/businessman-1.png", Email = "email3@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){Name = "Nombre4", Lastname = "Apellido4", PhotoUrl = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1", Email = "email4@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){Name = "Nombre5", Lastname = "Apellido5", PhotoUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png", Email = "email5@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){Name = "Nombre6", Lastname = "Apellido6", PhotoUrl = "https://apps.odoo.com/apps/icon_image?module_id=37439", Email = "email6@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 }
                });
                context.SaveChanges();
            }


        }
    }
}