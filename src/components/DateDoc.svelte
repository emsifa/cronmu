<script>
  import UnitDoc from './UnitDoc.svelte';
  export let dark;

  const docs = [
    { example: "*", desc: "Setiap tanggal." },
    { example: "1,15,30", desc: "Tanggal 1, 15, dan 30." },
    { example: "1-10", desc: "Dari tanggal 1 sampai 10." },
    { example: "5/2", desc: "Kelipatan 2 antara tanggal 5 sampai 31." },
    { example: "5-10/2", desc: "Kelipatan 2 antara tanggal 5 sampai 10." },
  ];
</script>

<UnitDoc title="Dokumentasi Tanggal" {docs} {dark}/>