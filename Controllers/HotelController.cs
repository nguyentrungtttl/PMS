using Microsoft.AspNetCore.Mvc;
using HotelManagement.Dtos;
using HotelManagement.Models;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/hotel")]
    public class HotelController : Controller
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        [HttpPost]
        public IActionResult CreateHotel(CreateHotelRequest request)
        {
            var hotel = new Hotel
            {
                Name = request.Name,
                Email = request.Email,
                Hotline = request.Hotline,
                Website = request.Website,
                Address = request.Address,
            };

            var createdHotel = _hotelService.CreateHotel(hotel); 

            return Ok(createdHotel);
        }
    }
}
