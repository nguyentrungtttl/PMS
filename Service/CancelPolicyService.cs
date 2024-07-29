using HotelManagement.Models;
using HotelManagement.Repositories;
using Microsoft.AspNetCore.Mvc;
namespace HotelManagement.Sevice
{
         public interface ICancelPolicyService
        {
            CancelPolicy CreateCancelPolicy(CancelPolicy cancelPolicy);
            JsonResult GetCancalPolicys();
        }

        public class CancelPolicyService : ICancelPolicyService
        {
            private readonly ICancelPolicyRepository _cancelpolicyRepository;

            public CancelPolicyService(ICancelPolicyRepository cancelpolicyRepository)
            {
                _cancelpolicyRepository =  cancelpolicyRepository;
            }

            public CancelPolicy CreateCancelPolicy(CancelPolicy cancelPolicy)
            {
                return _cancelpolicyRepository.CreateCancelPolicy(cancelPolicy);
            }

            public JsonResult GetCancalPolicys()
            {
                return _cancelpolicyRepository.GetCancelPolicys();
            }
    }
}