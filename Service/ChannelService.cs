using HotelManagement.Models;
using HotelManagement.Repositories;
using Microsoft.AspNetCore.Mvc;
namespace HotelManagement.Sevice
{
         public interface IChannelService
        {
            Channel CreateChannel(Channel channel);
            JsonResult GetChannels();
        }

        public class ChannelService : IChannelService
        {
            private readonly IChannelRepository _channelRepository;

            public ChannelService(IChannelRepository channelRepository)
            {
                _channelRepository = channelRepository;
            }

            public Channel CreateChannel(Channel channel)
            {
                return _channelRepository.CreateChannel(channel);
            }

            public JsonResult GetChannels()
            {
                return _channelRepository.GetChannels();
            }
    }
}