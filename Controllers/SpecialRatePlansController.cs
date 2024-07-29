using HotelManagement.Dtos;
using HotelManagement.Sevice;
using HotelManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/special/rate-plan")]
    public class SpecialRatePlansController : Controller
    {
        private readonly ISpecialRatePlanSevice _sprcialRateplanService;

        public SpecialRatePlansController(ISpecialRatePlanSevice specialRatePlanSevice)
        {
            _sprcialRateplanService = specialRatePlanSevice;
        }

        [HttpPost]
        public IActionResult CreateRatePlan(CreateSpecialRatePlanRequest request)
        {
            
            if(request.SpecialDay.Any())
            {
                 foreach (var specialDay in request.SpecialDay)
                {
                    var SpecialRatePlan = new SpecialRatePlan
                    {
                        RatePlanId = request.RatePlanId,
                        Daystart = specialDay,
                        DayEnd = specialDay,
                        SpecialPrice = request.Price
                    };
                    _sprcialRateplanService.CreateSpecialRatePlan(SpecialRatePlan);
                }
            }else
            {
                 var SpecialRatePlan = new SpecialRatePlan
                {
                    RatePlanId = request.RatePlanId,
                    Daystart = request.DayStart,
                    DayEnd = request.DayEnd,
                    SpecialPrice = request.Price
                };
                    _sprcialRateplanService.CreateSpecialRatePlan(SpecialRatePlan);

            }
            return new JsonResult(new MessageRes { Message = "You have successfully created SpecialratePlan" });
        }
    }
}