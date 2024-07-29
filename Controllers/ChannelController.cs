using Microsoft.AspNetCore.Mvc;
using HotelManagement.Dtos;
using HotelManagement.Models;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/channel")]
    public class ChannelController : Controller
    {
        private readonly IChannelService _channelService;

        public ChannelController(IChannelService channelService)
        {
            _channelService = channelService;
        }

        [HttpPost]
        public IActionResult CreateChanel(CreateChannelRequest request)
        {
            var chanel = new Channel
            {
                ChannelCode = request.ChannelCode,
                Name = request.Name,
            };

            var createdChannel = _channelService.CreateChannel(chanel); 

            return Ok(createdChannel);
        }

        public IActionResult GetChannels()
        {
            var channels = _channelService.GetChannels();
            return Ok(channels);
        }
    }
}