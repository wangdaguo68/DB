﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Test.Model
{
    [Table("Base_WcnStatus")]
    public class Base_WcnStatus
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public bool? Enabled { get; set; }
    }
}
