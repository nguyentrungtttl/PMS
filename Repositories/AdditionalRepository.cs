using HotelManagement.Database;
using HotelManagement.Models;
using Microsoft.AspNetCore.Mvc;
namespace HotelManagement.Repositories
{

    public interface IAdditionalRepository
    {
        Additional CreateAdditional(Additional additional);
        JsonResult GetAdditionals();
    }
    public class AdditionalRepository : IAdditionalRepository
    {
         private readonly AppDbContext _context;

        public AdditionalRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public Additional CreateAdditional(Additional additional)
        {
            _context.Additionals.Add(additional);
            _context.SaveChanges();
            return additional;
        }

        [HttpGet]
        public JsonResult GetAdditionals()
        {
            var additionals = _context.Additionals.ToList();
            return new JsonResult(additionals){ StatusCode = 200 };
        }


    }
}