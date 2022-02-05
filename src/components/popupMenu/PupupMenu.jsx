import "./_popupmenu.scss"
import CloseIcon from '@mui/icons-material/Close';

function PopupMenu(props) {

    return (
        <div className="popupMenuContainer">
            <div className="popupMenu">
                <CloseIcon onClick={props.closeHandler} className="closeButton" fontSize="large"></CloseIcon>
                <h2>{ props.title }</h2>
                <div className="informations">
                    {props.array.map(e => {
                        return (
                            <>
                                <div className="inputContainer">
                                    <p className="infoTitle">{ e.title }</p>
                                    <input className="infoInput" type={ e.input.type } placeholder={ e.input.text } />
                                </div>
                                
                            </>
                        )
                    })}
                </div>
                <div className="btnContainer">
                    <button className="popupBtn">Confirm</button>
                </div>
                
                
            </div>
        </div>
    );
}

export default PopupMenu;