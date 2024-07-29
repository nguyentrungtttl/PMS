using System.ComponentModel.DataAnnotations;
using HotelManagement.Models;

namespace HotelManagement.Dtos
{
    public class RatePlanAdditionalRes
    {
        public RatePlan? RatePlan {get;set;}
        public List<Additional>? Additional {get;set;}
        public List<SpecialRatePlan>? SpecialRatePlan {get; set;}
    }
}
