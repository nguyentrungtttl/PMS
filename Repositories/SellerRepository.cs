using HotelManagement.Database;
using HotelManagement.Models;
namespace HotelManagement.Repositories
{

    public interface ISellerRepository
    {
        Seller GetUserBySellername(string sellername);
        Seller GetUserBySelleremail(string sellername);
        Seller CreateSeller(Seller seller);
    }
    public class SellerRepository : ISellerRepository
    {
         private readonly AppDbContext _context;

        public SellerRepository(AppDbContext context)
        {
            _context = context;
        }

        public Seller GetUserBySellername(string sellername)
        {
             return _context.Sellers.FirstOrDefault(u => u.Name == sellername);
        }

        public Seller GetUserBySelleremail(string selleremail)
        {
             return _context.Sellers.FirstOrDefault(s => s.Email == selleremail);
        }

        public Seller CreateSeller(Seller seller)
        {
            _context.Sellers.Add(seller);
            _context.SaveChanges();
            return seller;
        }
    }
}