import React, { useState, useCallback, useMemo } from "react";
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import * as pmtiles from "pmtiles";
import mapStyle from "./style.json";
import precintsGeoJSON from "./precincts.json";
import "maplibre-gl/dist/maplibre-gl.css";
import layers from "protomaps-themes-base";

let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const MapComponent = ({ electionData }) => {
  const [hoverInfo, setHoverInfo] = useState(null);

  const dataLayer = {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": {
        property: "percentile",
        stops: [
          [0, "#3288bd"],
          [1, "#66c2a5"],
          [2, "#abdda4"],
          [3, "#e6f598"],
          [4, "#ffffbf"],
          [5, "#fee08b"],
          [6, "#fdae61"],
          [7, "#f46d43"],
          [8, "#d53e4f"],
        ],
      },
      "fill-opacity": 0.8,
    },
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatPercent = (num) => {
    return new Intl.NumberFormat("en-US", { style: "percent" }).format(num);
  };

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    if (hoveredFeature) {
      const ward = Number(hoveredFeature["properties"]["ward"]).toString();
      const precinct = Number(hoveredFeature["properties"]["precinct"]).toString();
  
      const precinctData = electionData['wards'][ward]['precincts'][precinct];

      console.log(precinctData)
      
      setHoverInfo({
        x,
        y,
        registered: precinctData['registered'],
        ballots: precinctData['ballots'],
        turnout: precinctData['turnout'],
        votesJohnson: precinctData['votesJohnson'],
        percentJohnson: precinctData['percentJohnson'],
        votesVallas: precinctData['votesVallas'],
        percentVallas: precinctData['percentVallas'],
      });
    }

    // prettier-ignore
    //setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  return (
    <Map
      style={{
        aspectRatio: "4/3",
      }}
      mapLib={maplibregl}
      showTileBoundaries={true}
      minZoom={2}
      maxZoom={20}
      initialViewState={{
        latitude: 41.88193181401557,
        longitude: -87.63110696995285,
        zoom: 9.5,
        pitch: 0,
        bearing: 0,
      }}
      onMouseMove={onHover}
      interactiveLayerIds={["data"]}
      renderWorldCopies={true}
      mapStyle={{
        id: "43f36e14-e3f5-43c1-84c0-50a9c80dc5c7",
        name: "MapLibre",
        zoom: 0,
        pitch: 0,
        center: [41.88193181401557, -87.63110696995285],
        glyphs:
          "https://cdn.jsdelivr.net/gh/piemadd/fonts@54b954f510dc79e04ae47068c5c1f2ee39a69216/_output/{fontstack}/{range}.pbf",
        layers: layers("protomaps", "light"),
        bearing: 0,
        sources: {
          protomaps: {
            type: "vector",
            tiles: [
              "https://tilea.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              "https://tileb.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              "https://tilec.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              "https://tiled.piemadd.com/tiles/{z}/{x}/{y}.mvt",
              //"http://10.0.0.237:8081/basemap/{z}/{x}/{y}.mvt"
            ],
            maxzoom: 13,
          },
        },
        version: 8,
        metadata: {},
      }}
    >
      <Source type='geojson' data={precintsGeoJSON}>
        <Layer {...dataLayer} />
      </Source>
      {hoverInfo && (
        <div
          className='tooltip'
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>Registered Voters: {formatNumber(hoverInfo.registered)}</div>
          <div>Ballots Cast: {formatNumber(hoverInfo.ballots)}</div>
          <div>Turnout: {formatPercent(hoverInfo.turnout)}</div>
          <div>---</div>
          <div>
            Brandon Johnson: {formatNumber(hoverInfo.votesJohnson)} (
            {formatPercent(hoverInfo.percentJohnson)})
          </div>
          <div>
            Paul Vallas: {formatNumber(hoverInfo.votesVallas)} (
            {formatPercent(hoverInfo.percentVallas)})
          </div>
        </div>
      )}

      <NavigationControl visualizePitch={true} />
      <FullscreenControl />
      <div className='map-over'>
        <div className='attribution'>
          <a href='https://protomaps.com'>Protomaps</a>
          {" | "}
          <a href='https://openstreetmap.org/copyright'>© OpenStreetMap</a>
          {" | "}
          <span>© Amtraker Tiles</span>
        </div>
      </div>
    </Map>
  );
};

export default MapComponent;
