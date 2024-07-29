using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Models
{
    public class Seller
    {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set;}

     [Column(TypeName = "varchar(30)")]
    public required string Name { get; set; }

    [Column(TypeName = "varchar(20)")]
    public required string Email { get; set; }

    [Column(TypeName = "varchar(80)")]
    public required string Password { get; set; }

    [Column(TypeName = "varchar(6)")]
    public required string Role { get; set; }

    [Column(TypeName = "INT")]
    public required int Permission { get; set; }

    [ForeignKey("Hotel")]
    public int HotelId { get; set;}

    public Hotel? Hotel { get; set; }
    }
}