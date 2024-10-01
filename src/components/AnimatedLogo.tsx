import loaderImage from "../assets/images/faces/loader.png";
const AnimatedLogo = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "500px", // Adjust height as needed
        }}
      >
        <img
          src={loaderImage}
          alt="Loader"
          style={{
            width: "50px", // Adjust width as needed
            animation: "spin 1s linear infinite", // Adjust animation duration
          }}
        />
        <p style={{ marginTop: "10px" }}>Loading...</p>
      </div>
    </div>
  );
};

export default AnimatedLogo;
