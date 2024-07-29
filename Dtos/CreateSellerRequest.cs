using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Dtos
{
    public class CreateSellerRequest
    {
        [Required(ErrorMessage = "Name must be provided")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Email must be provided")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password must be provided")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Role must be provided")]
        public required string Role { get; set; }

        [Required(ErrorMessage = "Permission must be provided")]
        [Range(1, int.MaxValue, ErrorMessage = "Permission must be a positive integer")]
        public int Permission { get; set; }

        [Required(ErrorMessage = "Hotel ID must be provided")]
        [Range(1, int.MaxValue, ErrorMessage = "Hotel ID must be a positive integer")]
        public int HotelId { get; set; }
    }
}
