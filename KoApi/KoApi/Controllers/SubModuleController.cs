using KoApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class SubModuleController : ApiController
    {
        KoContext KoData = new KoContext();
        KoContext KoDataSecondary = new KoContext();

        // Get Module Sub-Headings
        [Route("SubModules/Heading/{routerlink}")]
        [HttpGet]
        public IHttpActionResult GetSubModuleHeading(string routerlink)
        {
            // Get Enabled Modules
            SubModuleHeading currentHeading =
                KoData.SubModuleHeadings
                .FirstOrDefault(s => s.RouterLink == routerlink);

            // Check for a heading
            if (currentHeading == null)
            {
                // Return 404 Error
                return NotFound();
            }

            // Returned Heading
            return Ok(currentHeading);
        }

        // Get User Enabled Modules
        [Route("SubModules/Get/{routerlink}")]
        [HttpGet]
        public IHttpActionResult GetEnabledModules(string routerlink)
        {
            // Get Module Guid
            var Module = KoDataSecondary.Modules.FirstOrDefault(m => m.RouterLink == routerlink).ModuleId;
            // Get Enabled Modules
            List<SubModule> EnabledSubModules =
                KoData.SubModules
                .Where(s => s.Enabled == true && s.ModuleId == Module)
                .ToList();

            // Check for a list of modules
            if (EnabledSubModules == null)
            {
                // Return 404 Error
                return NotFound();
            }

            // Return Modules
            return Ok(EnabledSubModules);
        }
    }
}
