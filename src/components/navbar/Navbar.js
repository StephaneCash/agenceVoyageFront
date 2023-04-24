import React from 'react'
import { FaPlaneDeparture } from "react-icons/fa"
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{
            background: "#01357f",
        }}>
            <Link className="navbar-brand" to="/">
                <FaPlaneDeparture /> Vols</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Voyages disponibles</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pays</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar