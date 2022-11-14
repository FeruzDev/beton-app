import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {Link, useHistory} from "react-router-dom";

const KirimPolya = () => {
    const [cars , setCars] = useState([])
    const [materail , setMaterial] = useState([])
    const [miqdor , setMiqdor] = useState([])
    const [contr , setContr] = useState([])
    const [materialId, setMaterialId] = useState("")
    const [miqdorId, setMiqdorId] = useState("")
    const [kontragentId, setKontragentId] = useState("")
    const [carId, setCarId] = useState("")
    let history = useHistory()
    let newData = new FormData()
    let newData2 = new FormData()
    newData.append("password", localStorage.getItem("pass"))
    const getProducts = () => {
        axios.post("https://beton.bgsoft.uz/api/?mod=material", newData)
            .then(res =>{
                setMaterial(res.data.data)
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
    const getCars = (e) => {
        setKontragentId(e.target.value)
        newData2.append("kontragent_id", e.target.value)
        axios.post("https://beton.bgsoft.uz/api/?mod=cars", newData2)
            .then(res =>{
                setCars(res.data.cars)
            })
    }

    const sendData = () => {
      let myData = new FormData()
      myData.append("material_id", materialId)
      myData.append("miqdor_id", miqdorId)
      myData.append("kontragent_id", kontragentId)
      myData.append("car_id", carId)
      myData.append("password",localStorage.getItem("pass"))

        axios.post("https://beton.bgsoft.uz/api/?mod=addkirim", myData)
            .then(res =>{
                if (res.data.status === 2){
                    toast.error(res.data.statustext)
                } else {
                    toast.success(res.data.statustext)
                    history.push("/enter")

                }
            })
    }
    useEffect(() =>{
        getProducts()
        getContragent()
    }, [])
    return (
        <div className="kirimPolya">
            <h1 className="kirimTitle">KIRIM</h1>
            <form >
                <div className="myInputs">
                    <div className="input-group">
                        <label className="w-100" htmlFor="product">Nima keldi?</label>
                        <select required className="w-100 form-select" id="product" onChange={getAmount}>
                            <option value="1111111"></option>
                            {
                                materail?.map(item =>(
                                    <option value={item.ulchov_id}>{item.material_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="w-100" htmlFor="amount">Qancha keldi?</label>
                        <select  onChange={(e) => setMiqdorId(e.target.value)} className="w-100 form-select" id="amount">
                            <option value="1111111"></option>
                            {
                                miqdor?.map(item =>(
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="w-100" htmlFor="whom">Kimdan keldi?</label>
                        <select required onChange={getCars} className="w-100 form-select" id="whom">
                            <option value="1111111"></option>
                            {
                                contr?.map(item =>(
                                    <option value={item.kontragent_id}>{item.kontragent_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="w-100" htmlFor="car">Mashinani tanlang</label>
                        <select required onChange={(e) => setCarId(e.target.value)} className="w-100 form-select" id="car">
                            <option value="1111111"></option>
                            {
                                cars?.map(item =>(
                                    <option value={item.car_id}>{item.car_nomer}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="footer d-flex justify-content-between">
                    {/*<div className="openCamera">*/}
                    {/*    <label htmlFor="camera"><img src="/img/camera.png" alt="camera"/></label>*/}
                    {/*    <input  type="file" accept="image/*" capture="camera" id="camera"/>*/}
                    {/*</div>*/}
                    <Link  to="/enter" className="sendBtn text-decoration-none">
                        CHIQISH
                    </Link>
                    <button type="button" className="sendBtn ml-3" onClick={sendData}>
                        YUBORISH
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KirimPolya;