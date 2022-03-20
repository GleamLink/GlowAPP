import { useRef, useState, useEffect } from "preact/hooks"
// import Peer from "simple-peer"
import NavBar from "../../components/navbar/NavBar"
import "./_voiceChat.scss"

function VoiceChat({socket}) {

    // const [user, setUser] = useState("")
    // const [stream, setStream] = useState()
    // const [receivingCall, setReceivingCall] = useState(false)
    // const [caller, setCaller] = useState("")
    // const [callerSignal, setCallerSignal] = useState()
    // const [callAccepter, setCallAccepted] = useState(false)
    // const [idToCall, setIdToCall] = useState("")
    // const [callEnded, setCallEnded] = useState(false)
    // const [name, setName] = useState("")

    // const myVideo = useRef()
    // const userVideo = useRef()
    // const connectionRef = useRef()

    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({
    //         video: true,
    //         audio: true
    //     }).then(stream => {
    //         setStream(stream)
    //         myVideo.current.srcObject = stream
    //     })

    //     socket.on("me", id => {
    //         setUser(id)
    //     })

    //     socket.on("callUser", data => {
    //         setReceivingCall(true)
    //         setCaller(data.from)
    //         setName(data.name)
    //         setCallerSignal(data.signal)
    //     })

    // }, [])

    // const callUser = id => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream
    //     })

    //     peer.on("signal", data => {
    //         socket.emit("callUser", {
    //             userToCall: id,
    //             signalData: data,
    //             from: user,
    //             name: name
    //         })
    //     })

    //     peer.on("stream", stream => {
    //         userVideo.current.srcObject = stream
    //     })

    //     socket.on("callAccepted", signal => {
    //         setCallAccepted(true)
    //         peer.signal(signal)
    //     })

    //     connectionRef.current = peer
    // }

    // const answerCall = () => {
    //     setCallAccepted(true)
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream
    //     })

    //     peer.on("signal", data => {
    //         socket.emit("answerCall", {
    //             signal: data,
    //             to: caller
    //         })
    //     })

    //     peer.on("stream", stream => {
    //         userVideo.current.srcObject = stream
    //     })

    //     peer.signal(callerSignal)
    //     connectionRef.current = peer
    // }

    // const leaveCall = () => {
    //     setCallEnded(true)
    //     connectionRef.current.destroy()
    // }

    return (
        <>
            <NavBar />
            <div className="container">
                {/* <div className="videoContainer">
                    <div className="video">
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />:
                            null
                        }
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default VoiceChat;