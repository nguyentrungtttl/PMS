using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/specialCreate")]
    public class SpecialCreateController : Controller
    {
        [Route("/specialCreate")]
        public IActionResult SpecialCreate()
        {
            return View();  
        }

    }
}