using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NewSite.Web.Controllers
{
    [Route("api/User/")]
    public class ChatApiController : Controller
    {
        [HttpGet("Profile")]  
        public IActionResult Profile()
        {
            // ...
        }

        [HttpPost("Profile")]  
        public IActionResult Profile(Profile profile)
        {
            // ...
        }

        // [HttpPost("product/{id:int}")]
        // public IActionResult ShowProduct(int id)
        // {
        // // ...
        // }
    }

    public class Profile
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string PhotoUrl { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }

}
