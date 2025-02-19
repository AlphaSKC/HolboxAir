import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const AdminLogin = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Administrador/Login`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const SendCode = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Administrador/ForgotPassword`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};


const VerifyCodePassword = async (data: any) => {
    try {
        const response = await axios.post(`${apiURL}/Codigo/VerificarCodigo`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const ChangePassword = async (data: any) => {
    try {
        const response = await axios.put(`${apiURL}/Administrador/ChangePassword`, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export { AdminLogin, SendCode, VerifyCodePassword, ChangePassword };