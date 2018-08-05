using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NewSite.Web.Controllers
{
    [Route("api/Chat/")]
    public class ChatApiController : Controller
    {
        [HttpGet("Messages")]  
        public IEnumerable<Message> Messages()
        {
            // ...
        }

        [HttpPost("Messages")]  
        public IEnumerable<Message> Messages(Message message)
        {
            // ...
        }

        // [HttpPost("product/{id:int}")]
        // public IActionResult ShowProduct(int id)
        // {
        // // ...
        // }
    }

    public class Message
    {
        public int MessageId { get; set; }
        public string Message { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        
    }

}
