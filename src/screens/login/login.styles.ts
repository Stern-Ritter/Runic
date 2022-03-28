import { StyleSheet } from "react-native";
import { MEDIUM_STATE_BLUE_COLOR, WHITE_COLOR } from "../../constants/colors";

const styles = StyleSheet.create({
  button: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 8,
    backgroundColor: MEDIUM_STATE_BLUE_COLOR,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "400",
    color: WHITE_COLOR,
    textTransform: "uppercase"
  },
});

export default styles;
