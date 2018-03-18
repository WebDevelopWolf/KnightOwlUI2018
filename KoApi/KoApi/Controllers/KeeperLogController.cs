using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class KeeperLogController : ApiController
    {
        KoContext KoData = new KoContext();

        // Get To-dos 
        [Route("KeeperLog/Today")]
        [HttpGet]
        public IHttpActionResult GetKeeperLogForToday()
        {
            // Get todays Keeper Log
            List<TodaysKeeperLog> TodaysLog = KoData.TodaysKeeperLogs.ToList();

            // If none found return a 404 error
            if (TodaysLog == null)
            {
                return NotFound();
            }

            // Return a list of Todos
            return Ok(TodaysLog);
        }
    }
}
