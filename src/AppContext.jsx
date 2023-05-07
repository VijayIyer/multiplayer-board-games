import { useState, createContext } from 'react';
export const appContext = createContext();

// export const AppContextProvider = (props)=>{
// 	const [loggedIn, setLoggedIn] = useState(false);
// 	return (
// 		<appContext.Provider
// 		value=
// 		{{
// 			loggedIn, 
// 			setLoggedIn
// 		}}>
// 			{props.children}
// 		</appContext.Provider>
// 		)
// }