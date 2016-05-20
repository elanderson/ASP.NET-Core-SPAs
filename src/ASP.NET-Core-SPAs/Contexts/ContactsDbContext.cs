using ASP.NET_Core_SPAs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ASP.NET_Core_SPAs.Contexts
{
    public sealed class ContactsDbContext : DbContext
    {
        private static bool _created;
        public DbSet<Contact> Contacts { get; set; }

        public ContactsDbContext(DbContextOptions<ContactsDbContext> options)
            : base(options)
        {
            if (_created) return;
            Database.Migrate();
            _created = true;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var entity in builder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.DisplayName();
            }

            builder.Entity<Contact>().HasKey(c => c.Id);
        }
    }
}
