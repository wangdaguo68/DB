using DB.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace DB.Web
{
    public sealed class MyContext : DbContext
    {
        public MyContext()
        {
            //this.Database.SetCommandTimeout(120);
        }
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
            Database.SetCommandTimeout(120);
        }
        //public DbSet<User> Users { get; set; }
        public DbSet<Bu_WOProdRecord> Bu_WOProdRecords { get; set; }
        public DbSet<Base_WcnStatus> Base_WcnStatuss { get; set; }
        public DbSet<MMOrd_New> MMOrd_News { get; set; }
        public DbSet<MDWcn_New> MDWcn_News { get; set; }
        public DbSet<Bu_WcnRunRecord> Bu_WcnRunRecords { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //optionsBuilder.UseMySql("Server=120.26.222.134;port=3307;database=test;uid=sa;pwd=wjwx*2007;");//配置连接字符串

            optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=WSExcuteSys;User ID=sa;Password=king665206;");
        }
    }
}
