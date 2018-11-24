using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class SubSpeciesController : ApiController
    {
        KoContext KoData = new KoContext();

        #region GetSpecies
        [Route("subspecies/{speciesId}")]
        [HttpGet]
        public IHttpActionResult GetAllSpecies(string speciesId)
        {
            // Make a Species Id
            Guid SpeciesGuid = new Guid(speciesId);

            // Get the species from the database
            List<SubSpecy> AllSubSpecies = KoData.SubSpecies.Where(s => s.SpeciesId == SpeciesGuid).OrderBy(s => s.SubSpeciesName).ToList();

            // If we have a list, then return it
            if (AllSubSpecies.Count > 0 && AllSubSpecies != null) return Ok(AllSubSpecies); else return NotFound();
        }
        #endregion
    }
}
