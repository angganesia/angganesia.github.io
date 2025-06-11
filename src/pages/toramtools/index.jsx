import TombolMenu from "@components/TombolMenu";

export default function ToramHome() {
  return (
    <>
      <h2>Toram Online Tools</h2>
      <TombolMenu
        to="toramtools/equipments"
        text="All Equipments"
      />
      <TombolMenu
        to="toramtools/monsters"
        text="All Monsters"
      />
      <TombolMenu
        to="toramtools/kodebuff"
        text="Kode Buff"
      />
      <TombolMenu
        to="toramtools/cbc"
        text="Consignment Board Calculator"
      />
    </>
  );
}
