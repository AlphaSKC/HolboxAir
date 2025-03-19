import { Box, Button, CircularProgress, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllCostos, UpdateCostos } from "../../../services/AdminService";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AlertSnackbar from "../../general/AlertSnackbar";

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-primary': {
        fill: '#3D4751',
        ...theme.applyStyles('light', {
            fill: '#AEB8C2',
        }),
    },
    '& .no-rows-secondary': {
        fill: '#1D2126',
        ...theme.applyStyles('light', {
            fill: '#E8EAED',
        }),
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={96}
                viewBox="0 0 452 257"
                aria-hidden
                focusable="false"
            >
                <path
                    className="no-rows-primary"
                    d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
                />
                <path
                    className="no-rows-primary"
                    d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
                />
                <path
                    className="no-rows-secondary"
                    d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
                />
            </svg>
            <Box sx={{ mt: 2 }}>No rows</Box>
        </StyledGridOverlay>
    );
}

type Precio = {
    costoID: number;
    origen: string;
    destino: string;
    capacidadAvioneta: number;
    precio: number;
};

type UpdatedPrices = {
    [key: string]: number;
};

export default function PricesList() {
    const [prices, setPrices] = useState<Precio[]>([]);
    const [loading, setLoading] = useState(true);
    const [modifiedRows, setModifiedRows] = useState(new Set()); // IDs de filas modificadas
    const [updatedPrices, setUpdatedPrices] = useState<UpdatedPrices>({});

    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState<string>("");

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        try {
            const response = await GetAllCostos();
            setPrices(response);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const columns: GridColDef[] = [
        { field: 'costoID', headerName: 'ID', width: 90, align: "center", headerAlign: "center" },
        { field: 'origen', headerName: 'Origen', width: 150, align: "center", headerAlign: "center" },
        { field: 'destino', headerName: 'Destino', width: 150, align: "center", headerAlign: "center" },
        { field: 'capacidadAvioneta', headerName: 'Capacidad', width: 150, align: "center", headerAlign: "center" },
        {
            field: 'precio',
            headerName: 'Precio',
            width: 150,
            align: "center",
            headerAlign: "center",
            editable: true,
            type: 'number',
        }
    ];

    const handleCellEditCommit = (params: { id: any; field: any; value: any; }) => {
        const { id, field, value } = params;

        if (field === 'precio') {
            setUpdatedPrices((prev) => ({
                ...prev,
                [id]: value
            }));

            setModifiedRows((prev) => new Set(prev).add(id));

            const updatedRow = prices.find((row) => row.costoID === id);

            if (updatedRow) {
                const { origen, destino } = updatedRow;

                const reverseRoute = prices.find((row) => row.origen === destino && row.destino === origen);

                if (reverseRoute) {
                    setUpdatedPrices((prev) => ({
                        ...prev,
                        [reverseRoute.costoID]: value
                    }));
                    setModifiedRows((prev) => new Set(prev).add(reverseRoute.costoID));
                }
            }
        }
    };

    const saveChanges = async () => {
        try {
            const changes = Object.keys(updatedPrices).map((id) => ({
                costoID: Number(id),
                nuevoPrecio: updatedPrices[id]
            }));

            if (changes.length === 0) {
                setAlertMessage("No hay cambios para guardar");
                setAlertSeverity("error");
                return;
            }

            const response = await UpdateCostos(changes);
            if (response.success) {
                setAlertMessage("Cambios guardados correctamente");
                setAlertSeverity("success");
            }
        }
        catch (error) {
            setAlertMessage("Error al guardar los cambios: " + error);
            setAlertSeverity("error");
        }
        finally {
            setAlertOpen(true);
            setModifiedRows(new Set());
            setUpdatedPrices({});
        }
    }

    const rows = prices.map((row) => ({
        ...row,
        precio: updatedPrices[row.costoID] || row.precio,
    }));

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#E68A00" }} className="Lato">
                Lista de Precios
            </Typography>

            <Box sx={{ width: { xs: '100%', md: '80%', lg: '50%' } }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
                        <CircularProgress sx={{ color: '#E68A00' }} />
                    </Box>
                ) : (
                    <>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.costoID}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 8 },
                                },
                            }}
                            slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                            pageSizeOptions={[8]}
                            processRowUpdate={(newRow, oldRow) => {
                                const updatedRow = { ...oldRow, ...newRow };
                                handleCellEditCommit({ id: updatedRow.costoID, field: 'precio', value: updatedRow.precio });
                                return updatedRow;
                            }}
                            sx={{
                                '& .MuiDataGrid-row': { transition: "background-color 0.3s ease" },
                                '& .modified': { backgroundColor: "#FFF59D" }
                            }}
                            getRowClassName={(params) =>
                                modifiedRows.has(params.id) ? "modified" : ""
                            }
                        />
                        <Button
                            variant="contained"
                            sx={{ mt: 3, bgcolor: '#E68A00' }}
                            onClick={saveChanges}
                            className="Lato"
                        >
                            Guardar Cambios
                        </Button>
                    </>
                )}
            </Box>
            <AlertSnackbar
                open={alertOpen}
                severity={alertSeverity}
                message={alertMessage}
                onClose={() => setAlertOpen(false)}
            />
        </Box>
    )
}