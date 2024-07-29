using HotelManagement.Models;
using HotelManagement.Repositories;
namespace HotelManagement.Sevice
{
         public interface IHotelService
        {
            Hotel CreateHotel(Hotel hotel);
        }

        public class HotelService : IHotelService
        {
            private readonly IHotelRepository _hotelRepository;

            public HotelService(IHotelRepository hotelRepository)
            {
                _hotelRepository = hotelRepository;
            }

            public Hotel CreateHotel(Hotel hotel)
            {
                return _hotelRepository.CreateHotel(hotel);
            }
    }
}