import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { BarLoader } from 'react-spinners';

export default function (){
  const[users, setUsers] = useState([]);
  const[loading, setLoading] = useState(false);
  const{setNotification} = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDelete = (u) => {
    if(!window.confirm("Are you sure you want to delete this user?")){
      return
    }
    axiosClient.delete(`/users/${u.id}`)
        .then(() => {
          //TODO show notification
          setNotification("User was successfully deleted.");
          getUsers();
        })
        .catch(error => {
          console.log(error);
        })
  }

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
        .then(({data}) => {
          setLoading(false)
          setUsers(data.data)
          console.log(data.data, "then");
        })
        .catch( () => {
          setLoading(false)
        })
  }

    return(


          users ? (
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <h1>Users</h1>
                  <Link to="/Users/new" className="btn-add"> Add New</Link>
                </div>
                <div className="card animated fadeInDown">
                  <table>
                    <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>CREATE DATE</th>
                      <th>ACTIONS</th>
                    </tr>
                    </thead>
                    {
                      loading ? (
                          <tbody>
                          <tr>
                            <td colSpan="5" className="centered-td">
                              <div className="loader-container">
                                <BarLoader color="#5b08a7" height={4} />
                              </div>
                            </td>
                          </tr>
                          </tbody>
                      ) : null
                    }
                    {
                      !loading ? (
                          <tbody>
                          {users.map(u => (
                              <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                  <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                  <button onClick={e => onDelete(u)} className="btn-delete">Delete</button>
                                </td>
                              </tr>
                          ))}
                          </tbody>
                      ) : null
                    }
                  </table>
                </div>
              </div>
          ) : null

    )

}