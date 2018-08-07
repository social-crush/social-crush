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
                    new Message(){MessageId = 1, Text = "Mensaje de prueba", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new Message(){MessageId = 2, Text = "Mensaje de prueba 2", Hour = 16, Minute = 44, Day = 8, Month = 7, Year = 2018 },
                    new Message(){MessageId = 3, Text = "Mensaje de prueba 3", Hour = 17, Minute = 45, Day = 9, Month = 8, Year = 2018 },
                    new Message(){MessageId = 4, Text = "Mensaje de prueba 4", Hour = 18, Minute = 46, Day = 10, Month = 9, Year = 2018 },
                    new Message(){MessageId = 5, Text = "Mensaje de prueba 5", Hour = 19, Minute = 47, Day = 11, Month = 10, Year = 2018 },
                    new Message(){MessageId = 6, Text = "Mensaje de prueba 6", Hour = 20, Minute = 48, Day = 12, Month = 11, Year = 2018 }                 
                });
                context.SaveChanges();
            }


            if (!context.NewsFeeds.Any())
            {
                context.NewsFeeds.AddRange(new List<NewsFeed>()
                {
                    new NewsFeed(){NewsFeedId = 1, UserId = 2, Text = "Post de prueba", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 15, Minute = 43, Day = 7, Month = 5, Year = 2018 },
                    new NewsFeed(){NewsFeedId = 2, UserId = 1, Text = "Post de prueba 2", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 16, Minute = 44, Day = 8, Month = 6, Year = 2018 },
                    new NewsFeed(){NewsFeedId = 3, UserId = 2, Text = "Post de prueba 3", ImageUrl = "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/02/06/Recortada/img_evelasco_20180206-095609_imagenes_lv_terceros_eso1805a-kqeD-U44582134082tRH-992x558@LaVanguardia-Web.jpg", Hour = 17, Minute = 45, Day = 9, Month = 7, Year = 2018 },
                });
                context.SaveChanges();
            }
            

            if (!context.Users.Any())
            {
                context.Users.AddRange(new List<User>()
                {
                    new User(){UserId = 1, Name = "Nombre", Lastname = "Apellido", PhotoUrl = "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0", Email = "email@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){UserId = 2, Name = "Nombre", Lastname = "Apellido", PhotoUrl = "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0", Email = "email@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){UserId = 3, Name = "Nombre", Lastname = "Apellido", PhotoUrl = "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0", Email = "email@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){UserId = 4, Name = "Nombre", Lastname = "Apellido", PhotoUrl = "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0", Email = "email@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){UserId = 5, Name = "Nombre", Lastname = "Apellido", PhotoUrl = "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0", Email = "email@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 },
                    new User(){UserId = 6, Name = "Nombre", Lastname = "Apellido", PhotoUrl = "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0", Email = "email@hotmail.com", Password = "password123", Gender = "Hombre", Hour = 15, Minute = 43, Day = 7, Month = 6, Year = 2018 }
                });
                context.SaveChanges();
            }


        }
    }
}