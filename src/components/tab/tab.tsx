import React from "react";
import { ScrollView } from "react-native";

function Tab(props: TabOptions) {
  return <ScrollView>{props.children}</ScrollView>;
}

export default Tab;
