using HotelManagement.Database;
using HotelManagement.Models;
using Microsoft.AspNetCore.Mvc;
namespace HotelManagement.Repositories
{

    public interface IRoomTypeRepository
    {
        RoomType CreateRoomType(RoomType roomType);
        JsonResult GetRoomTypes();
    }
    public class RoomTypeRepository : IRoomTypeRepository
    {
         private readonly AppDbContext _context;

        public RoomTypeRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public RoomType CreateRoomType(RoomType roomtype)
        {
            _context.RoomTypes.Add(roomtype);
            _context.SaveChanges();
            return roomtype;
        }

        public JsonResult GetRoomTypes()
        {
            var roomTypes = _context.RoomTypes.ToList();
            return new JsonResult(roomTypes){StatusCode=200};
        }


    }
}