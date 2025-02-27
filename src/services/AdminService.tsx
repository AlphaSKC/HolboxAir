import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const GetCotizaciones = async () => {
    try {
        const response = await axios.get(`${apiURL}/Cotizacion`);
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const ChangeStatusCotizacion = async (id: number, status: any) => {
    try {
        const response = await axios.put(`${apiURL}/Cotizacion/${id}`, status);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const ChangeDateCotizacion = async (id: number, data: any) => {
    try {
        const response = await axios.put(`${apiURL}/Cotizacion/ChangeDate/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const GetReservaciones = async () => {
    try {
        const response = await axios.get(`${apiURL}/Reservacion`);
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const CreateReservacion = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Reservacion`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export { ChangeStatusCotizacion, GetCotizaciones, ChangeDateCotizacion, CreateReservacion, GetReservaciones };