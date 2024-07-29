using Microsoft.AspNetCore.Mvc;
using HotelManagement.Dtos;
using HotelManagement.Models;
using HotelManagement.Sevice;
namespace HotelManagement.Controllers
{
    [ApiController]
    [Route("api/payment-constraint")]
    public class PaymentConstraintController : Controller
    {
        private readonly IPaymentConstraintService _paymentconstraintService;

        public PaymentConstraintController(IPaymentConstraintService paymentconstraintService)
        {
            _paymentconstraintService = paymentconstraintService;
        }

        [HttpPost]
        public IActionResult CreatePaymentConstraint(CreatePaymentConstraintRequest request)
        {
            var paymentconstrain = new PaymentConstraint
            {
                Name = request.Name,
                Description = request.Description,
            };

            var createdPaymentConstraint = _paymentconstraintService.CreatePaymentConstraint(paymentconstrain); 

            return Ok(createdPaymentConstraint);
        }
    }
}