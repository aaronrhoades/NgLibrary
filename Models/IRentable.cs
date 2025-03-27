namespace NgLibrary.Models
{
    public interface IRentable : IBaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string CoverImg { get; set; }
    }
}
