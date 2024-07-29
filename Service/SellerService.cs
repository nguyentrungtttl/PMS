using HotelManagement.Models;
using HotelManagement.Repositories;
namespace HotelManagement.Sevice
{
         public interface ISellerService
        {
            Seller Authenticate(string email, string password);
            Seller CreateSeller(Seller seller);
        }

        public class SellerService : ISellerService
        {
            private readonly ISellerRepository _sellerRepository;

            public SellerService(ISellerRepository sellerRepository)
            {
                _sellerRepository = sellerRepository;
            }

            public Seller Authenticate(string email, string password)
            {
                var seller = _sellerRepository.GetUserBySelleremail(email);
                if (seller == null || !BCrypt.Net.BCrypt.Verify(password, seller.Password))
                    return null;
                return seller;
            }

            public Seller CreateSeller(Seller seller)
            {
                if (_sellerRepository.GetUserBySellername(seller.Name) != null || _sellerRepository.GetUserBySelleremail(seller.Email) != null)
                {
                    return null;
                }

                seller.Password = BCrypt.Net.BCrypt.HashPassword(seller.Password);

                return _sellerRepository.CreateSeller(seller);
            }
    }
}