using Microsoft.EntityFrameworkCore;
using NgLibrary.Data;

namespace NgLibrary.Extensions
{
  public static class MigrationExtensions
  {
    public static void ApplyMigrations(this IApplicationBuilder app) {
      using IServiceScope scope = app.ApplicationServices.CreateScope();

      using DataContext context = scope.ServiceProvider.GetRequiredService<DataContext>();

      context.Database.EnsureCreated();
      context.Database.Migrate();
    }
  }
}
