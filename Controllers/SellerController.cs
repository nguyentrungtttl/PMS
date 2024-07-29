using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers{

[ApiController]
[Route("api/seller")]
public class SellerController : ControllerBase
{
    private readonly ISellerService _sellerService;

    public SellerController(ISellerService sellerService)
    {
        _sellerService = sellerService;
    }
    [HttpPost]
    public IActionResult CreateSeller(CreateSellerRequest request)
    {

        var seller = new Seller
        {
            Name = request.Name,
            Email = request.Email,
            Password = request.Password,
            Role = request.Role,
            Permission = request.Permission,
            HotelId = request.HotelId,
        };

        var createdseller = _sellerService.CreateSeller(seller);
         if (createdseller == null)
                return BadRequest("Name or Email already exists");

            return Ok(createdseller);
        }
    }
}