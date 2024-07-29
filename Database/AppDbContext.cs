using HotelManagement.Models;
using Microsoft.EntityFrameworkCore;
namespace HotelManagement.Database
{
    public class AppDbContext : DbContext
    {
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomSale> RoomSales { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<PaymentConstraint> PaymentConstraints { get; set; }
        public DbSet<CancelPolicy> CancelPolicys { get; set; }
        public DbSet<Additional> Additionals { get; set; }
        public DbSet<RatePlan> RatePlans { get; set; }
        public DbSet<SpecialRatePlan> SpecialRatePlans { get; set; }
        public DbSet<RatePlanAdditional> RatePlanAdditionals { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Seller>()
                .HasOne(s => s.Hotel)
                .WithMany()
                .HasForeignKey(s => s.HotelId);

            modelBuilder.Entity<RoomType>()
                .HasOne(s => s.Hotel)
                .WithMany()
                .HasForeignKey(s => s.HotelId);

            modelBuilder.Entity<Room>()
                .HasOne(s => s.RoomType)
                .WithMany()
                .HasForeignKey(s => s.RoomTypeId);

            modelBuilder.Entity<RatePlan>()
                .HasOne(s => s.RoomType)
                .WithMany()
                .HasForeignKey(s => s.RoomTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RatePlan>()
                .HasOne(s => s.Channel)
                .WithMany()
                .HasForeignKey(s => s.ChannelId);
                
            modelBuilder.Entity<RatePlan>()
                .HasOne(s => s.PaymentConstraint)
                .WithMany()
                .HasForeignKey(s => s.PaymentConstraintId);
            

            modelBuilder.Entity<RatePlan>()
                .HasOne(s => s.CancelPolicy)
                .WithMany()
                .HasForeignKey(s => s.CancelPolicyId);
            

            modelBuilder.Entity<RatePlanAdditional>()
                .HasOne(s => s.Additional)
                .WithMany()
                .HasForeignKey(s => s.AdditionalId);
            
            modelBuilder.Entity<RatePlanAdditional>()
                .HasOne(s => s.RatePlan)
                .WithMany()
                .HasForeignKey(s => s.RatePlanId);
        }
    }
}