using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class Hotel
    {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set;}

    [Column(TypeName = "varchar(20)")]
    public required string Name { get; set; }

    [Column(TypeName = "varchar(30)")]
    public required string Email { get; set; }

    [Column(TypeName = "varchar(12)")]
    public required string Hotline { get; set; }

    [Column(TypeName = "varchar(50)")]
    public required string Website { get; set; }

    [Column(TypeName = "varchar(50)")]
    public required string Address { get; set; }
    }
}