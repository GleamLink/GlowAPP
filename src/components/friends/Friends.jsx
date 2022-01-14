import StatusShower from "../statusshower/StatusShower";
import "./_friends.scss"

import MessageIcon from '@material-ui/icons/Message';

function Friends(props) {
    return (
        <div className="friend">
            <img className="profilePicture" src={props.avatarUrl} alt="" />
            <StatusShower status={props.status} />
            <p className="profileName">{props.username}</p>
            <MessageIcon className="messageSend" />
        </div>
    );
}

export default Friends;