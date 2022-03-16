import NavBar from "../../components/navbar/NavBar";
import './admin.scss'
import { DataGrid } from '@mui/x-data-grid';

import { Dashboard, People } from '@mui/icons-material';
import Widget from "./widget/Widget";
import { useEffect, useState } from "preact/hooks";
import { api } from "../../Utils/Common";

const columns = [
    { field: 'id', headerName: 'User ID', width: 170 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'avatar', headerName: 'Avatar', sortable: false, width: 90 },
    { field: 'banner', headerName: 'Banner', sortable: false, width: 90 },
];

function Admin() {

    const [rows, setRows] = useState()
    const [refresh, setRefresh] = useState(1)

    useEffect(() => {
        api.get('/users', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => setRows(res.data))
        .catch(err => console.error(err))
    }, [refresh])

    return (
        <>
            <NavBar />
            <div className="adminPage">
                <div className="leftBar">
                    <div className="selectItem">
                        <Dashboard className="icon" />
                        <span>Dashboard</span>
                    </div>
                    <div className="selectItem">
                        <People className="icon" />
                        <span>Users</span>
                    </div>
                    
                </div>
                <div className="middlePage">
                    <input type="text" className="searchInput" onChange={e => {
                        if(e.target.value === "") return setRefresh(Math.random(10, 100000000))
                        api.get('users/search?searchUser=' + e.target.value, {
                            headers: {
                                "authorization": 'Bearer ' + sessionStorage.getItem('token')
                            }
                        }).then(res => {
                            console.log(res.data)
                            setRows(res.data)
                        })
                        .catch(err => console.log(err))
                    }}
                    />
                    <DataGrid
                        className="userList"
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    );
}

export default Admin;