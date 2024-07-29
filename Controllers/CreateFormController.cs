using Microsoft.AspNetCore.Mvc;
using HotelManagement.Models;
using HotelManagement.Dtos;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/createForm")]
    public class CreateFormController : Controller
    {
        [Route("/createForm")]
        public IActionResult CreateForm()
        {
            return View();  
        }

    }
}