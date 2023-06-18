import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChooseGame } from "./components/ChooseGame";
import { OngoingGames } from "./components/OngoingGames";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { PageNotFound } from "./components/PageNotFound";
import { TicTacToe } from "./components/TicTacToe";
import { GameContextProvider } from "./components/Connect4/gameContextProvider";
import { NavBarHeader } from "./components/NavBar";
import { Connect4 } from "./components/Connect4/index.jsx";
import UnauthorizedUser from './components/UnauthorizedUser';
import "./App.css";
import { appContext } from "./AppContext";
import io from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(window.sessionStorage.getItem("token"));
  const [userName, setUserName] = useState(null);
  const [authorized, setAuthorized] = useState(true);
  const socket = io(process.env.REACT_APP_SERVER_URL);

  useEffect(() => {
    socket.on("userUnauthorized", () => {
      console.log(`user does not have token`);
      setAuthorized(false);
    });
  }, [user]);

  return (
    <>
      
      <div className='App'>
        <appContext.Provider
          value={{
            user,
            setUser,
            socket,
            userName,
            setUserName,
            authorized, 
            setAuthorized
          }}
        >
          <Container fluid>
            <BrowserRouter>
              
              <NavBarHeader />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Registration />} />
                <Route path='/join' element={<OngoingGames />} />
                <Route path='/newGame' element={<ChooseGame />} />
                <Route path='/game/tictactoe/:id' element={<TicTacToe />} />
                <Route path='/game/tictactoe' element={<TicTacToe />} />
                <Route
                  path='/game/connect4/:id'
                  element={
                    <GameContextProvider>
                      <Connect4 numRows={8} numCols={6} />
                    </GameContextProvider>
                  }
                />
                <Route
                  path='/game/connect4'
                  element={
                    <GameContextProvider>
                      <Connect4 numRows={8} numCols={6} />
                    </GameContextProvider>
                  }
                />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            <UnauthorizedUser authorized={authorized}/>
            </BrowserRouter>
            
          </Container>
        </appContext.Provider>
      </div>
    </>
  );
}

export default App;
