import { StyleSheet } from "react-native";
import {
  RICH_BLACK_COLOR,
  GREY_COLOR,
  ROYAL_BLUE_COLOR,
  WHITE_COLOR,
} from "../../utils/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_COLOR,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 28,
    borderBottomWidth: 1,
    borderColor: `rgba(0, 0, 0, 0.3)`,
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
  itemContainer: {
    flexDirection: "row",
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
