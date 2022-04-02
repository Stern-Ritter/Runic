import { StyleSheet } from "react-native";
import { MEDIUM_STATE_BLUE_COLOR, WHITE_COLOR } from "../../utils/colors";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  info: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    width: "100%",
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  indicatorIcon: {
    marginRight: 12,
  },
  indicator: {
    fontSize: 22,
  },
  mapContainer: {
    flex: 6,
    margin: 5,
    borderWidth: 1,
    borderColor: MEDIUM_STATE_BLUE_COLOR,
    borderRadius: 20,
    overflow: "hidden",
  },
  map: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  loading: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    position: "absolute",
    bottom: 30,
    left: 0,
    width: "100%",
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 8,
    backgroundColor: MEDIUM_STATE_BLUE_COLOR,
    borderRadius: 10,
    fontSize: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "400",
    color: WHITE_COLOR,
    textTransform: "uppercase",
  },
});

export default styles;
