import Container from "react-bootstrap/Container";
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
import UnauthorizedUser from './components/UnauthorizedUser';
import "./App.css";
import { appContext } from "./AppContext";
import { socket } from './socket';
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(window.sessionStorage.getItem("token"));
  const [userName, setUserName] = useState(null);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();
  const createNewGame = (type, turn, callBack)=>{
    socket.emit('createNewGame', {token: user, type: type, turn:turn}, callBack)
  }
  const joinGame = (type, turn, id, callBack)=>{
    console.log(`joining game with turn ${turn}`);
    socket.emit('joinGame', { token: user, id:id, turn:turn }, (data)=>{
      callBack();
      let route;
      console.log(data);
      switch(type){
        case 'Connect4':
          route = `/game/${type}/${id}`;
          break;
        case 'TicTacToe':
          route = `/game/${type}/${id}`;
          break;
        default:
          route = null;
          break;
      }
      console.log(route);
      if(route){
        navigate(route, { state : data });  
      }
      
    });
  }
  const handleTokenError = () => setAuthorized(false);
  useEffect(() => {
    socket.on("userUnauthorized", handleTokenError);
    return ()=>{
      socket.off("userUnauthorized", handleTokenError);
    }
  }, [user]);
  useEffect(()=>{
    socket.on('errorCreatingNewGame', (data)=>{
      console.log(data);
      return ()=>{
        socket.off('errorCreatingNewGame', (data)=>{
          console.log(data);
        })
      }
    })
  })
  
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
            setAuthorized, 
            createNewGame,
            joinGame
          }}
        >
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
            <UnauthorizedUser authorized={authorized}/>
            
            
          </Container>
        </appContext.Provider>
      </div>
    </>
  );
}

export default App;
