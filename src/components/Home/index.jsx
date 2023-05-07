import { useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { appContext } from './../../AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export function Home () {
	const navigate = useNavigate();
	const { user, setUser, userName, setUserName } = useContext(appContext);
	useEffect(()=>{
    if(user){
      axios.get(process.env.REACT_APP_SERVER_URL+'/user', {
        headers:{
          'Authorization':'Bearer '+user
        }
      })
      .then(res=>res.data)
      .then(user=>{
        console.log(`setting username - ${user.name}`);
        setUserName(user.name)
      })
      .catch(err=>console.error(err))
    }
    else{
      console.log(`no user token`);
      navigate('/login');
    }
  }, [])

	
		return(
			<Container className="d-flex mt-5 gap-3 flex-column">
				
				<div>
					<Link to='/newGame'>
						<Button variant='outline-dark'>New Game</Button>
					</Link>
				</div>
				<div>
					<Link to='/join'>
							<Button variant='outline-dark'>Join an ongoing game</Button>
					</Link>
				</div>
				
			</Container>
			
			)
}