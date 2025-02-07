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

export { AdminLogin }