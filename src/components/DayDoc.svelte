<script>
  import UnitDoc from './UnitDoc.svelte';
  export let dark;

  const docs = [
    { example: "*", desc: "Hari apapun." },
    { example: "0,3,5", desc: "Hari Minggu, Rabu, dan Jum'at." },
    { example: "1-5", desc: "Dari hari Senin sampai Jum'at." },
    { example: "3/2", desc: "Kelipatan 2 antara hari Rabu sampai Sabtu." },
    { example: "1-5/2", desc: "Kelipatan 2 antara hari Senin sampai Jum'at." },
    { example: "SUN,MON,FRI", desc: "Setiap hari Minggu, Senin dan Jum'at." },
  ];
</script>

<UnitDoc title="Dokumentasi Hari" {docs} {dark}/>