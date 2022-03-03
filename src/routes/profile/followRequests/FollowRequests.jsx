import { useEffect, useState } from "preact/hooks"
import { api } from "../../../Utils/Common"
import Request from "./Request"
import "./followRequests.scss"

function FollowRequests() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const [requests, setRequests] = useState([])

    const getUser = (id) => {
        api.get('/users/' + id, {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setLoading(false)
            console.log(res.data.username)
            return res
        }).catch(err => {
            return err
        })
    }

    useEffect(() => {
        api.get('/users/@me/followers/requests', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then((res) => setUsers(res.data)).catch(err => {
            if(err.response) return console.error(err.response)
            // console.error(err)
        }).then(() => console.log('AAA: ' + users))
    }, [])

    // if(loading) return (<h1>Loading...</h1>)
    if(!requests.length) return (<></>)
    return (
        <div className="requests">
            {requests && requests.map((val, key) => {
                <h1>{val}</h1>
            })}
            {users.map((val, key) => (
                <>
                        <Request username={getUser(val.requesterId)} key={key} />
                    
                </>
                
                
            ))}
            
        </div>
    );
}

export default FollowRequests;