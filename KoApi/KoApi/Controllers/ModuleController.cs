using KoApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class ModuleController : ApiController
    {
        KoContext KoData = new KoContext();

        // Get User Enabled Modules
        [Route("Modules/Get")]
        [HttpGet]
        public IHttpActionResult GetEnabledModules()
        {
            // Get Enabled Modules
            List<Module> EnabledModules = 
                KoData.Modules
                .Where(m => m.Enabled == 1)
                .OrderBy(m => m.ViewOrder)
                .ToList();

            // Check for a list of modules
            if (EnabledModules == null)
            {
                // Return 404 Error
                return NotFound(); 
            }

            // Return Modules
            return Ok(EnabledModules);  
        }
    }
}
