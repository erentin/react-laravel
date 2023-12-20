import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function (){

  const [errors, setErrors] = useState(null);
  const{setUser, setToken} = useStateContext();

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (ev) => {
     ev.preventDefault()

      const payload = {
        email:emailRef.current.value,
        password:passwordRef.current.value,
      }
      setErrors(null);
      axiosClient.post('/login',payload)
          .then(({data}) => {
            // İstek başarılıysa burada işlemlerinizi gerçekleştirebilirsiniz
            setUser(data[0].user);
            setToken(data[0].token);
          })
          .catch(error => {
            // İstek başarısız olduğunda burada hata işlemlerinizi gerçekleştirebilirsiniz
            const response = error.response;
            if(response && response.status === 422){
              if(response.data.errors){
                setErrors(response.data.errors);
              }else{
                setErrors({
                  email: [response.data.message]
                });
              }


            }
          });
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div>
              <form onSubmit={onSubmit}>
                <h1 className="title">
                  Login Into Your Account
                </h1>
                {
                  errors && <div className='alert'>{Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>
                }

                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <button className="btn btn-block">Login</button>
                <p className="message">
                  Not Registered? <Link to="/signup">Create An Account</Link>
                </p>
              </form>
            </div>
        </div>
    )
}