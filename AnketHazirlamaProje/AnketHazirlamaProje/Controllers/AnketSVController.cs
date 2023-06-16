using AnketHazirlamaProje.Models;
using AnketHazirlamaProje.ViewModel;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AnketHazirlamaProje.Controllers
{
    public class AnketSVController : ApiController
    {
        AnketDBEntities db = new AnketDBEntities();
        SonucModel sonuc = new SonucModel();

        public int KatId { get; private set; }
        public int AnkId { get; private set; }
        public int SorId { get; private set; }

        #region Kategori


        [HttpGet]
        [Route("api/kategoriliste")]
        public List <KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                KatId = x.KatId,
                KatAdi=x.KatAdi,
                KatAnketSayisi=x.Anketler.Count()
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{KatId}")]
        public KategoriModel KategoriById(int KatId)
        {
            KategoriModel Kayit = db.Kategori.Where(s => s.KatId == KatId).Select(x=>new KategoriModel()
            {
                KatId = x.KatId,
                KatAdi = x.KatAdi,

            }).FirstOrDefault();

            return Kayit;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.KatId == model.KatId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Kayitlidir...";
                return sonuc;
            }
            Kategori yeni = new Kategori();
            yeni.KatId = model.KatId;
            yeni.KatAdi = model.KatAdi;

            db.Kategori.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.KatId == model.KatId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayit Bulunamadi...";
                return sonuc;
            }

            kayit.KatAdi = model.KatAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Duzenlendi...";
            return sonuc;
        }

        

        [HttpDelete]
        [Route("api/kategorisil/{KatId}")]
        public SonucModel KategoriSil(int KatId)
        {
            Kategori kayit = db.Kategori.Where(s => s.KatId == KatId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = " Bulunamadi...";
                return sonuc;
            }
            if (db.Anketler.Count(s => s.AnkKatId == KatId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Olan Kategori silinmez...";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi...";
            return sonuc;
        }

        #endregion

        #region Anketler


        [HttpGet]
        [Route("api/anketliste")]
        public List<AnketlerModel> AnketlerListe()
        {
            List<AnketlerModel> liste = db.Anketler.Select(x => new AnketlerModel()
            {
                AnkId = x.AnkId,
                AnkKatId = x.Kategori.KatId,
                AnkAdi = x.AnkAdi,
                AnkSoruSayisi=x.Sorular.Count()
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/anketbykatid/{KatId}")]
        public List<AnketlerModel> AnketListeById(int KatId)
        {
            List<AnketlerModel> liste = db.Anketler.Where(s => s.AnkKatId == KatId)
                .Select(x => new AnketlerModel()
                {
                    AnkId = x.AnkId,
                    AnkKatId = x.Kategori.KatId,
                    AnkAdi = x.AnkAdi
                }).ToList();
                
              return liste;
        }

        [HttpGet]
        [Route("api/anketbyid/{AnkId}")]
        public AnketlerModel AnketById(int AnkId)
        {
            AnketlerModel kayit = db.Anketler.Where(s => s.AnkId == AnkId)
                .Select(x => new AnketlerModel()
                {
                    AnkId = x.AnkId,
                    AnkKatId = x.Kategori.KatId,
                    AnkAdi = x.AnkAdi
                }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/anketekle")]
        public SonucModel AnketEkle (AnketlerModel model)
        {
            if (db.Anketler.Count(s => s.AnkAdi == model.AnkAdi && s.AnkKatId == model.AnkKatId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Anket Kategoride Kayitlidir...";
                return sonuc;
            }
            Anketler yeni = new Anketler();
            yeni.AnkId = model.AnkId;
            yeni.AnkKatId = model.AnkKatId;
            yeni.AnkAdi = model.AnkAdi;

            db.Anketler.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Anket Eklendi...";
            return sonuc;
        }

        [HttpPut]
        [Route("api/anketduzenle")]
        public SonucModel AnketDuzenle(AnketlerModel model)
        {
            Anketler kayit = db.Anketler.Where(s => s.AnkId == model.AnkId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayit Bulunamadi...";
                return sonuc;
            }
            kayit.AnkId = model.AnkId;
            kayit.AnkKatId = model.AnkKatId;
            kayit.AnkAdi = model.AnkAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Anket Duzenlendi...";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/anketsil/{AnkId}")]
        public SonucModel AnketSil(int AnkId)
        {
            Anketler kayit = db.Anketler.Where(s => s.AnkId == AnkId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadi...";
                return sonuc;
            }
            if (db.Anketler.Count(s => s.AnkKatId == AnkId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kateogrisi Olan Anket Silinemez..";
                return sonuc;
            }

            db.Anketler.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Anket Silindi...";
            return sonuc;
        }
        #endregion

        #region Sorular


        [HttpGet]
        [Route("api/soruliste")]
        public List<SorularModel> SoruListe()
        {
            List<SorularModel> liste = db.Sorular.Select(x => new SorularModel()
            {
                SorId = x.SorId,
                SorAnkId = x.Anketler.AnkId,
                C1_Soru = x.C1_Soru,
                C2_Soru = x.C2_Soru,
                C3_Soru = x.C3_Soru
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/Sorubyid/{SorId}")]
        public SorularModel SoruById(int SorId)
        {
            SorularModel kayit = db.Sorular.Where(s => s.SorId == SorId)
                .Select(x => new SorularModel()
                {
                    SorId = x.SorId,
                    SorAnkId = x.Anketler.AnkId,
                    C1_Soru = x.C1_Soru,
                    C2_Soru = x.C2_Soru,
                    C3_Soru = x.C3_Soru
                }).FirstOrDefault();
            return kayit;
        }



        [HttpGet]
        [Route("api/sorubyankid/{AnkId}")]
        public List<SorularModel> SoruListeByAnkId(int AnkId)
        {
            List<SorularModel> liste = db.Sorular.Where(s => s.SorAnkId == AnkId)
                .Select(x => new SorularModel()
                {
                    SorId = x.SorId,
                    SorAnkId = x.Anketler.AnkId,
                    C1_Soru = x.C1_Soru,
                    C2_Soru = x.C2_Soru,
                    C3_Soru = x.C3_Soru
                }).ToList();

            return liste;
        }


        [HttpPost]
        [Route("api/soruekle")]
        public SonucModel SoruEkle(SorularModel model)
        {
            if (db.Sorular.Count(s => s.SorId == model.SorId && s.SorAnkId == model.SorAnkId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadi...";
                return sonuc;
            }
            Sorular yeni = new Sorular();
            yeni.SorId = model.SorId;
            yeni.SorAnkId = model.SorAnkId;
            yeni.C1_Soru = model.C1_Soru;
            yeni.C2_Soru = model.C2_Soru;
            yeni.C3_Soru = model.C3_Soru;

            db.Sorular.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi...";
            return sonuc;
        }


        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SorularModel model)
        {
            Sorular kayit = db.Sorular.Where(s => s.SorId == model.SorId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayit Bulunamadi...";
                return sonuc;
            }
            kayit.SorId = model.SorId;
            kayit.SorAnkId = model.SorAnkId;
            kayit.C1_Soru = model.C1_Soru;
            kayit.C2_Soru = model.C2_Soru;
            kayit.C3_Soru = model.C3_Soru;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Duzenlendi...";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/sorusil/{SorId}")]
        public SonucModel SoruSil(int SorId)
        {
            Sorular kayit = db.Sorular.Where(s => s.SorId == SorId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadi...";
                return sonuc;
            }
          if(db.Sorular.Count(s=>s.SorAnkId==AnkId)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadi...";
                return sonuc;
            }
            
            db.Sorular.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Silindi...";
            return sonuc;
        }
        #endregion


    }
}
