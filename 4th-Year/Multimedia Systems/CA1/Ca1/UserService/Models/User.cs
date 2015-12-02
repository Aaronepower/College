using System.ComponentModel.DataAnnotations;

namespace UserService.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Email { get; set; }
        // Foreign Key
        public int GroupId { get; set; }
        // Navigation property
        public Group Group { get; set; }
    }
}