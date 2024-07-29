using HotelManagement.Database;
using HotelManagement.Dtos;
using HotelManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace HotelManagement.Repositories
{
    public interface ISpecialRatePlanRepository
    {
        SpecialRatePlan CreateSpecialRatePlan(SpecialRatePlan specialRatePlan);
    }
    public class SpecialRatePlanRepository : ISpecialRatePlanRepository
    {
        private readonly AppDbContext _context;

        public SpecialRatePlanRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public SpecialRatePlan CreateSpecialRatePlan(SpecialRatePlan specialRatePlan)
        {
            _context.SpecialRatePlans.Add(specialRatePlan);
            _context.SaveChanges();
            return specialRatePlan;
        }

    }
}