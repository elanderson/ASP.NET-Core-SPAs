using ASP.NET_Core_SPAs.Models;
using Microsoft.Data.Entity;

namespace ASP.NET_Core_SPAs.Contexts
{
    public sealed class ContactsDbContext : DbContext
    {
        private static bool _created;
        public DbSet<Contact> Contacts { get; set; }

        public ContactsDbContext()
        {
            if (_created) return;
            Database.Migrate();
            _created = true;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Contact>().HasKey(c => c.Id);
        }
    }
}
