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
    else if(status == "dnd")
        return (
            <div className="dndStatus" />
        );
}

export default StatusShower;