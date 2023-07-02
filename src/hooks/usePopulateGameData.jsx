import axios from "axios";
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appContext } from "../AppContext";
export default function usePopulateGameData(populateGameData) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(appContext);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + location.pathname, {
        headers: {
          Authorization: "Bearer " + user,
        },
      })
      .then((res) => res.data)
      .then((gameData) => populateGameData(gameData))
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);
}
