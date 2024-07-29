using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/detail")]
    public class DetailController : Controller
    {
        [Route("/detail")]
        public IActionResult Detail()
        {
            return View();  
        }


    }
}


