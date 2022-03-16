import NavBar from "../../components/navbar/NavBar";
import "./_home.scss";

// Material Icons
import { Publish } from '@mui/icons-material';

import { api } from "../../Utils/Common";
import { useEffect } from "preact/hooks";

function Home() {

    useEffect(() => {
        api.get("/auth/account", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            this.setState({
                user: res.data
            })
        })
    }, [])
    
    
    return (
        <div className="home">
            <NavBar />
            <div className="homePage">
                <div className="centerPage">
                    <div className="sendPost">
                        <input className="input" placeholder="Create a post..." />
                        <Publish className="icon" title="Hey" />
                    </div>
                    <div className="post">

                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Home;