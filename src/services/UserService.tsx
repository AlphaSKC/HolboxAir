import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const CreateCotizacion = async (cotizacion: any) => {
    try {
        const response = await axios.post(`${apiURL}/Cotizacion`, cotizacion);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const GetCotizaciones = async () => {
    try {
        const response = await axios.get(`${apiURL}/Cotizacion`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export { CreateCotizacion, GetCotizaciones };