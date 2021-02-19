import React, { useRef, useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

import "./App.css";

function App() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const webmap = new WebMap({
        portalItem: {
          id: "41281c51f9de45edaf1c8ed44bb10e30"
        }
      });
      const view = new MapView({
        container: mapDiv.current,
        map: webmap
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
