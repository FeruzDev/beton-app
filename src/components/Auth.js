import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const Auth = () => {
    let [password, setPassword] = useState("")
    let history = useHistory();

    const pushNumber = (num) => {
        setPassword(password += num)
        console.log(password)
    }
    const arrowClear = () => {
        setPassword(password.slice(0, -1))
    }
    const clear = () => {
      setPassword("")
    }
    const login = () => {
        let data = new FormData()
        data.append("password", password)
        axios.post("https://beton.bgsoft.uz/api/?mod=login", data)
            .then(res =>{
                if (res.data.status === 2){
                    toast.error(res.data.statustext)

                } else if(res.data.status === 1 ){
                    toast.success(res.data.statustext)
                    localStorage.setItem("pass", password)
                    if(res.data.role === 1){
                        history.push("/enter")
                    } else {
                        history.push("/exit")
                    }
                }
            })
    }

    return (
        <div className="auth d-flex justify-content-center flex-column w-100">
            <img src="/img/beton.png" alt="logo" className="logo"/>
            <div className="tablo">
                <input type="text" value={password} />
            </div>
            <div className="keypad mt-3">
               <div className="w-100 d-flex">
                   <button onClick={() =>pushNumber("1")} className="keys">1</button>
                   <button onClick={() => pushNumber('2')} className="keys ">2</button>
                   <button onClick={() => pushNumber('3')} className="keys ">3</button>
               </div>
                <div className="w-100 d-flex">
                    <button onClick={() => pushNumber('4')} className="keys">4</button>
                    <button onClick={() => pushNumber('5')} className="keys ">5</button>
                    <button onClick={() => pushNumber('6')} className="keys ">6</button>
                </div>
               <div className="w-100 d-flex">
                   <button onClick={() => pushNumber('7')} className="keys">7</button>
                   <button onClick={() => pushNumber('8')} className="keys ">8</button>
                   <button onClick={() => pushNumber('9')} className="keys ">9</button>
               </div>
                <div className="w-100 d-flex">
                    <button className="keys" onClick={clear}><img src="/img/clear.png" alt=""/></button>
                    <button onClick={() => pushNumber('0')} className="keys ">0</button>
                    <button className="keys " onClick={arrowClear}><img src="/img/arrowl.png" alt=""/></button>
                </div>
            </div>
            <button onClick={login} className="enter bg-primary mt-3">
                KIRISH
            </button>

            <a href="https://burgutsoft.uz/" className="our-site" target="_blank">burgutSoft</a>
        </div>
    );
};

export default Auth;