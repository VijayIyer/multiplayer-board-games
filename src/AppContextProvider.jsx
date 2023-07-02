import { appContext } from "./AppContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket";
export default function AppContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(window.sessionStorage.getItem("token"));
  const [userName, setUserName] = useState(null);
  const [authorized, setAuthorized] = useState(true);
  const [ongoingGames, setOngoingGames] = useState([]);
  const createNewGame = (type, turn) => {
    socket.emit("createNewGame", { token: user, type: type, turn: turn });
  };
  const joinGame = (type, turn, id) => {
    console.log(`joining game with turn ${turn}`);
    socket.emit("joinGame", { token: user, id: id, turn: turn }, (data) => {
      let route;
      console.log(data);
      switch (type) {
        case "Connect4":
          route = `/game/${type}/${id}`;
          break;
        case "TicTacToe":
          route = `/game/${type}/${id}`;
          break;
        default:
          route = null;
          break;
      }

      if (route) {
        navigate(route);
      }
    });
  };

  useEffect(() => {
    function printError(data) {
      console.log(data);
    }
    socket.on("errorCreatingNewGame", (data) => printError(data));
    return () => {
      socket.off("errorCreatingNewGame", (data) => printError(data));
    };
  }, []);
  useEffect(() => {
    function handleUserUnauthorizedEvent() {
      setAuthorized(false);
    }
    socket.on("userUnauthorized", handleUserUnauthorizedEvent);
    return () => {
      socket.off("userUnauthorized", handleUserUnauthorizedEvent);
    };
  }, []);
  useEffect(() => {
    function updateOngoingGames(data) {
      console.log(JSON.stringify(data));
      setOngoingGames((ongoingGames) => [...ongoingGames, data]); // append and return new array reference
    }
    socket.on("newGameCreated", (data) => updateOngoingGames(data));
    return () =>
      socket.off("newGameCreated", (data) => updateOngoingGames(data));
  }, []);
  useEffect(() => {
    function navigateToGame(data) {
      console.log(`navigiating to created game`);
      if (data.type === "TicTacToe") {
        navigate(`/game/TicTacToe/${data.id}`);
      } else if (data.type === "Connect4") {
        navigate(`/game/Connect4/${data.id}`);
      }
    }
    socket.on("newGameDetails", (data) => navigateToGame(data));
    return () => {
      socket.off("newGameDetails", (data) => navigateToGame(data));
    };
  }, [navigate]);
  return (
    <appContext.Provider
      value={{
        socket,
        user,
        setUser,
        userName,
        setUserName,
        authorized,
        setAuthorized,
        createNewGame,
        joinGame,
        ongoingGames,
        setOngoingGames,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
