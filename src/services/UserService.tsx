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

export { CreateCotizacion };