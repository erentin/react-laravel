import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function (){

  const {user, token} = useStateContext()

  const onLogout = (ev) => {
    ev.preventDefault();


  }
  
  if(!token){
    return <Navigate to="/login" />
  }

    return(
        <div id="defaultLayout">
          <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
          </aside>
          <div className="content">
            <header>
               <div>
                 Header
               </div>

               <div>
                 User
                 <a href='#' onClick={onLogout}></a>
               </div>
            </header>

            <main>
              <Outlet />
            </main>
          </div>
        </div>
    )
}