import { Alert, Snackbar, TextField } from "@mui/material";
import { useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import { api } from "../../Utils/Common";
import SearchUser from "./components/SearchUser";
import "./_search.scss"

function Search() {

    const [search, setSearch] = useState("");
    const [searchUser, setSearchUser] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            api.get('/users/search/' + search, {
                headers: {
                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res.data)
                getUser(res.data, (err, res) => {
                    if(err) return err
                    console.log(res)
                    setSearchUser(res.data)
                })
            }).catch(err => {
                setError(err.response.data.message)
                setSearchUser(null)
            })
        }
    }

    const getUser = (id, cb) => {
        api.get('/users/' + id, {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            return cb(null, res)
        }).catch(err => {
            return cb(err, null)
        })
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
                {searchUser && (
                    <div className="searchUser">
                        <SearchUser
                            className="i"
                            id={searchUser.id}
                            avatarUri={searchUser.avatar}
                            username={searchUser.username}
                            bio={searchUser.bio}
                            btnClick={() => { // Handler
                                api.post(`/users/${searchUser.id}/follow`, {}, {
                                    headers: {
                                        "authorization": 'Bearer ' + sessionStorage.getItem('token')
                                    }
                                }).then(res => {
                                    if(res.status === 200) return setSuccess("Successfully sent follow request to " + searchUser.username + "!")
                                }).catch(err => {
                                    if(err) setError(err.response.data.message)
                                    
                                })
                            }}
                            />
                    </div>
                )}
                {error && (
                    <Snackbar variant="filled" open={error} autoHideDuration={6000} onClose={() => setError(null)}>
                        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
                {success && (
                    <Snackbar variant="filled" open={success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
                        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
                            {success}
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </>
    );
    
}

export default Search;