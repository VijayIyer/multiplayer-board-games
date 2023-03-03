import { useContext } from 'react';
import LoginContext from './loginContext';

export const LoginContextProvider = (props)=>{
	return (
		<LoginContext.Provider
		value=
		{{
			userName, 
			id
		}}>
			{props.children}
		</LoginContext.Provider>
		)
}