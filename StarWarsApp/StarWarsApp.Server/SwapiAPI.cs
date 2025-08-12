using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace StarWarsApp.Server
{
    public class SwapiAPI
    {
        private static readonly HttpClient client = new HttpClient();

        public static async Task<string> FetchStarShips()
        {
            try
            {
                return await client.GetStringAsync("https://swapi.info/api/starships");
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("Exception Caught!");
    
                Console.WriteLine("Message :{0} ", e.Message);
            }

            return string.Empty;
        }
    }

}
