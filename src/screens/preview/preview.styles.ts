import { StyleSheet } from "react-native";
import {
  RICH_BLACK_COLOR,
  ALICE_BLUE_COLOR,
  MEDIUM_STATE_BLUE_COLOR,
  WHITE_COLOR,
} from "../../utils/colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 48,
    flex: 1,
    justifyContent: "center",
    backgroundColor: ALICE_BLUE_COLOR,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    marginBottom: 24,
    color: RICH_BLACK_COLOR,
  },
  description: {
    marginBottom: 32,
    color: RICH_BLACK_COLOR,
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
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
    textTransform: "uppercase",
  },
});

export default styles;
