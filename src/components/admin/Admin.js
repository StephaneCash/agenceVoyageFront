import React, { useEffect, useState } from 'react'
import './Admin.css';
import { baseUrl, baseUrlImage } from '../../bases/basesUrl';
import axios from 'axios';
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {

    const [vols, setVols] = useState([]);
    const [page, setPage] = useState(1);

    const getAllVols = () => {
        axios.get(`${baseUrl}/vols`)
            .then(res => {
                setVols(res.data);
            })
            .catch(err => {
                console.log(err.response)
            })
    };

    useEffect(() => {
        getAllVols();
    }, []);

    const deleItem = (id) => {
        if (window.confirm("Voulez-vous supprimer ce voyage ?")) {
            axios.delete(`${baseUrl}/vols/${id}`)
                .then(res => {
                    toast.success(res && res.data && res.data.message);
                    getAllVols();
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    return (
        <div className='admin'>
            <div className='col-sm-12 container button'>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <div className={page === 1 && "selectedPage"}
                        style={{ border: "1px solid #ddd", padding: "1rem", cursor: "pointer", borderRadius: "7px" }}
                        onClick={
                            () => {
                                setPage(1);
                            }
                        }>
                        Gérer les voyages
                    </div>
                    <div
                        className={page === 2 && "selectedPage"}
                        style={{ border: "1px solid #ddd", padding: "1rem", cursor: "pointer", borderRadius: "7px" }}
                        onClick={
                            () => {
                                setPage(2);
                            }
                        }>
                        Gérer les agences
                    </div>
                </div>
                <button className='btn'>
                    <Link to="/vols/add">
                        Ajouter
                    </Link>
                </button>
            </div>
            <div className='col-sm-12 container mt-3'>
                <div className='alert alert-secondary'>
                    Pages / Vols
                    <br />
                    <span>
                        Pages (
                        {
                            vols && vols.length > 0 ? vols.length : "Pas de données disponibles"
                        }
                        )
                    </span>
                </div>
            </div>
            <div className='col-sm-12 mt-5 container'>
                {
                    page === 1 ?
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ville de départ</th>
                                    <th>Ville de déstination</th>
                                    <th>Agence</th>
                                    <th>Heure départ et Heure arrivée</th>
                                    <th>Prix</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vols && vols.length > 0 ?
                                        vols.map((val, i) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td>{i + 1}</td>
                                                    <td>{val.villeDepart}</td>
                                                    <td>{val.villeDest}</td>
                                                    <td className='imageTextAgence'>
                                                        <img src={baseUrlImage + "/" + val.url} alt="" />
                                                        <span>{val.agence}</span>
                                                    </td>
                                                    <td> <span>1 scale </span> <br />
                                                        {val.heureDepart} ---  {val.heureArrivee}
                                                    </td>
                                                    <td>{val.prix}$</td>
                                                    <td className='icons'>
                                                        <Link to={{ pathname: "/vols/add" }} state={{ val: val }}>
                                                            <FiEdit2 color='#111' style={{ cursor: "pointer" }} />
                                                        </Link>
                                                        <FiTrash2 style={{ cursor: "pointer" }} onClick={() => deleItem(val.id)} />
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr key="">
                                            <td colSpan="7px" className='text-center'>
                                                Pas de donées disponibles
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        : "GESTION AGENCES"
                }
            </div>
        </div>
    )
}

export default Admin