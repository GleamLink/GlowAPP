import { Alert, Snackbar, TextField } from "@mui/material";
import { useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import { api } from "../../Utils/Common";
import "./_search.scss"

function Search() {

    const [search, setSearch] = useState("");
    const [searchUser, setSearchUser] = useState([])
    const [error, setError] = useState(null)

    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            api.get('/users/search/' + search, {
                headers: {
                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res.data)
                getUser(res.data, (err, res) => {

                })
            }).catch(err => {
                setError(err.response.data.message)
            })
        }
    }

    const getUser = (id, cb) => {
        api.get('/users/')
    }

    return (
        <>
            <NavBar />
            <div className="searchPage">
                <input 
                    className="searchInput"
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearch}
                />
                {error && (
                    <Snackbar variant="filled" open={error} autoHideDuration={6000} onClose={() => setError(null)}>
                        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
                {searchUser && (
                    <div className="user">
                        <p>{searchUser}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;