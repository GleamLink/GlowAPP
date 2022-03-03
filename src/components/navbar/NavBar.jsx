import Option from "./option/Option";
import "./_navbar.scss"

import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import DehazeIcon from '@mui/icons-material/Dehaze';

import react from "react"
import { getToken, removeUserSession } from "../../Utils/Common";
import { useEffect, useState } from "preact/hooks";
import { Divider, Drawer, IconButton, SwipeableDrawer } from "@mui/material";
import { ChevronLeft, Notifications } from "@mui/icons-material";


function NavBar(props) {

    const [isResponsiveNavbarOpen, setNavbarOpen] = useState(false)

    const handleLogout = () => {
        removeUserSession()
        window.location.reload(false)
    }
    return (
        <>
            <div className="navBar">
                <ul className="navbarList">
                    <div className="computer">
                        <div className="leftSide">
                            <li>
                                <a href="/" className="navbarListItem">
                                    <HomeIcon className="icon"/>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="/search" className="navbarListItem">
                                    <SearchIcon className="icon"/>
                                    <span>Search</span>
                                </a>
                            </li>
                            <li>
                                <a href="/chat" className="navbarListItem">
                                    <ChatIcon className="icon"/>
                                    <span>Chat</span>
                                </a>
                            </li>
                            <li>
                                <a href="/posts" className="navbarListItem">
                                    <PhotoLibraryIcon className="icon"/>
                                    <span>Posts</span>
                                </a>
                            </li>
                            <li>
                                <a href="/communities" className="navbarListItem">
                                    <PeopleIcon className="icon"/>
                                    <span>Communities</span>
                                </a>
                            </li>
                            <li>
                                <a href="/tunes" className="navbarListItem">
                                    <PlayCircleFilledIcon className="icon"/>
                                    <span>Tunes</span>
                                </a>
                            </li>
                        </div>
                        
                        <div className="rightSide">
                            <a className="utilIcon">
                                <Notifications />
                                <div className="badge">2</div>
                            </a>
                            <a className="utilIcon" href="/profile">
                                <AccountCircleIcon />
                            </a>
                            <a className="utilIcon" onClick={handleLogout}>
                                <LogoutIcon />
                            </a>
                        </div>
                                
                    </div>
                    <div className="smartphone">
                        <li>
                            <a onClick={() => setNavbarOpen(true)} className="navbarResponsiveMenu">
                                <DehazeIcon className="icon" />
                            </a>
                        </li>
                        <Drawer
                            sx={{
                                flexShrink: 0,
                            }}
                            variant="persistent"
                            anchor="left"
                            open={isResponsiveNavbarOpen}
                            closeAfterTransition={true}
                        >
                            <IconButton onClick={() => setNavbarOpen(false)}>
                                <ChevronLeft />
                            </IconButton>
                            <li>
                                <a href="/" className="navbarListItem">
                                    <HomeIcon className="icon"/>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="/search" className="navbarListItem">
                                    <SearchIcon className="icon"/>
                                    <span>Search</span>
                                </a>
                            </li>
                            <li>
                                <a href="/chat" className="navbarListItem">
                                    <ChatIcon className="icon"/>
                                    <span>Chat</span>
                                </a>
                            </li>
                            <li>
                                <a href="/posts" className="navbarListItem">
                                    <PhotoLibraryIcon className="icon"/>
                                    <span>Posts</span>
                                </a>
                            </li>
                            <li>
                                <a href="/communities" className="navbarListItem">
                                    <PeopleIcon className="icon"/>
                                    <span>Communities</span>
                                </a>
                            </li>
                            <li>
                                <a href="/tunes" className="navbarListItem">
                                    <PlayCircleFilledIcon className="icon"/>
                                    <span>Tunes</span>
                                </a>
                            </li>
                            <Divider />
                            {sessionStorage.getItem('token') ? (
                                <div style={{ "margin-left": "auto", "display": "flex", "flex-direction": "row" }}>
                                    <li>
                                        <a href="/profile" className="navbarListItem" >
                                            <AccountCircleIcon className="icon"/>
                                            <span>Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="navbarListItem" onClick={handleLogout} >
                                            <LogoutIcon className="icon"/>
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </div>
                            ): (<></>)}
                        </Drawer>
                    </div>
                    
                    
                </ul>
                
            </div>
        </>
        
    );
}

export default NavBar;