using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class RoomSale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set;}

        [Column(TypeName = "INT")]
        public required int RoomAvailability { get; set; }  

        [Column(TypeName = "DATE")]
        public required DateTime Day { get; set; }  

        [ForeignKey("RatePlan")]
        public int RatePlanId {get; set;}

        public RatePlan? RatePlan {get; set;}
    }
}