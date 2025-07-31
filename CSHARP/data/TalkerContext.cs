using CSHARP.models;
using Microsoft.EntityFrameworkCore;

namespace CSHARP.data
{
    public class TalkerContext : DbContext
    {
        public DbSet<Talker> Talkers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
            optionsBuilder.UseSqlite("Data Source=talker.sqlite");
      base.OnConfiguring(optionsBuilder);
    }
    }
}