import TombolMenu from "@components/TombolMenu";
import photo1 from "@img/me.jpg";

export default function Home() {
  return (
    <>
      <img
        src={photo1}
        alt="Angga Pratama"
      />
      <h2>Angga Pratama</h2>
      <TombolMenu
        to="toramtools"
        text="Toram Online Tools"
      />
      <TombolMenu
        to="osrs"
        text="Old School RuneScape Tools"
      />
    </>
  );
}
