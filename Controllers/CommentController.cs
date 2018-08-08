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
    [Route("api/Comment/")]
    public class CommentConstroller : Controller
    {
        private readonly ApplicationDbContext _context;

        public CommentConstroller(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetCommentsByNewsFeedId/{id}", Name = "GetCommentsByNewsFeedId")]  
        public IActionResult GetCommentsByNewsFeedId(int id)
        {
            var comments = _context.Comments.Where(x => x.NewsFeedId == id).ToList();

            if (comments == null)
            {
                return NotFound();
            }

            return Ok(comments);
        }

        [HttpPost("CreateComment", Name = "CreateComment")]  
        public IActionResult CreateComment([FromBody] Comment comment)
        {
            if (ModelState.IsValid)
            {
                _context.Comments.Add(comment);
                _context.SaveChanges();
                return Ok();
            }

            return BadRequest(ModelState);
        }

    }

}
