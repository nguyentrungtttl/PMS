using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Dtos
{
    public class CreateHotelRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Hotline is required")]
        public required string Hotline { get; set; }

        [Required(ErrorMessage = "Website is required")]
        [Url(ErrorMessage = "Invalid website URL")]
        public required string Website { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public required string Address { get; set; }
    }
}
