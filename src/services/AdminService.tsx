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

const SendEmailConfirmationQuote = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Cotizacion/ConfirmationQuote`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const SendEmailChangeDate = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Cotizacion/ChangeDateQuote`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const CreateOferta = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Oferta`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const ChangeStatusOfertaCreada = async (reservacionID: number) => {
    try {
        const response = await axios.put(`${apiURL}/Reservacion/${reservacionID}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export { ChangeStatusCotizacion, GetCotizaciones, ChangeDateCotizacion, CreateReservacion, GetReservaciones, SendEmailChangeDate, SendEmailConfirmationQuote, CreateOferta, ChangeStatusOfertaCreada };