using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/updateForm")]
    public class UpdateFormController : Controller
    {
        [Route("/updateForm")]
        public IActionResult updateForm()
        {
            return View();  
        }

    }
}