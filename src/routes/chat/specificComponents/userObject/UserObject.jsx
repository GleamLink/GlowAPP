import { Avatar } from "@mui/material";
import './_userobject.scss'

function UserObject(props) {
    console.log(props.user.avatar)
    return (
        <div className="userContainer">
            <Avatar sx={{ width: 24, height: 24 }} src={ props.avatarUrl } />
            <p className="username">{ props.user.username }</p>
        </div>
            
        
    );
}

export default UserObject;