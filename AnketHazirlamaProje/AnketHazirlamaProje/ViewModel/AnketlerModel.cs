﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AnketHazirlamaProje.ViewModel
{
    public class AnketlerModel
    {
     
        internal int katAnketSayisi;

        public int AnkId { get; set; }
        public int AnkKatId { get; set; }
        public string AnkAdi { get; set; }
        public int AnkSoruSayisi { get; set; }

    }
}