using Microsoft.AspNetCore.Mvc;
using HotelManagement.Dtos;
using HotelManagement.Sevice;

namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/login")]
     public class LoginController : Controller
    {

        private readonly ISellerService _sellerService;

        public LoginController(ISellerService sellerService)
        {
            _sellerService = sellerService;
        }

        [Route("/login")]
        public IActionResult Login(){
            return View();
        }
        [HttpPost]
        public IActionResult Login(LoginRequest request)
        {
            var authenticatedUser =_sellerService.Authenticate(request.Email, request.Password);

            if (authenticatedUser == null)
                return Unauthorized("Username or password is incorrect");

            return Ok(authenticatedUser);
        }
    }
}