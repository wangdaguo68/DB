using DB.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace DB.Web
{
    public sealed class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
        //public DbSet<User> Users { get; set; }
        //public DbSet<Bu_WOProdRecord> Bu_WOProdRecords { get; set; }
        //public DbSet<Base_WcnStatus> Base_WcnStatuss { get; set; }
        //public DbSet<MMOrd_New> MMOrd_News { get; set; }
        //public DbSet<MDWcn_New> MDWcn_News { get; set; }
        //public DbSet<Bu_WcnRunRecord> Bu_WcnRunRecords { get; set; }
        public DbSet<Speed> Speeds { get; set; }
        //public DbSet<ZZ_Tmp_CEoEE> ZZ_Tmp_CEoEEs { get; set; }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    //var sqlConnection = Configuration.GetConnectionString("SqlServerConnection");
        //    base.OnConfiguring(optionsBuilder);
        //    //optionsBuilder.UseSqlServer(sqlConnection);
        //}
    }
}
