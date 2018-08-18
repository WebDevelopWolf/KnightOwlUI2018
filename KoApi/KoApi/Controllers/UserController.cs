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

        #region Utility
            // Get User by Username 
            public User GetUserByUsername(string username)
            {
                if (username is null || username == "")
                {
                    return null;
                }

                var UserProfile = new User();
                UserProfile = KoData.Users.Where(u => u.Username == username).FirstOrDefault();

                if (UserProfile is null)
                {
                    return null;
                }
                else
                {
                    return UserProfile;
                }

            }
        #endregion

        #region GetUsers
        [Route("users")]
        [HttpGet]
        public IHttpActionResult GetAllUsers()
        {
            List<User> SystemUsers = new List<User>();
            SystemUsers = KoData.Users.ToList();

            if (SystemUsers is null)
            {
                return NotFound();
            }

            return Ok(SystemUsers);
        }
        #endregion



    }
}
