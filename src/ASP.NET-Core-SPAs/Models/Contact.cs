using System.ComponentModel.DataAnnotations;

namespace ASP.NET_Core_SPAs.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(200)]
        public string Name { get; set; }
        [EmailAddress]
        [MinLength(1)]
        [MaxLength(200)]
        [Display(Name="Email")]
        public string EmailAddress { get; set; }
        [Display(Name="Phone")]
        public string PhoneNumber { get; set; }
    }
}