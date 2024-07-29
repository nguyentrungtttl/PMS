using HotelManagement.Database;
using HotelManagement.Models;
namespace HotelManagement.Repositories
{

    public interface IHotelRepository
    {
        Hotel CreateHotel(Hotel hotel);
    }
    public class HotelRepository : IHotelRepository
    {
         private readonly AppDbContext _context;

        public HotelRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public Hotel CreateHotel(Hotel hotel)
        {
            _context.Hotels.Add(hotel);
            _context.SaveChanges();
            return hotel;
        }

    }
}