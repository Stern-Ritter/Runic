import { StyleSheet } from "react-native";
import {
  ALICE_BLUE_COLOR,
  MEDIUM_STATE_BLUE_COLOR,
  ROYAL_BLUE_COLOR,
  MINT_CREAM_COLOR,
  WHITE_SMOKE_COLOR,
  CRIMSON_COLOR,
} from "../../utils/colors";

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingBottom: 48,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ALICE_BLUE_COLOR,
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 36,
  },
  input: {
    width: "70%",
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
    marginBottom: 12,
    backgroundColor: MINT_CREAM_COLOR,
    borderWidth: 1,
    borderColor: ROYAL_BLUE_COLOR,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    color: ROYAL_BLUE_COLOR,
    textTransform: "uppercase",
  },
  error: {
    fontSize: 12,
    fontWeight: "400",
    color: CRIMSON_COLOR,
  },
});

export default styles;
