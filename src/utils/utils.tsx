import { Reservation } from "../types/types";

export const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export const formatDateTimeMex = (dateTime: string | null) => {
    if (!dateTime) return { date: "N/A", time: "" };
    const date = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return {
        date: date.toLocaleDateString("es-ES", optionsDate),
        time: date.toLocaleTimeString("es-ES", optionsTime),
    };
};

export const formatDateTimeUS = (dateTime: string | null) => {
    if (!dateTime) return { date: "N/A", time: "" };
    const date = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return {
        date: date.toLocaleDateString('en-US', optionsDate),
        time: date.toLocaleTimeString('en-US', optionsTime)
    };
};

export const toUTCString = (dateTime: string) => {
    const date = new Date(dateTime);
    const localTime = date.getTime() - date.getTimezoneOffset() * 60000;
    return new Date(localTime).toISOString();
};

export const getStatusColor = (estado: string) => {
    switch (estado) {
        case "Aceptada":
            return "#00A86B";
        case "Disponible":
            return "#00A86B"
        case "Completado":
            return "#0052cc";
        case "Pagado":
            return "#00A86B";
        case "Pendiente":
            return "#ffcc00";
        case "Revision":
            return "#ffcc00";
        case "Cancelado":
            return "#FF4D4F";
        default:
            return "gray";
    }
};

export const translateStatus = (status: string) => {
    switch (status) {
        case "Aceptada":
            return "Available";
        case "Disponible":
            return "Available";
        case "Completado":
            return "Completed";
        case "Pagado":
            return "Successful Reservation";
        case "Pendiente":
            return "Pending";
        case "Cancelado":
            return "Canceled";
        default:
            return status;
    }
}

export const translateType = (type: string) => {
    switch (type) {
        case "Cotizacion":
            return "Quote";
        case "Reservacion":
            return "Reservation";
        default:
            return type;
    }
}

export const classifyReservations = (reservations: Reservation[]) => {
    const sortedReservations = reservations.sort((a, b) => {
        const dateA = new Date(a.fechaSalida || a.fechaRegreso).getTime();
        const dateB = new Date(b.fechaSalida || b.fechaRegreso).getTime();
        return dateA - dateB;
    });

    return sortedReservations.reduce((acc: any, reservation: Reservation) => {
        const status = reservation.estado;
        if (status === "Pagado") {
            if (!acc["Por hacer"]) {
                acc["Por hacer"] = [];
            }
            acc["Por hacer"].push(reservation);
        } else if (status === "Completado") {
            if (!acc["Completadas"]) {
                acc["Completadas"] = [];
            }
            acc["Completadas"].push(reservation);
        } else if (status === "Cancelado") {
            if (!acc["Canceladas"]) {
                acc["Canceladas"] = [];
            }
            acc["Canceladas"].push(reservation);
        }
        return acc;
    }, {});
};
