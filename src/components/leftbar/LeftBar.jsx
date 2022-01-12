import Option from "./option/Option";
import "./_leftbar.scss"
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PeopleIcon from '@material-ui/icons/People';
import ContactsIcon from '@material-ui/icons/Contacts';

function alertt() {
    alert("Oeoe")
}

function LeftBar() {
    return (
        <div className="leftBar">
            <ul className="leftbarList">
                <li className="leftbarListItem" onClick={alertt}>
                    <PhotoLibraryIcon className="icon"/>
                    <span>Posts</span>
                </li>
                <li className="leftbarListItem">
                    <PeopleIcon className="icon"/>
                    <span>Servers</span>
                </li>
                <li className="leftbarListItem">
                    <PlayCircleFilledIcon className="icon"/>
                    <span>Flicks</span> { /* Synonym of Videos */ }
                </li>
                <li className="leftbarListItem">
                    <ContactsIcon className="icon"/>
                    <span>Friends</span>
                </li>
            </ul>
        </div>
    );
}

export default LeftBar;