import Container from "react-bootstrap/Container";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { ChooseGame } from "./components/ChooseGame";
import { OngoingGames } from "./components/OngoingGames";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { PageNotFound } from "./components/PageNotFound";
import { TicTacToe } from "./components/TicTacToe";
import { GameContextProvider } from "./components/Connect4/gameContextProvider";
import { Connect4 } from "./components/Connect4/index.jsx";
import "./App.css";
import { appContext } from "./AppContext";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";

function App() {
  const [user, setUser] = useState(window.sessionStorage.getItem("token"));
  const [userName, setUserName] = useState(null);
  const [unAuthorized, setUnauthorized] = useState(false);
  const socket = io(process.env.REACT_APP_SERVER_URL);

  useEffect(() => {
    socket.on("userUnauthorized", () => {
      setUnauthorized(true);
    });
  }, [user]);

  return (
    <div className='App'>
      <appContext.Provider
        value={{
          user,
          setUser,
          socket,
          userName,
          setUserName,
        }}
      >
        <Container fluid>
          <BrowserRouter>
            <Navbar fixed='top' variant='primary'>
              <Link to='/'>
                <Navbar.Brand>Home</Navbar.Brand>
              </Link>
              {userName ? (
                <Navbar.Text class='float-right'>
                  {`Signed in as: ${userName}`}
                </Navbar.Text>
              ) : (
                <></>
              )}
            </Navbar>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Registration />} />
              <Route path='/join' element={<OngoingGames />} />
              <Route path='/newGame' element={<ChooseGame />} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='/game/tictactoe/:id' element={<TicTacToe />} />
              <Route
                path='/game/connect4/:id'
                element={
                  <GameContextProvider>
                    <Connect4 numRows={8} numCols={6} />
                  </GameContextProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </Container>
      </appContext.Provider>
    </div>
  );
}

export default App;
