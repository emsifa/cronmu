<script>
  import UnitDoc from './UnitDoc.svelte';
  export let dark;

  const docs = [
    { example: "*", desc: "Setiap bulan." },
    { example: "1,6,9", desc: "Bulan Januari, Juni, dan September." },
    { example: "1-10", desc: "Dari bulan Januari sampai Oktober." },
    { example: "5/2", desc: "Kelipatan 2 antara bulan Mei sampai Desember." },
    { example: "5-10/2", desc: "Kelipatan 2 antara bulan Mei sampai Oktober." },
    { example: "JAN,AUG,DEC", desc: "Bulan Januari, Agustus, dan Desember." },
  ];
</script>

<UnitDoc title="Dokumentasi Bulan" {docs} {dark}/>