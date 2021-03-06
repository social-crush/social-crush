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
    [Route("api/NewsFeed/")]
    public class NewsFeedController : Controller
    {
        private readonly ApplicationDbContext _context;

        public NewsFeedController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllNewsFeeds", Name = "GetAllNewsFeeds")]  
        public IEnumerable<NewsFeed> GetAllNewsFeeds()
        {
            return _context.NewsFeeds.ToList();
        }

        [HttpGet("GetNewsFeedsByUserId/{id}", Name = "GetNewsFeedsByUserId")]  
        public IActionResult GetNewsFeedsByUserId(int id)
        {
            var newsFeeds = _context.NewsFeeds.Where(x => x.UserId == id).ToList();

            if (newsFeeds == null)
            {
                return NotFound();
            }

            return Ok(newsFeeds);
        }

        [HttpPost("CreateNewsFeed", Name = "CreateNewsFeed")]  
        public IActionResult CreateNewsFeed([FromBody] NewsFeed newsFeed)
        {
            if (ModelState.IsValid)
            {
                _context.NewsFeeds.Add(newsFeed);
                _context.SaveChanges();
                return Ok();
                // return new CreatedAtRouteResult("GetAllNewsFeeds", new { }, newsFeed);
            }

            return BadRequest(ModelState);
        }

    }

}
