using HotelManagement.Models;
using HotelManagement.Repositories;
namespace HotelManagement.Sevice
{
         public interface ISpecialRatePlanSevice
        {
        SpecialRatePlan CreateSpecialRatePlan(SpecialRatePlan specialRatePlan);
        }

        public class SpecialRatePlanService : ISpecialRatePlanSevice
        {
            private readonly ISpecialRatePlanRepository _specialRateplanRepository;

            public SpecialRatePlanService(ISpecialRatePlanRepository SpecialRateplanRepository)
            {
                _specialRateplanRepository = SpecialRateplanRepository;
            }

            public SpecialRatePlan CreateSpecialRatePlan(SpecialRatePlan specialRatePlan)
            {
                return _specialRateplanRepository.CreateSpecialRatePlan(specialRatePlan);
            }
        }
        
}