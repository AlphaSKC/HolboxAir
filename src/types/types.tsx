export interface Reservation {
    reservacionID: number;
    pasajeroPrincipal: string;
    correoPasajero: string;
    telefonoPasajero: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso: string;
    numeroPasajeros: number;
    precioTotal: number;
    codigoReservacion: string;
    notas: string[];
    fechaReserva: string;
    estado: string;
    ofertaCreada: boolean;
}

export interface Oferta {
    origen: string;
    destino: string;
    fechaSalida: string;
    disponibilidad: number;
    precio: number;
}

export interface Deal {
    ofertaID: number;
    origen: string;
    destino: string;
    fechaSalida: string;
    disponibilidad: number;
    precio: number;
}

export interface Quote {
    cotizacionID: number;
    pasajeroPrincipal: string;
    correoPasajero: string;
    telefonoPasajero: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso: string;
    numeroPasajeros: number;
    precioEstimado: number;
    estado: string;
    codigoCotizacion: string;
    fechaCreacion: string;
    notas: string[];
}

export interface FlightDetails {
    tipo: string;
    identificador: number;
    pasajeroPrincipal: string;
    correoPasajero: string;
    telefonoPasajero: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaRegreso?: string;
    numeroPasajeros: number;
    precio: number;
    estado: string;
    codigo: string;
    fechaCreacion: string;
    notas: string[];
    montoPagado?: number;
}

export interface GeneralStats {
    ingresosTotales: number;
    promedioIngreso: number;
    totalReservaciones: number;
    totalCotizaciones: number;
    tasaConversion: number;
}

export interface PromotionCode {
    codigoID: number;
    codigo: string;
    descuentoUSD: number;
    fechaInicio: string;
    fechaFin: string;
    usosTotales: number;
    usosRealizados: number;
    activo: boolean;
    creadoEl: string;
}

export const defaultReservation: Reservation = {
    reservacionID: 0,
    pasajeroPrincipal: "",
    correoPasajero: "",
    telefonoPasajero: "",
    origen: "",
    destino: "",
    fechaSalida: "",
    fechaRegreso: "",
    numeroPasajeros: 0,
    precioTotal: 0,
    codigoReservacion: "",
    notas: [],
    fechaReserva: "",
    estado: "",
    ofertaCreada: false,
};

export const defaultOferta: Oferta = {
    origen: "",
    destino: "",
    fechaSalida: "",
    disponibilidad: 1,
    precio: 0,
};

export const defaultDeal: Deal = {
    ofertaID: 0,
    origen: "",
    destino: "",
    fechaSalida: "",
    disponibilidad: 1,
    precio: 0,
}

export const defaulQuote: Quote = {
    cotizacionID: 0,
    pasajeroPrincipal: "",
    correoPasajero: "",
    telefonoPasajero: "",
    origen: "",
    destino: "",
    fechaSalida: "",
    fechaRegreso: "",
    numeroPasajeros: 0,
    precioEstimado: 0,
    estado: "",
    codigoCotizacion: "",
    fechaCreacion: "",
    notas: [],
};

export const defaultFlightDetails: FlightDetails = {
    tipo: "",
    identificador: 0,
    pasajeroPrincipal: "",
    correoPasajero: "",
    telefonoPasajero: "",
    origen: "",
    destino: "",
    fechaSalida: "",
    fechaRegreso: "",
    numeroPasajeros: 0,
    precio: 0,
    estado: "",
    codigo: "",
    fechaCreacion: "",
    notas: [],
    montoPagado: 0,
}