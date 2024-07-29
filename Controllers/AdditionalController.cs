using Microsoft.AspNetCore.Mvc;
using HotelManagement.Dtos;
using HotelManagement.Models;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/additional")]
    public class AdditionalController : Controller
    {
        private readonly IAdditionalService _additionalService;

        public AdditionalController(IAdditionalService additionalService)
        {
            _additionalService = additionalService;
        }

        [HttpPost]
        public IActionResult CreateAddtional(CreateAdditionalRequest request)
        {
            var additional = new Additional
            {
                Name = request.Name,
                Description = request.Description,
            };

            var createdAdditional = _additionalService.CreateAdditional(additional); 

            return Ok(createdAdditional);
        }
        [HttpGet]
        public IActionResult GetAdditionals(){
            var additionals = _additionalService.GetAdditionals();
            return Ok(additionals);
        }
    }
}