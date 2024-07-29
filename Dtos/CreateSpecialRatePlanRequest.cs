using System.ComponentModel.DataAnnotations;
namespace HotelManagement.Dtos
{
    public class CreateSpecialRatePlanRequest
    {
        [Required(ErrorMessage = "RatePlanId ID must be provided")]
        [Range(1, int.MaxValue, ErrorMessage = "RatePlanId ID must be a positive integer")]
        public required int RatePlanId {get; set;}

        [Required(ErrorMessage = "DayStart is required.")]
        [DataType(DataType.Date)]
        public required DateTime DayStart {get; set;}

        [Required(ErrorMessage = "DayEnd is required.")]
        [DataType(DataType.Date)]
        [DateGreaterThan("DayStart", ErrorMessage = "DayEnd must be greater than DayStart.")]
        public required DateTime DayEnd {get; set;}

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Price must be a non-negative value.")]
        public required int Price {get; set;}
        public required DateTime[]? SpecialDay {get; set;}
    }   
}