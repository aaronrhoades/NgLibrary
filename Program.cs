using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NgLibrary.Data;
using NgLibrary.Extensions;
using NgLibrary.Models;

var builder = WebApplication.CreateBuilder(args);

//add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Development",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

//add auth and identity
builder.Services.AddAuthorization();
builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddIdentityCore<User>()
  .AddEntityFrameworkStores<DataContext>()
  .AddApiEndpoints();

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var context = builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));

// Add Controllers
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.ApplyMigrations();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.MapIdentityApi<User>();

app.Run();