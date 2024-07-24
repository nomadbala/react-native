import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });
};
