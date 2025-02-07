import { Children, createContext,useEffect,useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [authorID, setAuthorID] = useState(null);

    useEffect(() => {
      localStorage.setItem('user',JSON.stringify(currentUser))
    }, [currentUser])
    
    return <UserContext.Provider value={{currentUser, setcurrentUser}} >{children}</UserContext.Provider>
}

export default UserProvider