import React, { useEffect, useState } from 'react';
import { Country, City } from 'country-state-city';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../bases/basesUrl';
import { toast } from 'react-toastify';

const Add = () => {

    const [paysDepart, setPaysDepart] = useState("");
    const [villeDepart, setVilleDepart] = useState("");

    const [paysDest, setPaysDest] = useState("");
    const [villeDest, setVilleDest] = useState("")

    const [heureArrivee, setHeureArrivee] = useState("")
    const [heureDepart, setHeureDepart] = useState("")

    const [prix, setPrix] = useState("")
    const [agence, setAgence] = useState("")

    const [btnClic, setBntClic] = useState(false);

    const navigation = useLocation();
    const { state } = navigation;

    const [agences, setAgences] = useState([]);

    const getAllAgences = () => {
        axios.get(`${baseUrl}/agences`)
            .then(res => {
                setAgences(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    };

    useEffect(() => {
        getAllAgences();
    }, []);

    const saveData = () => {
        setBntClic(true);
        axios.post(`${baseUrl}/vols`, {
            villeDepart, villeDest, heureArrivee, heureDepart, prix, agenceIdId : agence
        })
            .then(res => {
                toast.success(res && res.data && res.data.message);
                setBntClic(false);
            })
            .catch(err => {
                console.log(err.reponse);
                setBntClic(false);
            })
    }

    useEffect(() => {
        if (state) {
            setPrix(state && state.val && state.val.prix);
            setVilleDepart(state && state.val && state.val.villeDepart);
            setVilleDepart(state && state.val && state.val.villeDest);
            setHeureArrivee(state && state.val && state.val.heureArrivee);
            setHeureDepart(state && state.val && state.val.heureDepart);
            setAgence(state && state.val && state.val.agence);
        }
    }, [state]);

    return (
        <div className='col-sm-12 container mt-5'>
            <h5 className='mt-2 mb-4'>
                {
                    state ? `Modification de ${state && state.val}` && state.val.villeDepart : "Ajouter un voyage"
                }
            </h5>
            <div className='col-sm-3 mb-5'>
                <button className='btn' style={{ border: "1px solid #ddd" }}>
                    <Link to='/admin' style={{
                        textDecoration: "none", color: "#222", display: "flex", alignItems: "center", gap: "0.5rem"
                    }}>
                        <FaArrowLeft /> Retour
                    </Link>
                </button>
            </div>
            <div className='row'>
                <div className='col-sm-3'>
                    <label>Pays de départ</label>
                    <select className='form-control' onChange={(e) => setPaysDepart(e.target.value)}>
                        {
                            Country.getAllCountries().map((val, i) => {
                                return <option value={val.isoCode} key={i}>{val.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className='col-sm-3'>
                    <label>Ville de départ</label>
                    <select className='form-control' onChange={(e) => setVilleDest(e.target.value)}>
                        {
                            !paysDepart && <option value="">--Choisir une ville--</option>
                        }
                        {
                            paysDepart && City.getAllCities().map((val, i) => {
                                if (val.countryCode === paysDepart) {
                                    return <option key={i}>{val.name}</option>
                                }
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-3'>
                    <label>Pays de déstination</label>
                    <select className='form-control' onChange={(e) => setPaysDest(e.target.value)}>
                        {
                            Country.getAllCountries().map((val, i) => {
                                return <option
                                    value={val.isoCode}
                                    key={i}
                                    selected
                                >
                                    {val.name}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div className='col-sm-3'>
                    <label>Ville de déstination</label>
                    <select className='form-control' onChange={(e) => setVilleDepart(e.target.value)}>
                        {
                            !paysDest && <option value="">--Choisir une ville--</option>
                        }
                        {
                            paysDest && City.getAllCities().map((val, i) => {
                                if (val.countryCode === paysDest) {
                                    return <option key={i} value={val.name} selected={
                                        state ? villeDest === val.name ? "selected" : "" : ""}>{val.name}
                                    </option>
                                }
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-3'>
                    <input type="text" placeholder='Heure de départ'
                        onChange={(e) => setHeureDepart(e.target.value)}
                        className='form-control'
                        value={heureDepart}
                    />
                </div>
                <div className='col-sm-3'>
                    <input
                        type="text"
                        placeholder="Heure d'arrivée"
                        className='form-control'
                        value={heureArrivee}
                        onChange={(e) => setHeureArrivee(e.target.value)}
                    />
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-3'>
                    <input
                        type="number"
                        className='form-control'
                        placeholder='Le prix du voyage'
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                    />
                </div>
                <div className='col-sm-3'>
                    <select className='form-control' onChange={(e) => setAgence(e.target.value)}>
                        <option value="">--Choisir une agence--</option>
                        {
                            agences && agences.length > 0 ?
                                agences.map(val => {
                                    return <option value={val.id}>{val.nom}</option>
                                })
                                : ""
                        }
                    </select>
                </div>
            </div>

            <div className='row mt-3 addVoyage'>
                <div className='col-sm-3'>
                    <button
                        className='btn'
                        disabled={villeDepart && villeDest && heureArrivee && heureDepart && prix ? false : true}
                        onClick={saveData}
                    >
                        {state ? btnClic ? <>
                            Modification...
                        </> : "Modifier " : btnClic ? (
                            <>
                                Ajoout..
                            </>
                        ) : "Ajouter"}
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Add