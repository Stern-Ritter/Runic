import { StyleSheet } from "react-native";
import {
  RICH_BLACK_COLOR,
  ALICE_BLUE_CLOR,
  GREY_COLOR,
} from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    backgroundColor: ALICE_BLUE_CLOR,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
  },
  itemContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    padding: 24,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    marginBottom: 8,
    fontSize: 18,
    color: RICH_BLACK_COLOR,
  },
  time: {
    fontSize: 18,
    color: RICH_BLACK_COLOR,
  },
  distance: {
    fontSize: 18,
    color: RICH_BLACK_COLOR,
  },
  date: {
    fontSize: 14,
    color: GREY_COLOR,
  },
  buttonContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  delete: {
    fontSize: 12,
    color: GREY_COLOR,
  },
  separator: {
    borderBottomWidth: 1,
  },
});

export default styles;
