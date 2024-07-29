using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class RatePlan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set;}

        [Column(TypeName = "varchar(20)")]
        public required string Name { get; set; }

        [Column(TypeName = "INT")]
        public required int Price { get; set; }

        [Column(TypeName = "DATE")]
        public required DateTime Daystart {get; set;}

        [Column(TypeName = "DATE")]
        public required DateTime DayEnd {get; set;}

        [Column(TypeName = "INT")]
        public required int OccupancyLimit {get; set;}
        
        [ForeignKey("Channel")]
        public int ChannelId { get; set;}

        [ForeignKey("PaymentConstraint")]
        public int PaymentConstraintId { get; set;}

        [ForeignKey("RoomType")]
        public int RoomTypeId { get; set;}

        [ForeignKey("CancelPolicy")]
        public int CancelPolicyId { get; set;}

        public Channel? Channel { get; set; }

        public PaymentConstraint? PaymentConstraint { get; set; }

        public RoomType? RoomType { get; set; }

        public CancelPolicy? CancelPolicy { get; set; }

        public required bool Status { get; set; }

        public static implicit operator List<object>(RatePlan v)
        {
            throw new NotImplementedException();
        }
    }

}