import TombolMenu from "@components/TombolMenu";

export default function ToramHome() {
  return (
    <>
      <h2>Toram Online Tools</h2>

      <TombolMenu
        to="searchdata"
        text="Search Data"
      />
      <TombolMenu
        to="kodebuff"
        text="Kode Buff"
      />
      <TombolMenu
        to="cbc"
        text="Consignment Board Calculator"
      />
    </>
  );
}
