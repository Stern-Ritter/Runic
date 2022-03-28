import { StyleSheet } from "react-native";
import {
  RICH_BLACK_COLOR,
  ALICE_BLUE_CLOR,
  MEDIUM_STATE_BLUE_COLOR,
  WHITE_COLOR,
} from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 48,
    flex: 1,
    justifyContent: "center",
    backgroundColor: ALICE_BLUE_CLOR,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    marginBottom: 24,
    color: RICH_BLACK_COLOR,
  },
  description: {
    color: RICH_BLACK_COLOR,
  },
  image: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  button: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 8,
    backgroundColor: MEDIUM_STATE_BLUE_COLOR,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: WHITE_COLOR,
  },
});

export default styles;
