import Cookie from "js-cookie";
import Logout from "./Logout";
import Getuser from "./Getuser";

const Home = () => {
  let Username = Cookie.get("username");
  let UserRole = localStorage.getItem("role"); // Get user role from local storage

  return (
    <div
      className="container mt-5 p-4 rounded shadow"
      style={{ backgroundColor: "#f8f9fa", maxWidth: "600px" }}
    >
      <div className="row align-items-center">
        <div className="col">
          <h4 className="text-primary" style={{ fontWeight: "bold" }}>
            Welcome, <span className="text-dark">{Username}</span> 🎉
          </h4>
        </div>
        <div className="col text-end">
          <Logout />
        </div>
      </div>

      {/* Show Getuser only if the role is admin */}
      {UserRole === "admin" && <Getuser />}
    </div>
  );
};

export default Home;
