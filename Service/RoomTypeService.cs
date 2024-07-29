using HotelManagement.Models;
using HotelManagement.Repositories;
using Microsoft.AspNetCore.Mvc;
namespace HotelManagement.Sevice
{
         public interface IRoomTypeService
        {
            RoomType CreateRoomType(RoomType roomType);
            JsonResult GetRoomTypes();
        }

        public class RoomTypeService : IRoomTypeService
        {
            private readonly IRoomTypeRepository _roomtypeRepository;

            public RoomTypeService(IRoomTypeRepository roomtypeRepository)
            {
                _roomtypeRepository = roomtypeRepository;
            }

            public RoomType CreateRoomType(RoomType roomType)
            {
                return _roomtypeRepository.CreateRoomType(roomType);
            }

            public JsonResult GetRoomTypes()
            {
                return _roomtypeRepository.GetRoomTypes();
            }
    }
}