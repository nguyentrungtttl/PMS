using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class RoomType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set;}

        [Column(TypeName = "varchar(30)")]
        public required string Name { get; set; }

        [Column(TypeName = "INT")]
        public required int NumberOfRoom {get; set;}

        [Column(TypeName = "varchar(30)")]
        public required string? Image {get; set;}

        [Column(TypeName = "INT")]
        public required int NumberOfPeople {get; set;}

        [Column(TypeName = "varchar(200)")]
        public required string Description {get; set;}

        [Column(TypeName = "INT")]
        public required int Capacity  {get; set;}

        [ForeignKey("Hotel")]
        public int HotelId { get; set;}

        public Hotel? Hotel { get; set; }

    }

}