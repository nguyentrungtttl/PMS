using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/home")]
    public class HomeController : Controller
    {
        [Route("/home")]
        public IActionResult Home()
        {
            return View();  
        }


    }
}
