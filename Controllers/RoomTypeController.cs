using Microsoft.AspNetCore.Mvc;
using HotelManagement.Dtos;
using HotelManagement.Models;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/room-type")]
    public class RoomTypeController : Controller
    {
        private readonly IRoomTypeService _roomtypeService;

        public RoomTypeController(IRoomTypeService roomtypeService)
        {
            _roomtypeService = roomtypeService;
        }

        [HttpPost]
        public IActionResult CreateRoomtype(CreateRoomTypeRequest request)
        {
            var roomType = new RoomType
            {
                Name = request.Name,
                NumberOfRoom = request.NumberOfRoom,
                Image = request.Image,
                NumberOfPeople = request.NumberOfPeople,
                Description = request.Description,
                Capacity = request.Capacity,
                HotelId = request.HotelId
            };

            var createdRoomType = _roomtypeService.CreateRoomType(roomType); 

            return Ok(createdRoomType);
        }
        [HttpGet]
        public IActionResult GetRoomTypes()
        {
            var roomTypes = _roomtypeService.GetRoomTypes();
            return roomTypes;
        }
    }
}
