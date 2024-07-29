using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/layout")]
    public class LayoutController : Controller
    {
        [Route("/layout")]
        public IActionResult Layout()
        {
            return View();  
        }


    }
}
