import React from "react";
import { useSelector } from "react-redux";
import { View, ScrollView, StatusBar, Dimensions, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { MIDNIGHT_MOSS_COLOR, ROYAL_BLUE_COLOR } from "../../utils/colors";
import { State } from "../../services/store/store";
import styles from "./analytics.styles";

const lineChartConfig = {
  backgroundGradientFrom: MIDNIGHT_MOSS_COLOR,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: ROYAL_BLUE_COLOR,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

const progressRingConfig = {
  backgroundGradientFrom: MIDNIGHT_MOSS_COLOR,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: ROYAL_BLUE_COLOR,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

function Analytics() {
  const screenWidth = Dimensions.get("window").width;
  const renderTabBar = () => {
    return <StatusBar hidden/>
  }

  const { loading, hasError, data } = useSelector(
    (store: State) => store.activities.activities
  );

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Километры"]
  };

  const progressRingData = {
    labels: ["Swim", "Bike", "Run"],
    data: [0.4, 0.6, 1]
  };

  return (
    <ScrollableTabView style={styles.container} renderTabBar={renderTabBar}>
      <ProgressChart
        data={progressRingData}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={progressRingConfig}
        hideLegend={false}
      />
      <LineChart
        data={lineChartData}
        width={screenWidth}
        height={220}
        chartConfig={lineChartConfig}
        bezier
        renderDotContent={({ x, y, index, indexData }) => {
          return (
            <View
              style={{
                position: "absolute",
                top: y,
                left: x,
              }}
            >
              <Text style={{ fontSize: 12 }}>{indexData}</Text>
            </View>
          );
        }}
      />
    </ScrollableTabView>
  );
}

export default Analytics;
