using HotelManagement.Models;
using HotelManagement.Repositories;
namespace HotelManagement.Sevice
{
         public interface IPaymentConstraintService
        {
            PaymentConstraint CreatePaymentConstraint(PaymentConstraint paymentConstraint);
        }

        public class PaymentConstraintService : IPaymentConstraintService
        {
            private readonly IPaymentConstraintRepository _paymentConstraintRepository;

            public PaymentConstraintService(IPaymentConstraintRepository paymentConstraintRepository)
            {
                _paymentConstraintRepository = paymentConstraintRepository;
            }

            public PaymentConstraint CreatePaymentConstraint(PaymentConstraint paymentConstraint)
            {
                return _paymentConstraintRepository.CreatePaymentConstraint(paymentConstraint);
            }
    }
}