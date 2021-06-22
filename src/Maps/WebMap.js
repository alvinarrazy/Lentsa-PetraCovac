import React, { useRef, useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";


function App() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const webmap = new WebMap({
        portalItem: {
          id: "cf951094cb3f48b29b5f37ed9592ced2"
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
