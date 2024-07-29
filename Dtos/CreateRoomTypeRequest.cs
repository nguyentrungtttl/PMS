using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Dtos
{
    public class CreateRoomTypeRequest: IValidatableObject
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(30, ErrorMessage = "Name must be at most 30 characters")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Number of rooms is required")]
        public required int NumberOfRoom { get; set; }

        [Required(ErrorMessage = "Image URL is required")]
        [StringLength(200, ErrorMessage = "Image URL must be at most 200 characters")]
        public required string Image { get; set; }

        [Required(ErrorMessage = "Number of people is required")]
        public int NumberOfPeople { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 200 characters")]
        public required string Description { get; set; }

        [Required(ErrorMessage = "Capacity is required")]
        public int Capacity { get; set; }

        [Required(ErrorMessage = "Hotel ID must be provided")]
        [Range(1, int.MaxValue, ErrorMessage = "Hotel ID must be a positive integer")]
        public int HotelId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (NumberOfPeople > Capacity)
            {
                yield return new ValidationResult("Number of people must be less than capacity", new[] { nameof(NumberOfPeople) });
            }
        }
    }
}
