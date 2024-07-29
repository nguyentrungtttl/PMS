using HotelManagement.Database;
using HotelManagement.Models;
namespace HotelManagement.Repositories
{

    public interface IPaymentConstraintRepository
    {
        PaymentConstraint CreatePaymentConstraint(PaymentConstraint paymentConstraint);
    }
    public class PaymentConstraintRepository : IPaymentConstraintRepository
    {
         private readonly AppDbContext _context;

        public PaymentConstraintRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public PaymentConstraint CreatePaymentConstraint(PaymentConstraint paymentConstraint)
        {
            _context.PaymentConstraints.Add(paymentConstraint);
            _context.SaveChanges();
            return paymentConstraint;
        }

    }
}