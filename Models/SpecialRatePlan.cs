using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class SpecialRatePlan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set;}

        [ForeignKey("RatePlan")]
        public int RatePlanId {get; set;}

        [Column(TypeName = "DATE")]
        public required DateTime Daystart {get; set;}

        [Column(TypeName = "DATE")]
        public required DateTime DayEnd {get; set;}

        [Column(TypeName = "INT")]
        public required int SpecialPrice {get; set;}
        public RatePlan? RatePlan {get; set;}
    }
}