using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StarWarsData.Model
{

    public class Person
    {

        [MaxLength(50)]
        public required string Url { get; set; }
        public virtual Starship[] Starships { get; set; } = [];
    }

}
