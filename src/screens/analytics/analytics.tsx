import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { View, Dimensions, Text } from "react-native";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import {
  LineChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import {} from "expo-font";
import alasql from "alasql";
import Tab from "../../components/tab/tab";
import { yearMonthDateFormat, monthCount } from "../../utils/constants";
import { getFirstAndLastWeekDaysWithoutTime } from "../../utils/date";
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
  useShadowColorFromDataset: false,
  decimalPlaces: 2,
  style: {
    borderRadius: 16,
  },
};
const lineChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(123, 104, 238, ${opacity})`,
};

const progressRingConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(123, 104, 238, ${opacity})`,
};

const heatmapConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
};

const handleToolTip: any = {};

function Analytics() {
  const { loading, hasError, data } = useSelector(
    (store: State) => store.activities.activities
  );

  const { distanceGoal, caloriesGoal } = useSelector(
    (store: State) => store.settings.settings.data
  );

  const formatedData = useMemo(
    () =>
      data.map((element) => ({
        ...element,
        createdDate: element.createdDate.toISOString().slice(0, 10),
        orderMonth: element.createdDate.toISOString().slice(0, 7),
        month: element.createdDate.toLocaleString("Ru-ru", yearMonthDateFormat),
      })),
    [data]
  );

  const lineChartData = useMemo(() => {
    const res = alasql(
      `
    SELECT 
      month,
      orderMonth,
      SUM(distance) AS distance
    FROM ? 
    GROUP BY month, orderMonth
    ORDER BY orderMonth ASC`,
      [formatedData]
    ) as LineChartDataElement[];

    return {
      labels: res.map((element) => element.month).slice(-monthCount),
      datasets: [
        {
          data: res
            .map(
              (element: { month: string; distance: number }) => element.distance
            )
            .slice(-monthCount),
        },
      ],
      legend: ["Километры"],
    };
  }, [formatedData]);

  const progressRingData = useMemo(() => {
    const [minDate, maxDate] = getFirstAndLastWeekDaysWithoutTime();

    const filteredAggrData = data
      .filter((activity) => {
        const comparedDate = new Date(
          activity.createdDate.getFullYear(),
          activity.createdDate.getMonth(),
          activity.createdDate.getDate()
        );
        return comparedDate >= minDate && comparedDate <= maxDate;
      })
      .reduce(
        (acc, el) => ({
          distance: acc.distance + el.distance,
          calories: acc.calories + el.calories,
        }),
        { distance: 0, calories: 0 }
      );

    const distanceGoalPercentageComplete =
      Math.round((filteredAggrData.distance / distanceGoal) * 100) / 100;
    const caloriesGoalPercentageComplete =
      Math.round((filteredAggrData.calories / caloriesGoal) * 100) / 100;

    const chartData = [
      (distanceGoalPercentageComplete > 1
        ? 1
        : distanceGoalPercentageComplete) || 0,
      (caloriesGoalPercentageComplete > 1
        ? 1
        : caloriesGoalPercentageComplete) || 0,
    ];

    return {
      labels: ["Км.", "Калории"],
      data: chartData,
    };
  }, [data, distanceGoal, caloriesGoal]);

  const heatmapData = useMemo(
    () =>
      formatedData.map((element) => ({
        date: element.createdDate,
        count: element.distance,
      })),
    [formatedData]
  );

  const screenWidth = Dimensions.get("window").width;
  const renderTabBar = () => <ScrollableTabBar />;

  return (
    <ScrollableTabView
      style={styles.tabView}
      initialPage={1}
      renderTabBar={renderTabBar}
      tabBarActiveTextColor={ROYAL_BLUE_COLOR}
      tabBarTextStyle={{ fontSize: 15 }}
      scrollWithoutAnimation
    >
      <Tab tabLabel="Цели">
        <ProgressChart
          data={progressRingData}
          width={screenWidth}
          height={screenWidth}
          strokeWidth={28}
          radius={28}
          chartConfig={progressRingConfig}
          hideLegend={false}
          style={styles.chart}
        />
      </Tab>
      <Tab tabLabel="Динамика">
        <LineChart
          data={lineChartData}
          width={screenWidth}
          height={screenWidth}
          chartConfig={lineChartConfig}
          bezier
          verticalLabelRotation={25}
          renderDotContent={({ x, y, index, indexData }) => (
            <View
              key={index}
              style={{
                position: "absolute",
                top: y,
                left: x,
              }}
            >
              <Text style={{ fontSize: 12 }}>{indexData.toFixed(2)}</Text>
            </View>
          )}
          style={styles.chart}
        />
      </Tab>
      <Tab tabLabel="Активность">
        <ContributionGraph
          tooltipDataAttrs={(value) => handleToolTip}
          values={heatmapData}
          endDate={new Date()}
          numDays={110}
          width={screenWidth}
          height={screenWidth}
          gutterSize={4}
          squareSize={16}
          chartConfig={heatmapConfig}
          style={styles.chart}
        />
      </Tab>
    </ScrollableTabView>
  );
}

export default Analytics;
