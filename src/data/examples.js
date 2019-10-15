export default {
  "minute": [
    { example: "*", desc: "Setiap menit." },
    { example: "1,15,30", desc: "Menit 1, 15, dan 30." },
    { example: "1-10", desc: "Dari menit 1 sampai 10." },
    { example: "5/2", desc: "Kelipatan 2 antara menit 5 sampai 31." },
    { example: "5-10/2", desc: "Kelipatan 2 antara menit 5 sampai 10." },
  ],
  "hour": [
    { example: "*", desc: "Setiap jam." },
    { example: "1,15,20", desc: "Jam 1, 15, dan 20." },
    { example: "1-10", desc: "Dari jam 1 sampai 10." },
    { example: "5/2", desc: "Kelipatan 2 antara jam 5 sampai 23." },
    { example: "5-10/2", desc: "Kelipatan 2 antara jam 5 sampai 10." },
  ],
  "date": [
    { example: "*", desc: "Tanggal berapapun." },
    { example: "1,15,30", desc: "Tanggal 1, 15, dan 30." },
    { example: "1-10", desc: "Dari tanggal 1 sampai 10." },
    { example: "5/2", desc: "Kelipatan 2 antara tanggal 5 sampai 31." },
    { example: "5-10/2", desc: "Kelipatan 2 antara tanggal 5 sampai 10." },
  ],
  "month": [
    { example: "*", desc: "Setiap bulan." },
    { example: "1,6,9", desc: "Bulan Januari, Juni, dan September." },
    { example: "1-10", desc: "Dari bulan Januari sampai Oktober." },
    { example: "5/2", desc: "Kelipatan 2 antara bulan Mei sampai Desember." },
    { example: "5-10/2", desc: "Kelipatan 2 antara bulan Mei sampai Oktober." },
    { example: "JAN,AUG,DEC", desc: "Bulan Januari, Agustus, dan Desember." },
  ],
  "day": [
    { example: "*", desc: "Hari apapun." },
    { example: "0,3,5", desc: "Hari Minggu, Rabu, dan Jum'at." },
    { example: "1-5", desc: "Dari hari Senin sampai Jum'at." },
    { example: "3/2", desc: "Kelipatan 2 antara hari Rabu sampai Sabtu." },
    { example: "1-5/2", desc: "Kelipatan 2 antara hari Senin sampai Jum'at." },
    { example: "SUN,MON,FRI", desc: "Setiap hari Minggu, Senin dan Jum'at." },
  ]
};