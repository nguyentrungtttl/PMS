using System;
using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Dtos
{
    public class UpdateRatePlanRequest
    {
        [Required(ErrorMessage = "Id is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be a valid ID.")]
        public required int Id { get; set;}
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters.")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Price must be a non-negative value.")]
        public required int Price { get; set; }

        [Required(ErrorMessage = "DayStart is required.")]
        [DataType(DataType.Date)]
        public required DateTime DayStart { get; set; }

        [Required(ErrorMessage = "DayEnd is required.")]
        [DataType(DataType.Date)]
        [DateGreaterThan("DayStart", ErrorMessage = "DayEnd must be greater than DayStart.")]
        public required DateTime DayEnd { get; set; }

        [Required(ErrorMessage = "OccupancyLimit is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "OccupancyLimit must be at least 1.")]
        public required int OccupancyLimit { get; set; }

        [Required(ErrorMessage = "ChannelId is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "ChannelId must be a valid ID.")]
        public required int ChannelId { get; set; }

        [Required(ErrorMessage = "PaymentConstraintId is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "PaymentConstraintId must be a valid ID.")]
        public required int PaymentConstraintId { get; set; }

        [Required(ErrorMessage = "CancelPolicyId is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "CancelPolicyId must be a valid ID.")]
        public required int CancelPolicyId { get; set; }

        [Required(ErrorMessage = "RoomTypeId is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "RoomTypeId must be a valid ID.")]
        public required int RoomTypeId { get; set; }
        public int Status { get; set; }
        public required int[] AdditionalId{get; set;} 
    }
}
