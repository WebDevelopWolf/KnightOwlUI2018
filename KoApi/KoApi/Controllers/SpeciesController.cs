using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class SpeciesController : ApiController
    {
        KoContext KoData = new KoContext();

        #region GetSpecies
        [Route("species")]
        [HttpGet]
        public IHttpActionResult GetAllSpecies()
        {
            // Get the species from the database
            List<Species> AllSpecies = KoData.Species.OrderBy(s => s.SpeciesName).ToList();

            // If we have a list, then return it
            if (AllSpecies.Count > 0 && AllSpecies != null) return Ok(AllSpecies); else return NotFound();
        }
        #endregion
    }
}
