using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NewSite.Web.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string PhotoUrl { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}