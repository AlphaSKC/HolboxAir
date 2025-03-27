import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const GetCotizaciones = async () => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.get(`${apiURL}/Cotizacion`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.get(`${apiURL}/Reservacion`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const CreateReservacion = async (data: any) => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.post(`${apiURL}/Reservacion`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const ChangeStatusReservacion = async (id: number, status: any) => {
    try {
        const response = await axios.put(`${apiURL}/Reservacion/ChangeStatus/${id}`, status);
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

const GetDeals = async () => {
    try {
        const response = await axios.get(`${apiURL}/Oferta`);
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const CreateOferta = async (data: any) => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.post(`${apiURL}/Oferta`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const ChangeStatusOfertaCreada = async (reservacionID: number) => {
    try {
        const response = await axios.put(`${apiURL}/Reservacion/${reservacionID}`);
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const ConfirmFlight = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Vuelo/ConfirmFlight`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const SendEmailReservation = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Reservacion/SendEmailReservation`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const GetAllCostos = async () => {
    try {
        const response = await axios.get(`${apiURL}/Costo`);
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const UpdateCostos = async (data: any) => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.put(`${apiURL}/Costo/ActualizarCostos`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const GetPassengersByDeal = async(id:number) => {
    try {
        const response = await axios.get(`${apiURL}/ReservacionOferta/Pasajeros/${id}`);
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const UpdateDeal = async (id: number, data: any) => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.put(`${apiURL}/Oferta/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const DeleteDeal = async (id: number) => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.delete(`${apiURL}/Oferta/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const GetGeneralStats = async () => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.get(`${apiURL}/Dashboard/GeneralStats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

const GetDashboardGraphs = async () => {
    try {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        const token = profile.token;
        const response = await axios.get(`${apiURL}/Dashboard/DashboardGraphs`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.result;
    }
    catch (error) {
        console.log(error);
    }
}

export {
    ChangeStatusCotizacion, GetCotizaciones,
    ChangeDateCotizacion, CreateReservacion,
    ChangeStatusReservacion, ConfirmFlight,
    GetReservaciones, SendEmailChangeDate,
    SendEmailConfirmationQuote, CreateOferta,
    ChangeStatusOfertaCreada, GetDeals,
    SendEmailReservation, UpdateCostos,
    GetAllCostos, UpdateDeal, DeleteDeal,
    GetPassengersByDeal, GetGeneralStats,
    GetDashboardGraphs
};