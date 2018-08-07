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
    [Route("api/User/")]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // [HttpGet("GetAllUsers")]  
        // public JsonResult GetAll()
        // {
        //     // Obtener (cargar) mensajes.
        //     return Json(_context.Messages.ToList());
        // }

        [HttpGet("GetAllUsers", Name = "GetAllUsers")]  
        public IEnumerable<User> GetAll()
        {
            // Obtener (cargar) mensajes.
            return _context.Users.ToList();
        }

        // [HttpPost("Messages")]  
        // public IActionResult Save(Message message)
        // {
        //     // Enviar (guardar) mensajes.
        //     if (ModelState.IsValid)
        //     {
        //         context.Messages.Add(message);
        //         context.SaveChanges();
        //         return new CreatedAtRouteResult("GetAll", new { id = message.MessageId }, message);
        //     }

        //     return BadRequest(ModelState);
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
