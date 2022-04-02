import { StyleSheet } from "react-native";
import {
  RICH_BLACK_COLOR,
  GREY_COLOR,
  ROYAL_BLUE_COLOR,
  ALICE_BLUE_COLOR,
  MEDIUM_STATE_BLUE_COLOR,
  WHITE_SMOKE_COLOR,
  WHITE_COLOR,
  MINT_CREAM_COLOR,
} from "../../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ALICE_BLUE_COLOR,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 28,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: `rgba(0, 0, 0, 0.3)`,
    backgroundColor: WHITE_COLOR,
  },
  filterTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
    color: RICH_BLACK_COLOR,
  },
  filterDelimiter: {
    fontSize: 22,
    fontWeight: "600",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    marginTop: 8,
    backgroundColor: MEDIUM_STATE_BLUE_COLOR,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "400",
    color: WHITE_COLOR,
    textTransform: "uppercase",
  },
  list: {
    height: "100%",
  },
  itemContainer: {
    margin: 8,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: MEDIUM_STATE_BLUE_COLOR,
    borderRadius: 12,
    backgroundColor: WHITE_SMOKE_COLOR,
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: ROYAL_BLUE_COLOR,
  },
  infoElement: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
    color: RICH_BLACK_COLOR,
  },
  date: {
    fontSize: 12,
    fontWeight: "600",
    color: GREY_COLOR,
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  delete: {
    fontSize: 12,
    color: RICH_BLACK_COLOR,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "rgba(65, 105, 225, 0.3)",
  },
});

export default styles;
