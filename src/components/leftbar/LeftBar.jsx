import Option from "./option/Option";
import "./_leftbar.scss"
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PeopleIcon from '@material-ui/icons/People';
import ContactsIcon from '@material-ui/icons/Contacts';
import HomeIcon from '@material-ui/icons/Home';

function alertt() {
    alert("Oeoe")
}

function LeftBar() {
    return (
        <div className="leftBar">
            <ul className="leftbarList">
                <li>
                    <a href="/" className="leftbarListItem">
                        <HomeIcon className="icon"/>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="/friends" className="leftbarListItem">
                        <ContactsIcon className="icon"/>
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
                    <a href="/servers" className="leftbarListItem">
                        <PeopleIcon className="icon"/>
                        <span>Servers</span>
                    </a>
                    
                </li>
                <li>
                    <a href="/tune" className="leftbarListItem">
                        <PlayCircleFilledIcon className="icon"/>
                        <span>Tune</span>
                    </a>
                    
                </li>
            </ul>
        </div>
    );
}

export default LeftBar;