
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import parkData from "./data/skateboard-parks.json"

function App() {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10
  })

  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    const listener = (e)=>{
      if(e.key === "Escape"){
        setSelectedPark(null)
      }
    }
    window.addEventListener("keydown", listener)

    return ()=>{
      window.removeEventListener("keydown", listener)
    }
  }, [])

  return (
    <>
      <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} onViewportChange={viewport=>{setViewport(viewport)}} mapStyle="mapbox://styles/stephendoty826/ckx6yv1f62q3g14ntv3vdlo8i">
        {parkData.features.map(park=>{
          return (
            <Marker key={park.properties.PARK_ID} longitude={park.geometry.coordinates[0]} latitude={park.geometry.coordinates[1]}>
            <button className="marker-btn" onClick={()=>setSelectedPark(park)}>
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
          )
        })}
        {selectedPark 
        ?
          <Popup longitude={selectedPark.geometry.coordinates[0]} latitude={selectedPark.geometry.coordinates[1]} onClose={()=>setSelectedPark(null)}>
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        :
          null
        }
      </ReactMapGL>
    </>
  )
}

export default App
