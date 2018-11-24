using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class AnimalController : ApiController
    {
        KoContext KoData = new KoContext();

        #region Classes
        public class SentAnimal
        {
            public string Name { get; set; }
            public string Class { get; set; }
            public string Species { get; set; }
            public string SubSpecies { get; set; }
            public Int32 Age { get; set; }
            public string Enclosure { get; set; }
            public string Temperament { get; set; }
            public string Id { get; set; }
        }
        #endregion

        #region GetAnimals
        [Route("animals/{classification}")]
        [HttpGet]
        public IHttpActionResult GetAnimalListByClassification(string classification)
        {
            // Check Classification
            if (classification is null || classification == "") return NotFound();

            // Make a list of animals from the database
            List<AnimalList> Animals = KoData.AnimalLists.Where(a => a.Classification == classification).OrderBy(a => a.Name).ToList();

            // Check we have a list and if so return
            if (Animals is null || Animals.Count == 0) return NotFound(); else return Ok(Animals);
        }

        [Route("Animal/{animalid}")]
        [HttpGet]
        public IHttpActionResult GetAnimalById(string animalid)
        {
            // Check we have an ID and make a guid
            if (animalid is null || animalid == "") return NotFound();
            Guid AnimalGuid = new Guid(animalid);

            // Get Animal from the Data
            AnimalList Resident = KoData.AnimalLists.Where(a => a.AnimalId == AnimalGuid).FirstOrDefault();

            // Check we have a resident and if so return
            if (Resident is null) return NotFound(); else return Ok(Resident);
        }

        [Route("Animal/KeeperLog/{animalid}")]
        [HttpGet]
        public IHttpActionResult GetKeeperLogForAnimal(string animalid)
        {
            // Check we have an ID and make a guid
            if (animalid is null || animalid == "") return NotFound();
            Guid AnimalGuid = new Guid(animalid);

            // Get Log from Data
            List<KeeperLogSingleAnimal> Log = KoData.KeeperLogSingleAnimals.Where(l => l.AnimalId == AnimalGuid).ToList();

            // Check we have logs and if so return
            if (Log is null || Log.Count == 0) return NotFound(); else return Ok(Log);
        }

        [Route("Animal/Vet/{animalid}")]
        [HttpGet]
        public IHttpActionResult GetVetLogForAnimal(string animalid)
        {
            // Check we have an ID and make a guid
            if (animalid is null || animalid == "") return NotFound();
            Guid AnimalGuid = new Guid(animalid);

            // Get Log from data 
            List<Vetenary> Log = KoData.Vetenaries.Where(l => l.AnimalId == AnimalGuid).ToList();

            // Check we have logs and if so return
            if (Log is null || Log.Count == 0) return NotFound(); else return Ok(Log);
        }

        [Route("Animal/Feed/{animalid}")]
        [HttpGet]
        public IHttpActionResult GetFeedLogForAnimal(string animalid)
        {
            // Check we have an ID and make a guid
            if (animalid is null || animalid == "") return NotFound();
            Guid AnimalGuid = new Guid(animalid);

            // Get Log from data 
            List<Feeding> Log = KoData.Feedings.Where(l => l.AnimalId == AnimalGuid).ToList();

            // Check we have logs and if so return
            if (Log is null || Log.Count == 0) return NotFound(); else return Ok(Log);
        }

        [Route("Animal/Knowledge/{animalid}")]
        [HttpGet]
        public IHttpActionResult GetKBByAnimal(string animalid)
        {
            // Check we have an ID and make a guid
            if (animalid is null || animalid == "") return NotFound();
            Guid AnimalGuid = new Guid(animalid);

            // Get KB Entry from DB
            KnowledgeBase KB = KoData.KnowledgeBases.Where(k => k.AnimalId == AnimalGuid).FirstOrDefault();

            // Check we have a resident and if so return
            if (KB is null) return NotFound(); else return Ok(KB);
        }

        [Route("Animal/Knowledge/DYK/{animalid}")]
        [HttpGet]
        public IHttpActionResult GetKBDykByAnimal(string animalid)
        {
            // Check we have an ID and make a guid
            if (animalid is null || animalid == "") return NotFound();
            Guid AnimalGuid = new Guid(animalid);

            // Get Log from data 
            List<KbDyk> Dyk = KoData.KbDyks.Where(l => l.AnimalId == AnimalGuid).ToList();

            // Check we have logs and if so return
            if (Dyk is null || Dyk.Count == 0) return NotFound(); else return Ok(Dyk);
        }
        #endregion

        #region PostAnimals
        // Post a new animal
        [Route("Animal/Add")]
        [HttpPost]
        public IHttpActionResult AddToConversation([FromBody] SentAnimal animal)
        {
            if (animal is null)
            {
                return NotFound();
            }

            // Generate New Animal
            var NewAnimal = new Animal();
            NewAnimal.Species = new Guid(animal.Species);
            NewAnimal.Enclosure = new Guid(animal.Enclosure);
            NewAnimal.Classification = animal.Class;
            NewAnimal.Name = animal.Name;
            NewAnimal.Nickname = "";
            NewAnimal.Temperament = animal.Temperament;
            NewAnimal.Age = animal.Age;
            NewAnimal.Welcomed = DateTime.Now.Day.ToString() + "." + DateTime.Now.Month.ToString() + "." + DateTime.Now.Year.ToString();
            NewAnimal.AnimalId = Guid.NewGuid();

            // Add to Database
            KoData.Animals.Add(NewAnimal);
            KoData.SaveChanges();

            return Ok("Animal Added");
        }
        #endregion
    }
}
