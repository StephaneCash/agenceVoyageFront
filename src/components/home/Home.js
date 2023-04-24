import React, { useEffect, useState } from 'react';
import './Home.css';
import { Country, City } from 'country-state-city';
import axios from 'axios';
import { baseUrl, baseUrlImage } from '../../bases/basesUrl';
import { BsFillEmojiFrownFill } from "react-icons/bs"

const Home = () => {

  const [paysDepart, setPaysDepart] = useState("");
  const [villeDepart, setVilleDepart] = useState("");

  const [paysDest, setPaysDest] = useState("");
  const [villeDest, setVilleDest] = useState("");

  const [clic, setClic] = useState(false)

  const [vols, setVols] = useState([]);

  const getData = () => {
    axios.get(`${baseUrl}/vols`)
      .then(res => {
        setVols(res.data);
      })
      .catch(err => {
        console.log(err.response)
      })
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = () => {
    setClic(true)
  };

  return (
    <div className='home section'>
      <div className='col-sm-12 textContent'>
        <div className='row'>
          <div className='col-sm-6'>
            <h4 className='title'>Où voulez-vous partir ?</h4>
          </div>
          <div className='col-sm-6'>
            <div>
              Pays de départ : {
                Country.getAllCountries().map((val, i) => {
                  if (val.isoCode === paysDepart)
                    return <span key={i} className='text-primary'>{val.name} </span>
                })
              },
              {villeDepart && " Ville de départ "} : <span className='text-primary'>{villeDepart}</span>
            </div>
            <div className='mt-3'>
              Pays de déstination : {
                Country.getAllCountries().map((val, i) => {
                  if (val.isoCode === paysDest)
                    return <span key={i} className='text-primary'>{val.name} </span>
                })
              },
              {villeDest && " Ville de déstination "} : <span className='text-primary'>{villeDest}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='main'>
        <div className='col-sm-12'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='col-sm-12'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <select className='form-control'>
                      <option value="aller-simple" >Aller simple</option>
                      <option value="aller-retour" >Aller-retour</option>
                      <option value="multidestinations" >Multidestinations</option>
                    </select>
                  </div>
                  <div className='col-sm-6'>
                    <select className='form-control'>
                      <option value="adulte" >Adulte</option>
                      <option value="etudiant" >Etudiants</option>
                      <option value="ado" >Ado</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='col-sm-12 mt-3'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label>Pays de départ</label>
                    <select className='form-control' onChange={(e) => setPaysDepart(e.target.value)}>
                      {
                        Country.getAllCountries().map((val, i) => {
                          return <option value={val.isoCode} key={i}>{val.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className='col-sm-6'>
                    <label>Ville de départ</label>
                    <select className='form-control' onChange={(e) => setVilleDepart(e.target.value)}>
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
              </div>

              <div className='col-sm-12 mt-3'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label>Pays de déstination</label>
                    <select className='form-control' onChange={(e) => setPaysDest(e.target.value)}>
                      {
                        Country.getAllCountries().map((val, i) => {
                          return <option value={val.isoCode} key={i}>{val.name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className='col-sm-6'>
                    <label>Ville de déstination</label>
                    <select className='form-control' onChange={(e) => setVilleDest(e.target.value)}>
                      {
                        !paysDest && <option value="">--Choisir une ville--</option>
                      }
                      {
                        paysDest && City.getAllCities().map((val, i) => {
                          if (val.countryCode === paysDest) {
                            return <option key={i}>{val.name}</option>
                          }
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className='col-sm-12 mt-3'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label>Du </label>
                    <input type="date" className='form-control' />
                  </div>

                  <div className='col-sm-6'>
                    <label>Au</label>
                    <input type="date" className='form-control' />
                  </div>
                </div>
              </div>

              <div className='col-sm-12'>
                <div className='row'>
                  <div className='col-sm-6 mt-3'>
                    <button className='btn' onClick={handleSearch}>Rechercher</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6 answers'>
              <div className='card cards'>
                {
                  clic && vols && vols.length > 0 ?
                    vols.filter(vol => {
                      let villeDestSearch = vol && vol.villeDest && vol.villeDest;
                      let villeDepartSearch = vol && vol.villeDepart && vol.villeDepart;
                      return villeDestSearch.includes(villeDest) || villeDepartSearch.includes(villeDepart)
                    })
                      .map(val => {
                        return <div className='card' key={val.id}>
                          <table className='table table-bordered'>
                            <tbody>
                              <tr>
                                <td style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}>
                                  <img style={{ height: "70px", width: "70px", borderRadius: "150px", border: "1px solid #ddd" }} src={baseUrlImage + "/" + val.url} alt="" />
                                  <div>
                                    <span>{val.agence}</span>
                                    <div className='text-primary'>Notre prix le prix bas</div>
                                  </div>
                                </td>
                                <td>{val.villeDepart}, {val.heureDepart}---{val.heureArrivee} {val.villeDest}</td>
                                <td>Temps en route: {val.maxHeure}</td>
                                <td>Prix : {val.prix}</td>
                              </tr>
                              <td className='mt-1 p-2'>
                                <button className='btn btn-success p-2'>Détail</button>
                              </td>
                            </tbody>
                          </table>
                        </div>
                      })
                    : <div className='searchVide'>
                      <div>Rien trouvé de votre recherche.</div>
                      <BsFillEmojiFrownFill />
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home