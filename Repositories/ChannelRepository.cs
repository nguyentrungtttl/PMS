using HotelManagement.Database;
using HotelManagement.Models;
using Microsoft.AspNetCore.Mvc;
namespace HotelManagement.Repositories
{

    public interface IChannelRepository
    {
        Channel CreateChannel(Channel channel);
        JsonResult GetChannels();
    }
    public class ChannelRepository : IChannelRepository
    {
         private readonly AppDbContext _context;

        public ChannelRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public Channel CreateChannel(Channel channel)
        {
            _context.Channels.Add(channel);
            _context.SaveChanges();
            return channel;
        }

        public JsonResult GetChannels()
        {
            var channels = _context.Channels.ToList();
            return new JsonResult(channels){StatusCode=200};
        }

    }
}