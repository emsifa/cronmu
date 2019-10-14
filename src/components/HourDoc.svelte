<script>
  import UnitDoc from './UnitDoc.svelte';
  export let dark;

  const docs = [
    { example: "*", desc: "Setiap jam." },
    { example: "1,15,20", desc: "Jam 1, 15, dan 20." },
    { example: "1-10", desc: "Dari jam 1 sampai 10." },
    { example: "5/2", desc: "Kelipatan 2 antara jam 5 sampai 23." },
    { example: "5-10/2", desc: "Kelipatan 2 antara jam 5 sampai 10." },
  ];
</script>

<UnitDoc title="Dokumentasi Jam" {docs} {dark}/>