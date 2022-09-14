import BounceLoader from "react-spinners/BounceLoader";

const styleOverride: React.CSSProperties = {
  margin: "50px auto",
  borderColor: "red"
};

const Calling = () => {
  return (
    <>
      <h2>Calling...</h2>
      <BounceLoader size={100} color={"white"} cssOverride={styleOverride} />
    </>
  );
};

export default Calling;
