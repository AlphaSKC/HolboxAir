import axios from "axios";

const AdminLogin = async (data: any) => {
    try {
        const response = await axios.post('https://localhost:7278/Administrador/Login', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const SendCode = async (data: any) => {
    try {
        const response = await axios.post('https://localhost:7278/Administrador/ForgotPassword', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};


const VerifyCode = async (data: any) => {
    try {
        const response = await axios.post('https://localhost:7278/Codigo/VerificarCodigo', data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export { AdminLogin, SendCode, VerifyCode };