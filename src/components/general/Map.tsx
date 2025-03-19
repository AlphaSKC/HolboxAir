
import { CircularProgress } from '@mui/material';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

interface MapProps {
    lat: number;
    lng: number;
}

export default function Map(props: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBqe3pRlgKbVmxyXYohjuVBW-Ib5RKxG-c',
    });

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    if (!isLoaded) {
        return <CircularProgress sx={{ color: "#E68A00" }} />;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: props.lat, lng: props.lng }}
            zoom={16}
        >
            <MarkerF position={{ lat: props.lat, lng: props.lng }} />
        </GoogleMap>
    );
}