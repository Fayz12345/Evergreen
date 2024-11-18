import React, { Fragment } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const Map = (props) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBt4ZHWsJvPz5YmFoTvtBHS-wpY3L0OiVk">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={props.zoom}
        center={props.center}
      >
        {props.places.map((place) => (
          <Fragment key={place.id}>
            <Marker
              position={{
                lat: parseFloat(place.latitude),
                lng: parseFloat(place.longitude),
              }}
            />
            {place.circle && (
              <Circle
                center={{
                  lat: parseFloat(place.latitude),
                  lng: parseFloat(place.longitude),
                }}
                radius={place.circle.radius}
                options={place.circle.options}
              />
            )}
          </Fragment>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
