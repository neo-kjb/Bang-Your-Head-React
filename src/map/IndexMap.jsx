import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "./Map.module.css";
import { getLngLat } from "../utils/getLngLat";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5hczE3OTMiLCJhIjoiY2xjM3pvaHhsMDdiazN2cDZuMHNkMzZ6cSJ9.zor0NwKR53EElrGFrhdbHw";

function IndexMap({ concerts }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-96, 37.8],
      zoom: 3,
    });

    concerts.map((concert) => {
      const markers = getLngLat(concert.location).then((res) => {
        new mapboxgl.Marker()
          .setLngLat([res.lng, res.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;padding: 1rem;"><h3>${concert.title}</h3><p>${concert.description}</p></div>`
            )
          )
          .addTo(map.current);
      });
      return markers;
    });
  });

  return (
    <div className="mb-6">
      <div ref={mapContainer} className={styles.container} />
    </div>
  );
}

export default IndexMap;
