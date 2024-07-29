using System.ComponentModel.DataAnnotations;
namespace HotelManagement.Dtos
{
    public class CreateChannelRequest
    {
        [Required(ErrorMessage = "ChannelCode must be provided")]
        public required string ChannelCode { get; set; }

         [Required(ErrorMessage = "Name must be provided")]
        public required string Name { get; set; }
    }
}