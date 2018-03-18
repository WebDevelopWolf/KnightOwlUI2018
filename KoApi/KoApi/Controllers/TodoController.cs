using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class TodoController : ApiController
    {
        KoContext KoData = new KoContext();

        // Get To-dos 
        [Route("Todos/GetForUser/{user}")]
        [HttpGet]
        public IHttpActionResult GetTodosListForUser(string user)
        {
            // Get todays, uncomplete Todos by user id
            var UserId = new Guid(user);
            List<ToDo> Todos = KoData.ToDoes.Where(t => t.UserId == UserId && t.Complete == false).ToList();

            // If none found return a 404 error
            if (Todos == null)
            {
                return NotFound();
            }

            // Return a list of Todos
            return Ok(Todos);
        }
    }
}
