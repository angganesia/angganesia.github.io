export default function TombolMenu({ to, text }) {
  return (
    <a
      className="menuHome"
      href={"#/" + to}>
      {/* <a className="menuHome" href={import.meta.env.BASE_URL + to }>*/}
      <i
        class="fa fa-gamepad"
        aria-hidden="true"></i>
      {text}
    </a>
  );
}
