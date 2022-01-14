import "./_statusshower.scss"

function StatusShower(props) {
    const status = props.status
    if(status == "online")
        return (
            <div className="onlineStatus" />
        );
    else if(status == "offline")
        return (
            <div className="offlineStatus" />
        );
}

export default StatusShower;