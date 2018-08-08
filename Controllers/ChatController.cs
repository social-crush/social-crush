using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Http;
using NewSite.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace NewSite.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Chat/")]
    public class ChatController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ChatController(ApplicationDbContext context)
        {
            _context = context;
        }

        // [HttpGet("GetAllMessages")]  
        // public JsonResult GetAll()
        // {
        //     // Obtener (cargar) mensajes.
        //     return Json(_context.Messages.ToList());
        // }

        [HttpGet("GetAllMessages", Name = "GetAllMessages")]  
        public IEnumerable<Message> GetAll()
        {
            return _context.Messages.ToList();
        }

        [HttpPost("SaveMessage", Name = "SaveMessage")]  
        public IActionResult SaveMessage([FromBody] Message message)
        {
            // [FromBody] Message message
            if (ModelState.IsValid)
            {
                
                _context.Messages.Add(message);
                _context.SaveChanges();
                return Ok();
                // return new CreatedAtRouteResult("GetAllMessages", new { }, message);
            }

            return BadRequest(ModelState);
        }

        // [HttpPut("Messages/{id}")]  
        // public void Update(int id, Message message)
        // {
        //     // Enviar (guardar) mensajes.
        // }

        // [HttpDelete("Messages/{id}")]  
        // public void Delete(int id)
        // {
        //     // Enviar (guardar) mensajes.
        // }

    }

}
