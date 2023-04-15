import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

function AddModule() {
  const [module, setModule] = useState({
    typKwalifikacji: "INF",
    nrKwalifikacji: "04",
    kwalifikacje: { name: ["PROGRAMISTA"] },
    kursy: ["html&css", "javascript", "sql", "php"],
    color: "bg-gray-400",
    border: "border-gray-500",
    active: false,
  });
  const [auth] = useAuth();

  const [error, setError] = useState(null);

  const postModule = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(
        `https://examie-default-rtdb.europe-west1.firebasedatabase.app/modules/${module.typKwalifikacji.toLowerCase()}${
          module.nrKwalifikacji
        }.json?auth=${
          auth?.userId === import.meta.env.VITE_PERMISSION ? auth.token : ""
        }`,
        module
      );
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return (
    <section>
      <h1>Dodaj moduł</h1>
      <button className="btn btn-success">Dodaj</button>
    </section>
  );
}

export default AddModule;
