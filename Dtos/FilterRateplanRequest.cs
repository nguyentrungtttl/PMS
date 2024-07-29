using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Dtos
{
    public class FilterRateplanRequest
    {
        public required string? ChannelName { get; set; }
        public required DateTime? Daystrat { get; set; }
        public required DateTime? DayEnd { get; set; }
        public required string? RoomTypeName { get; set; }
        public required bool? Status { get; set; }

    }
}
