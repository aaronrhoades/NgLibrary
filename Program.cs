using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NgLibrary;
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
            policy.WithOrigins("http://localhost:63435")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

//add auth and identity
builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorization();
builder.Services.AddIdentityCore<User>()
  .AddRoles<IdentityRole>()
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

// start example endpoint that requires authorization
app.MapGet("createDB", async (ClaimsPrincipal claims, DataContext context) =>
{
    Test.UseFaker(context);
});

app.UseCors("Development");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<User>();

//Add roles to the database
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var roles = new[] { "Librarian", "Customer" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role)) {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

app.Run();