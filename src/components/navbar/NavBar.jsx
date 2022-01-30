import Option from "./option/Option";
import "./_navbar.scss"

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PeopleIcon from '@material-ui/icons/People';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';

import DehazeIcon from '@material-ui/icons/Dehaze';

import react from "react"
import { getToken, removeUserSession } from "../../Utils/Common";
import { useEffect } from "preact/hooks";


function NavBar() {

    const handleLogout = () => {
        removeUserSession()
        window.location.reload(false)
    }
    return (
        <>
            <div className="navBar">
                {/* <input type="checkbox" id="check">
                    <DehazeIcon className="checkBtn" />
                </input> */}
                <ul className="leftbarList">
                    <li>
                        <a href="/" className="leftbarListItem">
                            <HomeIcon className="icon"/>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/friends" className="leftbarListItem">
                            <PeopleAltIcon className="icon"/>
                            <span>Friends</span>
                        </a>
                    </li>
                    <li>
                        <a href="/posts" className="leftbarListItem">
                            <PhotoLibraryIcon className="icon"/>
                            <span>Posts</span>
                        </a>
                    </li>
                    <li>
                        <a href="/communities" className="leftbarListItem">
                            <PeopleIcon className="icon"/>
                            <span>Communities</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tunes" className="leftbarListItem">
                            <PlayCircleFilledIcon className="icon"/>
                            <span>Tunes</span>
                        </a>
                    </li>
                    {console.log(sessionStorage.getItem("token"))}
                    {getToken() ? (
                        <li>
                            <a className="leftbarListItem" onClick={handleLogout} style="float: right;">
                                <PlayCircleFilledIcon className="icon"/>
                                <span>Logout</span>
                            </a>
                        </li>
                    ): (<></>)}
                    
                </ul>
            </div>
        </>
        
    );
}

export default NavBar;