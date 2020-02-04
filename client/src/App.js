import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listLogEntries } from './API';
import MarkerIcon from './marker';

function App() {
  const [logEntries, setlogEntries] = useState([]);
  const [ShowPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 18.5943386,
    longitude: 73.9569336,
    zoom: 8
  });

  useEffect(() => {
    (async () => {
      const logEntries  = await listLogEntries();
      console.log(logEntries);
      setlogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={"mapbox://styles/vaibhavgc/ck67qh2mz0me81inlsiwllreu"}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={setViewport}
    >
      {logEntries.map(entry => (
        <React.Fragment key={entry._id}>
          <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-20} offsetTop={-10}>
            <div
              onClick={() => {
                setShowPopup({
                // ...ShowPopup,
                [entry._id]: true
                });
              }}
              style={{color: 'yellow'}}>{entry.title}</div>
            <MarkerIcon />
          </Marker>

          { ShowPopup[entry._id] ? (<Popup
                latitude={entry.latitude}
                dynamicPosition={true}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({})}
                anchor="top">
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                </div>
              </Popup>)
          : null }
        </React.Fragment>
      ))}

    </ReactMapGL>
  );
}

export default App;
