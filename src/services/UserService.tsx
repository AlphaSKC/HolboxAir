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
        const response = await axios.get(`https://localhost:7278/Cotizacion`);
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

export { CreateCotizacion, GetCotizaciones };