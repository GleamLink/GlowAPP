import Option from "./option/Option";
import "./_navbar.scss"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PeopleIcon from '@mui/icons-material/People';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

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
                            <a className="leftbarListItem" onClick={handleLogout} style={{float: "right"}}>
                                <LogoutIcon className="icon"/>
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