using System.ComponentModel.DataAnnotations;
namespace HotelManagement.Dtos
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email must be provided")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password must be provided")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public required string Password { get; set; }
    }
}