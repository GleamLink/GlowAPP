import "./_popupmenu.scss"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "preact/hooks";
import { api } from "../../Utils/Common";
import { Alert } from "@mui/material";

function PopupMenu(props) {
    const arr = []

    let dupChars = arr.filter((c, index) => {
        if(c === arr[index]) return arr
        return arr.indexOf(c) !== index;
    });

    return (
        <div className="popupMenuContainer">
            <div className="popupMenu">
                <CloseIcon onClick={props.closeHandler} className="closeButton" fontSize="large"></CloseIcon>
                <h2>{ props.title }</h2>
                <div className="informations">
                    {props.children}
                </div>
                <div className="btnContainer">
                    <button 
                        onClick={props.btnClickHandler} className="popupBtn">Confirm</button>
                </div>
            </div>

            
        </div>
    );
}

export default PopupMenu;