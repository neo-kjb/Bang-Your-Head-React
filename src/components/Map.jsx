import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "./Map.module.css";
import { getLngLat } from "../utils/getLngLat";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5hczE3OTMiLCJhIjoiY2xjM3pvaHhsMDdiazN2cDZuMHNkMzZ6cSJ9.zor0NwKR53EElrGFrhdbHw";

function Map({ location }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    getLngLat(location).then((res) => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [res.lng, res.lat],
        zoom: 9,
      });
      const marker = new mapboxgl.Marker()
        .setLngLat([res.lng, res.lat])
        .addTo(map.current);
    });
  });

  return (
    <div className="mb-6">
      <div ref={mapContainer} className={styles.container} />
    </div>
  );
}

export default Map;
