using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set;}

        [Column(TypeName = "varchar(4)")]
        public required string Name { get; set; }

        [ForeignKey("Roomtype")]
        public int RoomTypeId { get; set;}

        public RoomType? RoomType {get; set;}
    }
}