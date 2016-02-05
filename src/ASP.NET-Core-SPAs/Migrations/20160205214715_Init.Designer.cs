using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ASP.NET_Core_SPAs.Contexts;

namespace ASP.NETCoreSPAs.Migrations
{
    [DbContext(typeof(ContactsDbContext))]
    [Migration("20160205214715_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ASP.NET_Core_SPAs.Models.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EmailAddress")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("PhoneNumber");

                    b.Property<string>("UserId");

                    b.HasKey("Id");
                });
        }
    }
}
