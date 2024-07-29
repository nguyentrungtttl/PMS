using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/calendar")]
    public class CalendarController : Controller
    {
        [Route("/calendar")]
        public IActionResult Calendar()
        {
            return View();  
        }

    }
}