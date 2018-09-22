using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Web.Models
{
    [Table("Speed")]
    public class Speed
    {
        public int Id { get; set; }
        /// <summary>
        /// 数据刷新速度（单位/秒）
        /// </summary>
        public int DataRefreshSpeed { get; set; }
        /// <summary>
        /// 屏幕切换速度（单位/秒）
        /// </summary>
        public int ScreenSpeed { get; set; }
    }
}
