using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class UserController : ApiController
    {
        KoContext KoData = new KoContext();

        // Get User Profile
        [Route("User/{username}")]
        [HttpGet]
        public IHttpActionResult GetUsersConversations(string username)
        {
            // Protect against empty username
            if (username is null || username == "")
            {
                return NotFound();
            }

            // Get Full User Profile
            User Profile = KoData.Users.Where(u => u.Username == username).FirstOrDefault();

            // If we have conversations to return, then return them
            if (Profile is null)
            {
                return NotFound();
            }
            else
            {
                return Ok(Profile);
            }
        }
    }
}
