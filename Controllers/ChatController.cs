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

        [HttpGet("Messages")]  
        public JsonResult GetAll()
        {
            // Obtener (cargar) mensajes.
            return Json(_context.Messages.ToList());
        }

        // [HttpGet("Messages")]  
        // public IEnumerable<Message> GetAll()
        // {
        //     // Obtener (cargar) mensajes.
        //     return _context.Messages.ToList();
        // }

        // [HttpPost("Messages")]  
        // public void Save(Message message)
        // {
        //     // Enviar (guardar) mensajes.
        // }

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
