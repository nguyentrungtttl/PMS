using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using HotelManagement.Database;
using HotelManagement.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using HotelManagement.Sevice;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<ISellerRepository, SellerRepository>();
builder.Services.AddScoped<ISellerService, SellerService>();

builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped<IHotelService, HotelService>();

builder.Services.AddScoped<IChannelRepository, ChannelRepository>();
builder.Services.AddScoped<IChannelService, ChannelService>();

builder.Services.AddScoped<IPaymentConstraintRepository, PaymentConstraintRepository>();
builder.Services.AddScoped<IPaymentConstraintService, PaymentConstraintService>();

builder.Services.AddScoped<ICancelPolicyRepository, CancelPolicyRepository>();
builder.Services.AddScoped<ICancelPolicyService, CancelPolicyService>();

builder.Services.AddScoped<IAdditionalRepository, AdditionalRepository>();
builder.Services.AddScoped<IAdditionalService, AdditionalService>();

builder.Services.AddScoped<IRoomTypeRepository, RoomTypeRepository>();
builder.Services.AddScoped<IRoomTypeService, RoomTypeService>();

builder.Services.AddScoped<IRatePlanRepository, RatePlanRepository>();
builder.Services.AddScoped<IRatePlanService, RatePlanService>();

builder.Services.AddScoped<ISpecialRatePlanRepository, SpecialRatePlanRepository>();
builder.Services.AddScoped<ISpecialRatePlanSevice, SpecialRatePlanService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();


app.Run();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "text/plain";

        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        if (exceptionHandlerPathFeature?.Error is Exception ex)
        {
            System.IO.File.WriteAllText("D://Log.txt", $"{DateTime.Now}: {ex.Message}\n{ex.StackTrace}");
            await context.Response.WriteAsync("An unexpected fault happened. Try again later.");
        }
    });
});

try
{
    app.Run();
}
catch (Exception ex)
{
    System.IO.File.WriteAllText("D://Log.txt", $"{DateTime.Now}: {ex.Message}\n{ex.StackTrace}");
    throw; 
}
