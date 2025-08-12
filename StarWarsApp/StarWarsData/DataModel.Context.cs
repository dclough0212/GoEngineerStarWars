using Microsoft.EntityFrameworkCore;
using StarWarsData.Model;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Starship> Starships { get; set; }
}
