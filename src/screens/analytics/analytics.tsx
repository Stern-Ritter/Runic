import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { View, Dimensions, Text } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {
  LineChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import alasql from "alasql";
import { 
  yearMonthDateFormat,
} from '../../utils/constants';
import { MIDNIGHT_MOSS_COLOR, ROYAL_BLUE_COLOR } from "../../utils/colors";
import { State } from "../../services/store/store";
import styles from "./analytics.styles";

const chartConfig = {
  backgroundGradientFrom: MIDNIGHT_MOSS_COLOR,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: ROYAL_BLUE_COLOR,
  backgroundGradientToOpacity: 0.5,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
}
const lineChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(123, 104, 238, ${opacity})`,
};

const progressRingConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(0, 80, 0, ${opacity})`,
};

const heatmapConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
};

function Analytics() {
  const screenWidth = Dimensions.get("window").width;
  const renderTabBar = () => (<ScrollableTabBar />);
  
  const { loading, hasError, data } = useSelector(
    (store: State) => store.activities.activities
  );

  const formatedData = useMemo(() => {
    return data
      .map((element) => 
        ({
          ...element,
          createdDate: element.createdDate.toISOString().slice(0, 10),
          month: element.createdDate.toLocaleString("Ru-ru", yearMonthDateFormat)
        }));
  }, [data])

  const lineChartData = useMemo(() => {
    const res = alasql(`
    SELECT 
      month,
      SUM(distance) AS distance
    FROM ? 
    GROUP BY month`,
    [formatedData]) as LineChartDataElement[];
    return ({
      labels: res.map((element) => element.month),
      datasets: [{ data: res.map((element: {month: string, distance: number }) => element.distance)}],
      legend: ["Километры"]
    });
  }, [formatedData]);

  const progressRingData = {
    labels: ["Дистанция", "Калории"],
    data: [0.4, 0.6],
  };

  const heatmapData = useMemo(() => {
    return formatedData.map((element) => ({date: element.createdDate, count: element.distance}))
  }, [formatedData]);

  return (
    <ScrollableTabView style={styles.tabView} renderTabBar={renderTabBar}>
      <View tabLabel="Цели" key="progress" >
      <ProgressChart
        
        data={progressRingData}
        width={screenWidth}
        height={320}
        strokeWidth={32}
        radius={32}
        chartConfig={progressRingConfig}
        hideLegend={false}
      />
      </View>
      <View tabLabel="Динамика"  key="line">
      <LineChart
        data={lineChartData}
        width={screenWidth}
        height={320}
        chartConfig={lineChartConfig}
        bezier
        verticalLabelRotation={25}
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
      </View>
      <View tabLabel="Активность"  key="activities">
      <ContributionGraph
        values={heatmapData}
        endDate={new Date()}
        numDays={110}
        width={screenWidth}
        height={320}
        gutterSize={4}
        squareSize={16}
        chartConfig={heatmapConfig}
      />
      </View>
    </ScrollableTabView>
  );
}

export default Analytics;
