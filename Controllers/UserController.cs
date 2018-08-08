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
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        [HttpGet("GetUserByEmailAndPassword/{email}/{password}", Name = "GetUserByEmailAndPassword")]  
        public IActionResult GetUserByEmailAndPassword(string email, string password)
        {

            var user = _context.Users.FirstOrDefault(x => x.Email == email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
            // return _context.Users.ToList();
        }

        [HttpGet("GetUserByName/{name}", Name = "GetUserByName")]  
        public IActionResult GetUserByName(string name)
        {
            
            // var user = _context.Users.Where(x => x.Name == name).ToList();
            
            // var query = "SELECT * FROM Users WHERE Name LIKE %"+name+"%";
            // var query = "SELECT * FROM Users WHERE Name = "+name;
            // var user = _context.Users.FromSql(query).ToList();

            var user = _context.Users.Where(x => EF.Functions.Like(x.Name+" "+x.Lastname, "%"+name+"%")).ToList();

            // var user = _context.Users.Where(x => EF.Functions.Like(x.Name, "%"+name+"%")).ToList();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
            // return _context.Users.ToList();
        }

        [HttpPost("CreateNewUser", Name = "CreateNewUser")]  
        public IActionResult CreateNewUser([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return Ok();
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
