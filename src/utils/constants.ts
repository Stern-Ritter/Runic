import {
  MIDNIGHT_MOSS_COLOR,
  ROYAL_BLUE_COLOR
} from '../utils/colors';

const createdDateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const filterDateTimeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
};

const yearMonthDateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  year: "numeric",
};

const monthCount = 6;

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

export {
  createdDateTimeFormat,
  filterDateTimeFormat,
  yearMonthDateFormat,
  monthCount,
  lineChartConfig,
  progressRingConfig,
  heatmapConfig
};
