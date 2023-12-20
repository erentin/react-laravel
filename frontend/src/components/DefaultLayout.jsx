import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function (){

  const {user, token, notification, setUser, setToken} = useStateContext()


  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post('/logout')
        .catch(() => {
          setUser({})
          setToken(null)
          console.log("Logout succesful!")
        })
        .then( () => {})
          console.log("Logout unsuccesful!")
  }

  useEffect(() => {
    axiosClient.get('/user', user)
        .then(({data}) => {
          setUser(data);
        })
        .catch(error => {
          setUser(null);
          localStorage.removeItem('token');
        })
  }, []);
  
  if(!token){
    return <Navigate to="/login" />
  }

    return(
        <div id="defaultLayout">
          <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
            <Link to="/vocabulary">Vocabularies</Link>
          </aside>
          <div className="content">
            <header>
               <div>
                 Header
               </div>

               <div>
                 <h1>Welcome, {user.name}!</h1>
                 <a onClick={onLogout}>Logout</a>
               </div>
            </header>

            <main>
              <Outlet />
            </main>
          </div>

          { notification &&
            <div className="notification">
              {notification}
            </div>
          }


        </div>
    )
}