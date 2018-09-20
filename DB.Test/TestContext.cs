using System.Data.Entity;
using DB.Test.Model;

namespace DB.Test
{
    public sealed class TestContext : DbContext
    {
        public TestContext() : base("name=SqlServerConnStr")
        {
            //this.Database.SetCommandTimeout(120);
        }
        //public DbSet<User> Users { get; set; }
        public DbSet<Bu_WOProdRecord> Bu_WOProdRecords { get; set; }
        public DbSet<Base_WcnStatus> Base_WcnStatuss { get; set; }
        public DbSet<MMOrd_New> MMOrd_News { get; set; }
        public DbSet<MDWcn_New> MDWcn_News { get; set; }
        public DbSet<Bu_WcnRunRecord> Bu_WcnRunRecords { get; set; }
    }
}
