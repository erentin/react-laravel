import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function CategoryForm(){
  const navigate = useNavigate()
  const {id} = useParams();
  const [category, setCategory] = useState(null);

  const [title, setTitle] = useState({
    id: null,
    title: '',
    description: '',
    difficulty: '',
    status: '',
  })

  const titleRef = useRef();
  const difficultyRef = useRef();
  const statusRef = useRef();

  if(id){
    useEffect(() => {
      axiosClient.get(`/categories/${id}`)
          .then(response => {
            setCategory(response.data);
            setTitle({...title, title: response.data.title })
          })
          .catch(error => {
            console.error('Error fetching category data:', error);
          });
    }, [id]);
  }


  const onSubmit = (e) => {
    e.preventDefault();

    console.log(title);

    if(category){
      axiosClient.put(`/categories/${id}`,title)
          .then(response => {
            console.log(title);
            navigate("/vocabulary");
          })
          .catch(error => {
            console.log(error);
          })
    }else{
      axiosClient.post('/categories',title)
          .then(response => {
            navigate("/vocabulary");
          })
          .catch(error => {
            console.log(error);
          })
    }
  }

  return(
      <>
        {category && <h1>Update User: {category.title}</h1>}
        {!category && <h1>New User</h1>}
        <form onSubmit={onSubmit}>
          <input value={title.title} placeholder="Name" ref={titleRef} onChange={ev => setTitle({...title, title: ev.target.value })} />
          <input value={title.description} placeholder="Description" ref={statusRef} onChange={ev => setTitle({...title, description: ev.target.value })} />
          <input value={title.difficulty} placeholder="Difficulty" ref={difficultyRef} onChange={ev => setTitle({...title, difficulty: ev.target.value })} />
          <input value={title.status} placeholder="Status" ref={statusRef} onChange={ev => setTitle({...title, status: ev.target.value })} />
          <button className="btn">Save</button>
        </form>
      </>
  )
}