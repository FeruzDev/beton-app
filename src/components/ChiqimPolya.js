import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

const ChiqimPolya = () => {
    const [products, setProducts] = useState([])
    const [materail , setMaterial] = useState([])
    const [miqdor , setMiqdor] = useState([])
    const [contr , setContr] = useState([])
    const [materialId, setMaterialId] = useState("")
    const [miqdorId, setMiqdorId] = useState("")
    const [kontragentId, setKontragentId] = useState("")
    const [carId, setCarId] = useState("")

    let newData = new FormData()
    newData.append("password", localStorage.getItem("pass"))

    const getProducts = () => {
        axios.post("https://beton.bgsoft.uz/api/?mod=product", newData)
            .then(res =>{
                setProducts(res.data.data)
            })
    }

    const getAmount = (e) => {
        newData.append("ulchov_id", e.target.value)
        setMaterialId(e.target.value)
        axios.post("https://beton.bgsoft.uz/api/?mod=miqdor", newData)
            .then(res =>{
                setMiqdor(res.data.miqdor)
            })
    }

    const getContragent = () => {
        axios.post("https://beton.bgsoft.uz/api/?mod=kontragent")
            .then(res =>{
                setContr(res.data.kontragent)
            })
    }

    const sendData = () => {
        let myData = new FormData()
        myData.append("product_id", materialId)
        myData.append("miqdor_id", miqdorId)
        myData.append("kontragent_id", kontragentId)
        myData.append("password",localStorage.getItem("pass"))

        console.log(kontragentId)
        axios.post("https://beton.bgsoft.uz/api/?mod=addchiqim", myData)
            .then(res =>{
                toast.success(res.data.statustext)
            })
    }

    useEffect(() =>{
        getProducts()
        getContragent()
    }, [])
    return (
        <div className="kirimPolya">
            <h1 className="kirimTitle">CHIQIM</h1>
            <div className="myInputs">
                <div className="input-group">
                    <label className="w-100" htmlFor="product">Nima chiqmoqda?</label>
                    <select onChange={getAmount} className="w-100 form-select" id="product">
                        <option value="1111111"></option>
                        {
                            products?.map(item =>(
                                <option value={item.ulchov_id}>{item.product_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="input-group">
                    <label className="w-100" htmlFor="amount">Qancha chiqmoqda?</label>
                    <select onChange={(e) => setMiqdorId(e.target.value)}  className="w-100 form-select" id="amount">
                        <option value="1111111"></option>
                        {
                            miqdor?.map(item =>(
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="input-group">
                    <label className="w-100" htmlFor="whom">Kimga?</label>
                    <select onChange={(e) => setKontragentId(e.target.value)}  className="w-100 form-select" id="whom">
                        <option value="1111111"></option>
                        {
                            contr?.map(item =>(
                                <option value={item.kontragent_id}>{item.kontragent_name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="footer d-flex justify-content-between">

                <Link  to="/exit" className="sendBtn text-decoration-none">
                    CHIQISH
                </Link>
                <button onClick={sendData} className="sendBtn ml-3">
                    YUBORISH
                </button>
            </div>
        </div>
    );
};

export default ChiqimPolya;