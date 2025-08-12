using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace StarWarsData.Model
{
    public class Film
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public required string Title { get; set; }
        [MaxLength(50)]
        public required string Url { get; set; }
        public required int Episode_Id { get; set; }
        [MaxLength(50)]
        public required string Opening_Crawl { get; set; }
        [MaxLength(50)]
        public required string Director { get; set; }
        [MaxLength(50)]
        public required string Producer { get; set; }
        [MaxLength(50)]
        public required string Release_Date { get; set; }
        public virtual Starship[] Starships { get; set; } = [];
    }
}
