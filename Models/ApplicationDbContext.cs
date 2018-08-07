using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NewSite.Web.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {

        }
        
        public DbSet<Message> Messages { get; set; }
        
        public DbSet<User> Users { get; set; }
        public DbSet<NewsFeed> NewsFeeds { get; set; }
        public DbSet<Comment> Comments { get; set; }
        
    }
}
