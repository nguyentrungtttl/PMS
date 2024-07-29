using HotelManagement.Models;
namespace HotelManagement.Dtos
{
    public class RatePlanRes
    {
        public required List<RatePlanAdditionalRes> RatePlans { get; set; }
        public required string Message { get; set; }
    }
}