import { Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ChooseGame } from "./components/ChooseGame";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { PageNotFound } from "./components/PageNotFound";
import { TicTacToe } from "./components/TicTacToe";
import { GameContextProvider } from "./components/Connect4/gameContextProvider";
import { NavBarHeader } from "./components/NavBar";
import { Connect4 } from "./components/Connect4/index.jsx";
import UnauthorizedUser from "./components/UnauthorizedUser";
import AppContextProvider from "./AppContextProvider";
import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <div className='App'>
        <Container fluid>
          <NavBarHeader />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/newGame' element={<ChooseGame />} />
            <Route path='/game/TicTacToe/:id' element={<TicTacToe />} />
            <Route path='/game/TicTacToe' element={<TicTacToe />} />
            <Route
              path='/game/Connect4/:id'
              element={
                <GameContextProvider>
                  <Connect4 numRows={8} numCols={6} />
                </GameContextProvider>
              }
            />
            <Route
              path='/game/Connect4'
              element={
                <GameContextProvider>
                  <Connect4 numRows={8} numCols={6} />
                </GameContextProvider>
              }
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <UnauthorizedUser />
        </Container>
      </div>
    </AppContextProvider>
  );
}

export default App;
