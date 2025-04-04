import ProfilePage from "../NewModule/ProfilePage";
import Directory from "../Screens/Directory/Director";
import Events from "../Screens/Home/Fregments/Events/Events";
import Home from "../Screens/Home/Fregments/Home";
import News from "../Screens/Home/Fregments/News/News";
import Profile from "../Screens/Home/Fregments/Profile/Profile";
import { SVG_XML } from "../constants/Svg_xml";
import { TAB_ICONS } from "./Constants";

export const tabs = [
    {
        name: 'Directory',
        component: Directory,
        tabIcons: TAB_ICONS.DIRECTORY,
        nameShow: "Directory"
    },
    {
        name: 'News',
        component: News,
        tabIcons: TAB_ICONS.NEWS,
        nameShow: "News"
    },
    {
        name: 'Home',
        component: Home,
        tabIcons: TAB_ICONS.HOME,
        nameShow: "Home"
    },
    {
        name: 'Events',
        component: Events,
        tabIcons: TAB_ICONS.EVENTS,
        nameShow: "Events"
    },
    {
        name: 'Profile',
        // component: Profile,
        component:ProfilePage,
        tabIcons: TAB_ICONS.PROFILE,
        nameShow: "Profile"
    },
]