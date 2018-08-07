using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NewSite.Web.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int UserId { get; set; }
        public int NewsFeedId { get; set; }
        public string Text { get; set; }
        public string ImageUrl { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        
    }
}