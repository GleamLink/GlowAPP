import StatusShower from "../statusshower/StatusShower";
import "./_cfriends.scss"

import MessageIcon from '@mui/icons-material/Message';

function CFriends(props) {
    return (
        <div className="friend">
            <img className="profilePicture" src={props.avatarUrl} alt="" />
            <StatusShower status={props.status} />
            <p className="profileName">{props.username}</p>
            <MessageIcon className="messageSend" />
        </div>
    );
}

export default CFriends;