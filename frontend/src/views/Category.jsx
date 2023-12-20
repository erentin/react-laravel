import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function (){

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosClient.get('/categories')
        .then(response => {
          console.log(response);
          setCategories(response.data.data); // Assuming the data is an array of categories
          console.log("Categories:", categories)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }, []);

  return(
      <div className="category">

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Categories</h2>
          <Link to="/category/new" className="btn-add"> Add New</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>DIFFICULTY</th>
              <th>STATUS</th>
              <th>CREATE DATE</th>
              <th>ACTIONS</th>
            </tr>
            </thead>
            <tbody>
            {

              categories.map(category => (

                  <tr>
                    <td>{category.id}</td>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>{category.difficulty}</td>
                    <td>{category.status}</td>
                    <td>{category.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={'/category/'+category.id}>Edit</Link>
                      <button  className="btn-delete">Delete</button>
                    </td>
                  </tr>
              ))
            }

            </tbody>
          </table>
        </div>
      </div>
  )

}