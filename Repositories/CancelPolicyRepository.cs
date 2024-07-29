using HotelManagement.Database;
using HotelManagement.Models;
using Microsoft.AspNetCore.Mvc;
namespace HotelManagement.Repositories
{

    public interface ICancelPolicyRepository
    {
        CancelPolicy CreateCancelPolicy(CancelPolicy cancelPolicy);
        JsonResult GetCancelPolicys();
    }
    public class CancelPolicyRepository : ICancelPolicyRepository
    {
         private readonly AppDbContext _context;

        public CancelPolicyRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public CancelPolicy CreateCancelPolicy(CancelPolicy cancelPolicy)
        {
            _context.CancelPolicys.Add(cancelPolicy);
            _context.SaveChanges();
            return cancelPolicy;
        }

        public JsonResult GetCancelPolicys()
        {
            var cancelPolicys = _context.CancelPolicys.ToList();
            return new JsonResult(cancelPolicys){StatusCode = 200};
        }
    }
}