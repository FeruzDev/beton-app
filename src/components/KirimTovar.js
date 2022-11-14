import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const KirimTovar = () => {
    const [data, setData] = useState([])
    let history = useHistory()
    const getData = () => {
        let newData = new FormData();
        newData.append("password", localStorage.getItem("pass"))
        axios.post("https://beton.bgsoft.uz/api/?mod=lastkirim", newData)
            .then(res =>{
                setData(res.data.logs)
            })
    }
    const exitFc = () => {
        localStorage.clear()
        history.push("/")
    }
    useEffect(()=>{
        getData()
    }, [])
    return (
        <div className="KirimTovar">
                <h1 className="position-relative">Kirish Jurnali
                      <button onClick={exitFc} className="exitBtn"><img  src="/img/exitimg.png" alt="exit"/></button>
                </h1>
            <Link to="/enter-product" className="enterBtn">Kiritish</Link>
            <h3 className="tovarListTitle">Bugun kiritilganlar</h3>
            <div className="tovarList">
                {
                    data.length > 0
                        ?
                        data?.map((item, index) =>(
                            <div className="items">
                                <div className="numeric">
                                    {index + 1}
                                </div>
                                <div  className="contentItem">
                                    <h2>Tovar nomi:  {item?.material_name}</h2>
                                    <p>Tovar miqdori :   {item?.miqdor + " " + item?.ulchov_name}</p>
                                    <h4>Mashinasi: {item?.carnomer}</h4>
                                    <h6>Kimdan: {item?.kontragent_name}</h6>
                                </div>
                            </div>

                        ))
                        :
                        <h1 className="mt-5 text-danger p-4 bg-white" style={{borderRadius: "10px"}}>
                            Bugun ma'lumot kiritilmadi
                        </h1>
                }
            </div>
        </div>
    );
};

export default KirimTovar;