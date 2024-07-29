using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class CancelPolicy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set;}

        [Column(TypeName = "varchar(50)")]
        public required string Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public required string Description { get; set; }
    }
}