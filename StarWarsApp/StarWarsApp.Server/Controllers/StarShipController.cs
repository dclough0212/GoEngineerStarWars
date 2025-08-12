using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StarWarsData;
using StarWarsData.Model;

namespace StarWarsApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StarShipController : ControllerBase
    {
        private readonly ILogger<StarShipController> _logger;
        private readonly AppDbContext _dbcontext;

        public StarShipController(ILogger<StarShipController> logger, AppDbContext dbcontext)
        {
            _logger = logger;
            _dbcontext = dbcontext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var starships = _dbcontext.Starships.ToList();
            return new JsonResult(starships);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var starships = _dbcontext.Starships.Where(m => m.Id == id).ToList();
            if (starships == null || !starships.Any())
            {
                return NotFound("No starships found to delete.");
            }
            else
            {
                _dbcontext.Starships.RemoveRange(starships);
                await _dbcontext.SaveChangesAsync();
            }
            return new JsonResult(starships);
        }

        [HttpPost("AddStarship")]
        public async Task<IActionResult> Post([FromBody] object test)
        {
            Starship starship = JsonConvert.DeserializeObject<Starship>(test.ToString());
            if (starship == null)
            {
                return BadRequest("Starship data is null.");
            }
            try
            {
                starship.Created = DateTime.Now.ToLongDateString();
                _dbcontext.Starships.Add(starship);
                await _dbcontext.SaveChangesAsync();
            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);
                return BadRequest("Error saving starship: " + e.Message);
            }

            return CreatedAtAction(nameof(Get), new { id = starship.Id }, starship);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Starship starship)
        {
            var existingStarship = _dbcontext.Starships.FirstOrDefault(m => m.Id == starship.Id);
            if (existingStarship == null)
            {
                return NotFound("Starship not found.");
            }
            // Update properties
            existingStarship.Name = starship.Name;
            existingStarship.Model = starship.Model;
            existingStarship.Manufacturer = starship.Manufacturer;
            existingStarship.Length = starship.Length;
            existingStarship.Cost_In_Credits = starship.Cost_In_Credits;
            existingStarship.Cargo_Capacity = starship.Cargo_Capacity;
            existingStarship.Consumables = starship.Consumables;
            existingStarship.Hyperdrive_Rating = starship.Hyperdrive_Rating;
            existingStarship.Max_Atmosphering_Speed = starship.Max_Atmosphering_Speed;
            existingStarship.MGLT = starship.MGLT;
            existingStarship.Crew = starship.Crew;
            existingStarship.Passengers = starship.Passengers;
            existingStarship.Starship_Class = starship.Starship_Class;
            existingStarship.Pilots = starship.Pilots;
            existingStarship.Films = starship.Films;
            existingStarship.Edited = DateTime.Now.ToLongDateString();

            await _dbcontext.SaveChangesAsync();

            return Ok("Starship updated successfully.");
        }



        [HttpGet("APIUpdate")]
        public async Task<IActionResult> APIUpdate()
        {
            string jsonstr = await SwapiAPI.FetchStarShips();

            List<Starship> starships = JsonConvert.DeserializeObject<List<Starship>>(jsonstr);

            if (starships == null || !starships.Any())
            {
                return NotFound("No starships found to update.");
            }
            else
            {
                _dbcontext.Starships.RemoveRange(_dbcontext.Starships);
                _dbcontext.Starships.AddRange(starships);
                await _dbcontext.SaveChangesAsync();
            }

            return new JsonResult(starships);

        }

    }
}
