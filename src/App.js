import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "App": {
        "textAlign": "center"
    },
    "App-logo": {
        "animation": "App-logo-spin infinite 20s linear",
        "height": 80
    },
    "App-header": {
        "backgroundColor": "#DDD",
        "height": 50,
        "paddingTop": 1,
        "paddingRight": 0,
        "paddingBottom": 20,
        "paddingLeft": 0,
        "fontFamily": "cursive"
    },
    "App-intro": {
        "fontSize": "large"
    }
});