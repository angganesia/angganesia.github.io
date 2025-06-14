import TombolMenu from "@components/TombolMenu";

export default function PageNotFound() {
  return (
    <>
      <h2>Page Not Found</h2>
      <TombolMenu
        to="/"
        text="Back Home"
      />
    </>
  );
}
