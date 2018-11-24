using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class EnclosureController : ApiController
    {
        KoContext KoData = new KoContext();

        #region GetEnclosures
        [Route("enclosures")]
        [HttpGet]
        public IHttpActionResult GetAllEnclosures()
        {
            // Get the species from the database
            List<Enclosure> AllEnclosures = KoData.Enclosures.OrderBy(e => e.EnclosureName).ToList();

            // If we have a list, then return it
            if (AllEnclosures.Count > 0 && AllEnclosures != null) return Ok(AllEnclosures); else return NotFound();
        }
        #endregion
    }
}
