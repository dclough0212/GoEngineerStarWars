using Microsoft.EntityFrameworkCore;
using StarWarsData.Model;

namespace TestProject1
{
    [TestClass]
    public sealed class Test1
    {

        private AppDbContext GetSqlServerDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer("Server=localhost;Database=Starwars;User Id=dclough;Password=1monkey1!;;TrustServerCertificate=true")
                .Options;

            var context = new AppDbContext(options);
            //context.Database.EnsureDeleted();
            //context.Database.EnsureCreated(); // optional for clean tests
            return context;
        }

        Starship CreateTestStarship()
        {
            return new Starship
            {
                Name = "Test Starship",
                Model = "Test Model",
                Manufacturer = "Test Manufacturer",
                Cost_In_Credits = "1000000",
                Length = "50",
                Max_Atmosphering_Speed = "1000",
                Crew = "5",
                Passengers = "10",
                Cargo_Capacity = "20000",
                Consumables = "2 months",
                Hyperdrive_Rating = "1.0",
                MGLT = "70",
                Starship_Class = "Fighter",
                Created = DateTime.UtcNow.ToString("o"),
                Url = "http://example.com/starship/test-starship"
            };
        }

        [TestMethod]
        public void CreateStarShip()
        {
            using var context = GetSqlServerDbContext();


            var starship = CreateTestStarship();
            context.Starships.Add(starship);
            context.SaveChanges();
        }
        [TestMethod]
        public void ReadStarShip()
        {
            using var context = GetSqlServerDbContext();
            var starship = context.Starships.FirstOrDefault(s => s.Name == "Test Starship");
            Assert.IsNotNull(starship);
        }

        [TestMethod]
        public void UpdateStarShip()
        {
            using var context = GetSqlServerDbContext();
            var starship = context.Starships.FirstOrDefault(s => s.Name == "Test Starship");
            Assert.IsNotNull(starship);
            starship.Model = "Updated Model";
            context.SaveChanges();
            var updatedStarship = context.Starships.FirstOrDefault(s => s.Name == "Test Starship");
            Assert.AreEqual("Updated Model", updatedStarship.Model);
        }
    }
}
