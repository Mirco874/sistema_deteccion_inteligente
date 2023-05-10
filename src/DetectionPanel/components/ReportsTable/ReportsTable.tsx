import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { sistemaDeteccionApi } from "../../../api";
import { JWTDecoder, validateJwtSession } from "../../../utils";
import { useCallback, useEffect, useState } from "react";
import { Report } from "../../../interfaces";


const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 10 },
    {
        field: "Image",
        headerName: "Imagen",
        width: 220,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
            <Box component="img" src="https://cdn-icons-png.flaticon.com/512/864/864491.png" height="50px" width="50px"/>
        )
    },
    {
        field: "camera",
        headerName: "Cámara",
        width: 170,
        sortable: false,
    },
    {
        field: "detection",
        headerName: "Evento",
        width: 170,
        sortable: false,
    },
    {
        field: "confidence",
        headerName: "Confianza",
        width: 170,
        sortable: false,
    },
    {
        field: "timeStamp",
        headerName: "Fecha y hora",
        width: 140,
        sortable: false
    },
    {
        field: "options",
        headerName: "Options",
        width: 120,
        renderCell: (params: GridRenderCellParams) => (
            <>
            <Button>Eliminar</Button>
            </>
        )
    }
];


export const ReportsTable = () => {

    const [reports, setReports] = useState<Report[]>([]);
    const [rows, setRows] = useState([]);


    const getReports = useCallback( async() => {
        const { id } = JWTDecoder.decodeSavedToken();
        const { data } = await sistemaDeteccionApi.get(`api/v1/report?userId=${id}`, validateJwtSession.getHeaders())
        setReports(data.data)
    },[])

    useEffect(()=>{
        getReports()
    },[getReports])

    useEffect(()=>{

        const newRows = reports.map((report: Report) => ({
            id: report.id,
            Image: report.imageURL,
            camera: report.cameraName,
            detection: report.detection,
            confidence: report.confidence,
            timeStamp: report.timeStamp,
        }))

        setRows(newRows);
    },[reports])

    


  return (
    <Box className="reports-table">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                rowHeight={80}
                pageSizeOptions={[7]}
            />
        </Box>
  )
}
