import "./_statusshower.scss"

function StatusShower(props) {
    const status = props.status
    const big = props.big
    if(status == "online") {
        if(big) {
            return (
                <div className="onlineStatus" style={`width: 17px; height: 17px`} />
            )
        } 
        else
        {
            return (
                <div className="onlineStatus" style={`width: 10px; height: 10px`} />
            )
        }
    }
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