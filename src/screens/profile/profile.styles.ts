import { StyleSheet } from "react-native";
import {
  MEDIUM_STATE_BLUE_COLOR,
  ROYAL_BLUE_COLOR,
  MINT_CREAM_COLOR,
  WHITE_SMOKE_COLOR,
  CRIMSON_COLOR,
  WHITE_COLOR,
} from "../../utils/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 32,
    backgroundColor: WHITE_COLOR,
  },
  container: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 96,
    height: 96,
    marginBottom: 36,
  },
  section: {
    marginBottom: 8,
    fontSize: 22,
    fontWeight: "600",
    color: MEDIUM_STATE_BLUE_COLOR,
  },
  inputContainer: {
    width: "80%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 18,
    textAlign: "left",
  },
  input: {
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: MEDIUM_STATE_BLUE_COLOR,
    borderRadius: 12,
    backgroundColor: WHITE_SMOKE_COLOR,
  },
  button: {
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 18,
    backgroundColor: MINT_CREAM_COLOR,
    borderWidth: 1,
    borderColor: ROYAL_BLUE_COLOR,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    color: ROYAL_BLUE_COLOR,
    textAlign: "center",
    textTransform: "uppercase",
  },
  error: {
    fontSize: 12,
    fontWeight: "400",
    color: CRIMSON_COLOR,
  },
});

export default styles;
