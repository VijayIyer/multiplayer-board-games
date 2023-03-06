import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChooseGame } from './components/ChooseGame';
import { OngoingGames } from './components/OngoingGames';
import { Home } from './components/Home';
import { PageNotFound } from './components/PageNotFound';
import { TicTacToe } from './components/TicTacToe';
import  { GameContextProvider } from './components/Connect4/gameContextProvider';
import { Connect4 } from './components/Connect4/index.jsx';
import './App.css';
import { appContext } from './AppContext';
import io from 'socket.io-client';
import { useEffect } from 'react';

function App() {

  const socket = io('http://127.0.0.1:5000');
  useEffect(()=>{
    socket.on('connect', ()=>{
      console.log('connected!');
    
    })

  }, [])
  return (
    <div className="App">
      <Container fluid>

          <BrowserRouter>
            <Routes>
              <Route path='/' element={
                <appContext.Provider value={
                  socket
                } >
                <Home />
                </appContext.Provider>
              }/>
              <Route path='/join' element={
                <appContext.Provider value={
                  socket
                }>
                  <OngoingGames />
                </appContext.Provider>} />
              <Route path='/newGame' element={<ChooseGame />}/>
              <Route path="*" element={<PageNotFound />} />
              <Route path="/game/tictactoe/:id" element={
               <appContext.Provider value={
                  socket
                }>
                <TicTacToe />
              </appContext.Provider>
            }/>
            <Route path="/game/tictactoe" element={
               <appContext.Provider value={
                  socket
                }>
                <TicTacToe />
              </appContext.Provider>
            }/>
              <Route path="/game/connect4/:id" element={
               <appContext.Provider value={
                  socket
                }> 
                  <GameContextProvider>
                    <Connect4 numRows={8} numCols={6} />
                  </GameContextProvider>
                </appContext.Provider>
              } />
              <Route path="/game/connect4" element={
               <appContext.Provider value={
                  socket
                }> 
                  <GameContextProvider>
                    <Connect4 numRows={8} numCols={6} />
                  </GameContextProvider>
                </appContext.Provider>
              } />
            </Routes>
            <Navbar fixed="top" variant="primary">
              <Link to="/">
                <Navbar.Brand>
                    Home
                </Navbar.Brand>
              </Link>
            </Navbar>
          </BrowserRouter>
        
      </Container>
    </div>
  );
}

export default App;
