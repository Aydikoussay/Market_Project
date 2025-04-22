using Microsoft.EntityFrameworkCore;
using Sessi_Market.Models;

namespace Sessi_Market.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id_User);
                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Password_Hash).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Role).IsRequired().HasMaxLength(20).HasDefaultValue("Manager");
                entity.Property(e => e.Last_Login);
                entity.Property(e => e.Is_Active).HasDefaultValue(true);
            });
        }
    }
}
