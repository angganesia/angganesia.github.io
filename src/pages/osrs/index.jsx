import TombolMenu from "@components/TombolMenu";

export default function OsrsHome() {
  return (
    <>
      <h2>Maintance</h2>
      <TombolMenu
        to="/"
        text="Back Home"
      />
      {/*<h2>Old School RuneScape Tools</h2>
      <a
        className="menuHome"
        href="/toramtools/cbc">
        <i
          class="fa fa-gamepad"
          aria-hidden="true"></i>
        Consignment Board Calculator
      </a>*/}
    </>
  );
}
