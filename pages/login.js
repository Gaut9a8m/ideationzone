
import {useState} from 'react';
import { useCookies } from "react-cookie"
import Router from 'next/router'

export default function Login() {
    const [mssg, setMssg] = useState(false);
    const [cookie, setCookie] = useCookies(["ideationzone"])
    return (
      <div>
          <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={(e)=>loginapi(e, setMssg, setCookie, cookie)}>
                    <div className="user-box">
                        <input type="email" name="email" required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" />
                        <label>Password</label>
                    </div>
                {mssg ? <div><span style={{color:"red", textAlign:"center"}}>Email or password is wrong.</span></div> : <></>}

                    <div className="center">
                        <button>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Login
                        </button>
                    </div>
                </form>
          </div>
      </div>
    )
  }

const loginapi = async(e, setMssg, setCookie, cookie)=>{
    e.preventDefault();
    let body = {
        "email": e.target.email.value,
        "password": e.target.password.value
    }

    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }

    const fetch_res = await fetch(`${process.env.backend}users/login/`, payload);
    const res_data = await fetch_res.json()
    if (fetch_res.status == 200) {
        setMssg(false);
        if (cookie.ideationzone == undefined) {        
            setCookie("ideationzone", JSON.stringify(res_data.data), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
            Router.push('/')
        } 
    }
    else{
        setMssg(true);
    }

}
