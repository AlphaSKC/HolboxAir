import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const CreateCotizacion = async (cotizacion: any) => {
  try {
    const response = await axios.post(`${apiURL}/Cotizacion`, cotizacion);
    return response.data;
  } catch (error) {}
};

const CreateReservacionOferta = async (reservacion: any) => {
  try {
    const response = await axios.post(`${apiURL}/ReservacionOferta`, reservacion);
    return response.data;
  } catch (error) {}
}

const GetCostos = async (origen: string, destino: string) => {
  try {
    const response = await axios.get(`${apiURL}/Costo/CostoVuelo?origen=${origen}&destino=${destino}`);
    return response.data;
  } catch (error) {}
};

const GetFlight = async (data: any) => {
  try {
    const response = await axios.post(`${apiURL}/Vuelo`, data);
    return response.data;
  } catch (error) {}
}

const GetFlightDetails = async (data: any) => {
  try {
    const response = await axios.post(`${apiURL}/Vuelo/DetallesVuelo`, data);
    return response.data;
  } catch (error) {}
}

const GetDollarPrice = async () => {
  try {
    const response = await axios.get(`${apiURL}/Vuelo/PrecioDolar`);
    return response.data;
  }
  catch (error) {}
}

const SendContactForm = async (data: any) => {
  try {
    const response = await axios.post(`${apiURL}/Contacto`, data);
    return response.data;
  } catch (error) {}
}

const GetPromotionsCodes = async () => {
  try {
    const response = await axios.get(`${apiURL}/CodigoDescuento`);
    return response.data;
  } catch (error) {}
}

const UsePromotionCode = async (codigo: string) => {
  try {
    const response = await axios.put(`${apiURL}/CodigoDescuento/Usar`, 
      codigo,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {}
}

export { CreateCotizacion, GetCostos, GetFlight, GetFlightDetails, GetDollarPrice, CreateReservacionOferta, SendContactForm, GetPromotionsCodes, UsePromotionCode};
