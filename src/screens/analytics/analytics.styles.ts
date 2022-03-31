import { StyleSheet } from "react-native";
import { ROYAL_BLUE_COLOR, WHITE_COLOR } from "../../utils/colors";

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  labelStyle: {
    color: ROYAL_BLUE_COLOR,
    marginVertical: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default styles;
