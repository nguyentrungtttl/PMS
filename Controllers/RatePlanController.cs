using Microsoft.AspNetCore.Mvc;
using HotelManagement.Dtos;
using HotelManagement.Models;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/rate-plan")]
    public class RatePlanController : Controller
    {
        private readonly IRatePlanService _rateplanService;

        public RatePlanController(IRatePlanService rateplanService)
        {
            _rateplanService = rateplanService;
        }

        [HttpPost]
        public IActionResult CreateRatePlan(CreateRatePlanRequest request)
        {
            var ratePlan = new RatePlan
            {
                Name = request.Name,
                Price = request.Price,
                Daystart = request.DayStart,
                DayEnd = request.DayEnd,
                OccupancyLimit = request.OccupancyLimit,
                ChannelId = request.ChannelId,
                PaymentConstraintId = request.PaymentConstraintId,
                CancelPolicyId = request.CancelPolicyId,
                RoomTypeId = request.RoomTypeId,
                Status = Convert.ToBoolean(1)
            };

            var createdRatePlan = _rateplanService.CreateRatePlan(ratePlan);

            if (request.AdditionalId != null)
            {
                foreach (var additionalId in request.AdditionalId)
                {
                    var ratePlanAdditional = new RatePlanAdditional
                    {
                        RatePlanId = createdRatePlan.Id,
                        AdditionalId = additionalId
                    };
                    _rateplanService.CreateAddtionalOfRatePlan(ratePlanAdditional); 
                }
            }
            return Ok(createdRatePlan);
        }

        [HttpGet]
        public async Task<ActionResult<RatePlanRes>> GetRatePlans(int? hotelId,
            [FromQuery] string? channelName, [FromQuery] DateTime? dayStart, [FromQuery] DateTime? dayEnd, 
            [FromQuery(Name = "roomTypeNames")] string? roomTypeName, [FromQuery] bool? status)
        {
            var ratePlans = await _rateplanService.GetRatePlansAsync(hotelId, channelName, dayStart, dayEnd, roomTypeName, status);
            return ratePlans;
        }

        [HttpGet("{id}")]
        public RatePlanRes GetRatePlan(int id){
            var ratePlan = _rateplanService.GetRatePlan(id);
            return ratePlan;
        }

        [HttpPost("update")]
        public IActionResult UpdateRatePlan(UpdateRatePlanRequest request)
        {
            var ratePlan = _rateplanService.GetRatePlan(request.Id);
            if (ratePlan == null)
            {
                return NotFound(new { Message = "Rate plan not found" });
            }
            var ratePlanEntity = ratePlan.RatePlans[0].RatePlan;
            ratePlanEntity.Name = request.Name;
            ratePlanEntity.Price = request.Price;
            ratePlanEntity.Daystart = request.DayStart;
            ratePlanEntity.DayEnd = request.DayEnd;
            ratePlanEntity.OccupancyLimit = request.OccupancyLimit;
            ratePlanEntity.ChannelId = request.ChannelId;
            ratePlanEntity.PaymentConstraintId = request.PaymentConstraintId;
            ratePlanEntity.CancelPolicyId = request.CancelPolicyId;
            ratePlanEntity.RoomTypeId = request.RoomTypeId;
            ratePlanEntity.Status = Convert.ToBoolean(request.Status);

            try
            {
                var ratePlanUpdate = _rateplanService.UpdateRatePlan(ratePlanEntity);

                var listAdditional = _rateplanService.GetAdditonal(request.Id);
                if (request.AdditionalId != null)
                {
                    foreach (var additionalId in request.AdditionalId)
                    {
                        if (!listAdditional.Any(ai => ai.Id == additionalId))
                        {
                            var ratePlanAdditional = new RatePlanAdditional
                            {
                                RatePlanId = request.Id,
                                AdditionalId = additionalId
                            };
                            _rateplanService.CreateAddtionalOfRatePlan(ratePlanAdditional);
                        }
                    }
                }
                var additionalIdsToRemoves = _rateplanService.GetAdditionalIdsToRemoves(request.AdditionalId,listAdditional);

                foreach (var additionalIdToRemove in additionalIdsToRemoves)
                {
                    _rateplanService.DeleteAdditionalOfRatePlan(request.Id, additionalIdToRemove);
                }

                return Ok(new { Message = "Rate plan updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = $"Failed to update rate plan: {ex.Message}" });
            }
        }

        }
}
