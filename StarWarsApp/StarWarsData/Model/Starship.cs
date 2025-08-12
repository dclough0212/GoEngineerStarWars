using System.ComponentModel.DataAnnotations;

namespace StarWarsData.Model
{
    public class Starship
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }
        [MaxLength(50)]
        public string? Model { get; set; }
        [MaxLength(50)]
        public string? Manufacturer { get; set; }
        [MaxLength(50)]
        public string? Cost_In_Credits { get; set; }
        [MaxLength(50)]
        public string? Length { get; set; }
        [MaxLength(50)]
        public string? Max_Atmosphering_Speed { get; set; }
        [MaxLength(50)]
        public string? Crew { get; set; }
        [MaxLength(100)]
        public string? Passengers { get; set; }
        [MaxLength(50)]
        public string? Cargo_Capacity { get; set; }
        [MaxLength(50)]
        public string? Consumables { get; set; }
        [MaxLength(50)]
        public string? Hyperdrive_Rating { get; set; }
        [MaxLength(50)]
        public string? MGLT { get; set; }
        [MaxLength(50)]
        public string? Starship_Class { get; set; }
        public virtual Person[] Pilots { get; set; } = [];
        public virtual Film[] Films { get; set; } = [];
        [MaxLength(50)]
        public required string Created { get; set; }
        public string? Edited { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Url { get; set; }
    }
}
