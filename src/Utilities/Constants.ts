import { Dimensions } from "react-native";

export const TAB_ICONS = {
    HOME: require("../assets/Images/home_active.png"),
    NEWS: require("../assets/icons/newspaper.png"),
    EVENTS: require("../assets/icons/drum.png"),
    PROFILE: require("../assets/profile.png"),
    DIRECTORY: require("../assets/directory.png"),
}
export const COLORS = {
    MAIN_APP: "#FF7722",
    TAB_ACTIVE_ICONS: "red",
    TAB_INACTIVE_ICON: "white",
    LIGHT_ORANGE:"rgba(255,255,255,0.90)"
}

export const { width, height } = Dimensions.get('window');

