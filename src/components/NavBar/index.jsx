import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { appContext } from "../../AppContext";
import { useContext } from "react";
function NavBarHeader() {
  const { userName } = useContext(appContext);
  return (
    <Navbar sticky='top' bg='dark' className="bg-body-secondary mb-3">
      <Navbar.Brand className="bg-body-primary p-1">
        <Link to='/' style={{textDecoration:'none'}}>
          Home
        </Link>
      </Navbar.Brand>
      {userName ? (
        <Navbar.Collapse className="justify-content-end p-2">
          <Navbar.Text bg='light' className='text-primary'>
            {`Signed in as: ${userName}`}
          </Navbar.Text>
        </Navbar.Collapse>
      ) : (
        <></>
      )}
    </Navbar>
  );
}
export { NavBarHeader };
