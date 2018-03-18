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
    public class DashboardController : ApiController
    {
        KoContext KoData = new KoContext();

        // Get User Dashboards
        [Route("Dashboards/Get")]
        [HttpGet]
        public IHttpActionResult GetEnabledDashboards()
        {
            // Get Enabled Modules
            List<Dashboard> EnabledDashboards =
                KoData.Dashboards
                .Where(d => d.DashEnabled == true)
                .OrderBy(d => d.DashViewOrder)
                .ToList();

            // Check for a list of modules
            if (EnabledDashboards == null)
            {
                // Return 404 Error
                return NotFound();
            }

            // Return Modules
            return Ok(EnabledDashboards);
        }

        // Get Single User Dashboards
        [Route("Dashboards/Get/{id}")]
        [HttpGet]
        public IHttpActionResult GetCurrentDashboard(int id)
        {
            // Get Enabled Modules
            Dashboard CurrentDash = KoData.Dashboards.FirstOrDefault(d => d.DashViewOrder == id);

            // Check for a list of modules
            if (CurrentDash == null)
            {
                // Return 404 Error
                return NotFound();
            }

            // Return Modules
            return Ok(CurrentDash);
        }

        // Get Single User Dashboards
        [Route("Dashboards/EventCount")]
        [HttpGet]
        public IHttpActionResult GetEventsCount()
        {
            // Get Today's Total Events
            DateTime dt = DateTime.Now.Date;
            List<Event> TodaysEvents = KoData.Events.Where(e => DbFunctions.TruncateTime(e.EventDate).Value == dt).ToList();

            var EventCounts = TodaysEvents
                   .GroupBy(p => p.Category)
                   .Select(g => new { name = g.Key, count = g.Count() });

            // Check for a list of modules
            if (EventCounts == null)
            {
                // Return 404 Error
                return NotFound();
            }

            // Return Modules
            return Ok(EventCounts);
        }

        // Get Widgets
        [Route("Dashboards/Widgets")]
        [HttpGet]
        public IHttpActionResult GetWidgets()
        {
            // Get a list of widgets and their status
            List<Widget> Widgets = KoData.Widgets.ToList();

            // Check for a list of widgets
            if (Widgets == null)
            {
                // Return 404 Error
                return NotFound();
            }

            // Return a list of widgets
            return Ok(Widgets);
        }
    }
}
