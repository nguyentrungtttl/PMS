using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class Channel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set;}

        [Column(TypeName = "varchar(10)")]
        public required string ChannelCode { get; set; }

        [Column(TypeName = "varchar(25)")]
        public required string Name { get; set; }
    }
}