using System.ComponentModel.DataAnnotations;

namespace NgLibrary.Models
{
    public interface IBaseEntity
    {
        [Key] public string Id { get; set; }
    }
}
