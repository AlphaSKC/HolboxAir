import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const CreateCotizacion = async (cotizacion: any) => {
  try {
    const response = await axios.post(`${apiURL}/Cotizacion`, cotizacion);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const CreateReservacionOferta = async (reservacion: any) => {
  try {
    const response = await axios.post(`${apiURL}/ReservacionOferta`, reservacion);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const GetCostos = async (origen: string, destino: string) => {
  try {
    const response = await axios.get(`${apiURL}/Costo/CostoVuelo?origen=${origen}&destino=${destino}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const GetFlight = async (data: any) => {
  try {
    const response = await axios.post(`${apiURL}/Vuelo`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const GetFlightDetails = async (data: any) => {
  try {
    const response = await axios.post(`${apiURL}/Vuelo/DetallesVuelo`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const GetDollarPrice = async () => {
  try {
    const response = await axios.get(`${apiURL}/Vuelo/PrecioDolar`);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

const SendContactForm = async (data: any) => {
  try {
    const response = await axios.post(`${apiURL}/Contacto`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const GetPromotionsCodes = async () => {
  try {
    const response = await axios.get(`${apiURL}/CodigoDescuento`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const UsePromotionCode = async (codigo: string) => {
  try {
    const response = await axios.post(`${apiURL}/CodigoDescuento`, codigo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { CreateCotizacion, GetCostos, GetFlight, GetFlightDetails, GetDollarPrice, CreateReservacionOferta, SendContactForm, GetPromotionsCodes, UsePromotionCode};
