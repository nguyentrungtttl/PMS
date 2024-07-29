using HotelManagement.Database;
using HotelManagement.Dtos;
using HotelManagement.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace HotelManagement.Repositories
{

    public interface IRatePlanRepository
    {
        RatePlan CreateRatePlan(RatePlan ratePlan);

        Task<RatePlanRes> GetRatePlansAsync(int? hotelId, string? channelName, DateTime? dayStart, DateTime? dayEnd, string? roomTypeName, bool? status);
        RatePlanRes GetRatePlan(int id);
        void CreateAddtionalOfRatePlan(RatePlanAdditional ratePlanAdditional);
        RatePlan UpdateRatePlan(RatePlan ratePlan);
        List<Additional> GetAdditonal(int ratePlanId);
        void DeleteAdditionalOfRatePlan(int ratePlanId, int additionalId);
        List<int> GetAdditionalIdsToRemoves(int[] AdditionalId, List<Additional> listAdditional);
    }
    public class RatePlanRepository : IRatePlanRepository
    {
         private readonly AppDbContext _context;

        public RatePlanRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public RatePlan CreateRatePlan(RatePlan ratePlan)
        {
            _context.RatePlans.Add(ratePlan);
            _context.SaveChanges();
            return ratePlan;
        }

        public void CreateAddtionalOfRatePlan(RatePlanAdditional ratePlanAdditional)
        {
            _context.RatePlanAdditionals.Add(ratePlanAdditional);
            _context.SaveChanges();
        }

        public async Task<RatePlanRes> GetRatePlansAsync(int? hotelId, string? channelName, DateTime? dayStart, DateTime? dayEnd, string? roomTypeName, bool? status)
        {
        var listRatePlan = await _context.RatePlans
            .Where(r => hotelId.HasValue && r.RoomType.HotelId == hotelId.Value)
            .Include(r => r.RoomType)
            .ThenInclude(rt => rt.Hotel)
            .ToListAsync();

        var roomTypeNameList = !string.IsNullOrEmpty(roomTypeName) ? roomTypeName.Split(',').Select(x => x.Trim()).ToList() : new List<string>();

        if (!string.IsNullOrEmpty(channelName))
        {
            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Name == channelName);
            if (channel != null)
            {
                listRatePlan = listRatePlan.Where(rp => rp.ChannelId == channel.Id).ToList();
            }
            else
            {
                return new RatePlanRes
                {
                    RatePlans = new List<RatePlanAdditionalRes>(),
                    Message = $"No channel found with name: {channelName}"
                };
            }
        }

        if (dayStart != null && dayEnd != null)
        {
            listRatePlan = listRatePlan.Where(b => b.Daystart >= dayStart && b.DayEnd <= dayEnd).ToList();
        }
        else if (dayStart != null)
        {
            listRatePlan = listRatePlan.Where(b => b.Daystart >= dayStart).ToList();
        }
        else if (dayEnd != null)
        {
            listRatePlan = listRatePlan.Where(b => b.DayEnd <= dayEnd).ToList();
        }

        if (roomTypeNameList.Any())
        {
            var roomTypes = await _context.RoomTypes.Where(rt => roomTypeNameList.Contains(rt.Name)).ToListAsync();
            if (roomTypes.Any())
            {
                var roomTypeIds = roomTypes.Select(rt => rt.Id).ToList();
                listRatePlan = listRatePlan.Where(rp => roomTypeIds.Contains(rp.RoomTypeId)).ToList();
            }
            else
            {
                return new RatePlanRes
                {
                    RatePlans = new List<RatePlanAdditionalRes>(),
                    Message = $"No room types found with the provided names: {roomTypeName}"
                };
            }
        }

        if (status.HasValue)
        {
            listRatePlan = listRatePlan.Where(b => b.Status == status.Value).ToList();
        }

        var ratePlans = listRatePlan.Select(b => new RatePlanAdditionalRes
        {
        RatePlan = new RatePlan{
            Id = b.Id,
            Name = b.Name,
            Price = b.Price,
            Daystart = b.Daystart,
            DayEnd = b.DayEnd,
            OccupancyLimit = b.OccupancyLimit,
            ChannelId = b.ChannelId,
            PaymentConstraintId = b.PaymentConstraintId,
            RoomTypeId = b.RoomTypeId,
            CancelPolicyId = b.CancelPolicyId,
            Channel = _context.Channels.FirstOrDefault(rp => rp.Id == b.ChannelId),
            PaymentConstraint = _context.PaymentConstraints.FirstOrDefault(rp => rp.Id == b.PaymentConstraintId),
            RoomType = _context.RoomTypes.FirstOrDefault(rp => rp.Id == b.RoomTypeId),
            CancelPolicy = _context.CancelPolicys.FirstOrDefault(rp => rp.Id == b.CancelPolicyId),
            Status = b.Status
        },
        Additional = _context.RatePlanAdditionals.Where(a => a.RatePlanId == b.Id)
                    .Select(a => _context.Additionals.FirstOrDefault(ad => ad.Id == a.AdditionalId))
                    .ToList()
        }).ToList();

        return new RatePlanRes
        {
            RatePlans = ratePlans,
            Message = "Data was retrieved successfully."
        };
    }
        public RatePlanRes GetRatePlan(int id)
        {
            var ratePlan = _context.RatePlans.Find(id);
            
            if (ratePlan == null)
            {
                return new RatePlanRes
                {
                    RatePlans = new List<RatePlanAdditionalRes>(),
                    Message = "RatePlan not found."
                };
            }

            var detailRatePlan = new RatePlanAdditionalRes
            {
                RatePlan = new RatePlan{
                Id = ratePlan.Id,
                Name = ratePlan.Name,
                Price = ratePlan.Price,
                Daystart = ratePlan.Daystart,
                DayEnd = ratePlan.DayEnd,
                OccupancyLimit = ratePlan.OccupancyLimit,
                ChannelId = ratePlan.ChannelId,
                PaymentConstraintId = ratePlan.PaymentConstraintId,
                RoomTypeId = ratePlan.RoomTypeId,
                CancelPolicyId = ratePlan.CancelPolicyId,
                Channel = _context.Channels.FirstOrDefault(rp => rp.Id == ratePlan.ChannelId),
                PaymentConstraint = _context.PaymentConstraints.FirstOrDefault(rp => rp.Id == ratePlan.PaymentConstraintId),
                RoomType = _context.RoomTypes.FirstOrDefault(rp => rp.Id == ratePlan.RoomTypeId),
                CancelPolicy = _context.CancelPolicys.FirstOrDefault(rp => rp.Id == ratePlan.CancelPolicyId),
                Status = ratePlan.Status
            },
            Additional = _context.RatePlanAdditionals.Where(a => a.RatePlanId == ratePlan.Id)
                        .Select(a => _context.Additionals.FirstOrDefault(ad => ad.Id == a.AdditionalId))
                        .ToList(),
            SpecialRatePlan =  _context.SpecialRatePlans.Where(a => a.RatePlanId == ratePlan.Id)
            .ToList()                
            };
            return new RatePlanRes
            {
                RatePlans = new List<RatePlanAdditionalRes> { detailRatePlan },
                Message = "Data retrieved successfully."
            };
        }

        public RatePlan UpdateRatePlan(RatePlan ratePlan){
            var existingRatePlan = _context.RatePlans.Find(ratePlan.Id);
            if (existingRatePlan != null)
            {
                _context.Entry(existingRatePlan).CurrentValues.SetValues(ratePlan);
                _context.SaveChanges();
                return existingRatePlan;
            }
            return ratePlan;
         }

         public List<Additional> GetAdditonal(int ratePlanId){
            var Additional = _context.RatePlanAdditionals.Where(a => a.RatePlanId == ratePlanId)
                        .Select(a => _context.Additionals.FirstOrDefault(ad => ad.Id == a.AdditionalId))
                        .ToList();
            return Additional;
         }
        
        public void DeleteAdditionalOfRatePlan(int ratePlanId, int additionalId){
            var ratePlanAdditional = _context.RatePlanAdditionals
                                            .FirstOrDefault(ra => ra.RatePlanId == ratePlanId && ra.AdditionalId == additionalId);

            if (ratePlanAdditional != null)
            {
                _context.RatePlanAdditionals.Remove(ratePlanAdditional);
                _context.SaveChanges();
            }
        }

        public List<int> GetAdditionalIdsToRemoves(int[] AdditionalId, List<Additional> listAdditional){
             var additionalIdsToRemoves = listAdditional
                    .Where(ai => !AdditionalId.Contains(ai.Id))
                    .Select(ai => ai.Id)
                    .ToList();
            return additionalIdsToRemoves;
        }
    }
}