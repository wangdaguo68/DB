using System.Data.Entity;

namespace DB.View
{
    public sealed class MyContext : DbContext
    {
        public MyContext() : base("name=SqlServerConnStr")
        {
            //this.Database.SetCommandTimeout(120);
        }
        //public DbSet<User> Users { get; set; }
    }
}
