import { useState } from "react"

import { Home } from "./Home"
import { Login } from "./Login"
import { Signup } from "./Signup"

export function App(){
    const [user, setUser] = useState()

    if(user) {
        return <Home />
    }
     return window.location.pathname === '/signup'
    ? <Signup singInUser={setUser} /> 
    : <Login signInUser={setUser} />
    
    //return user ? <Home /> : <Login signInUser={setUser} />
}