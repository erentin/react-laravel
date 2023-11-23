import {Link} from "react-router-dom";

export default function (){

    const onSubmit = (ev) => {
      ev.preventDefault()
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div>
              <form onSubmit={onSubmit}>
                <h1 className="title">
                  Login Into Your Account
                </h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="btn btn-block">Login</button>
                <p className="message">
                  Not Registered? <Link to="/signup">Create An Account</Link>
                </p>
              </form>
            </div>
        </div>
    )
}