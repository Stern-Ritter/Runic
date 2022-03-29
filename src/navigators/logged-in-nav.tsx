import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import Map from "../screens/map/map";
import ActivityList from "../screens/activity-list/activity-list";
import Analytics from "../screens/analytics/analytics";
import { auth } from "../models/storage";
import { getActivities } from "../services/actions";
import { MEDIUM_STATE_BLUE_COLOR } from "../constants/colors";

const Tab = createBottomTabNavigator();

function LoggedInNavigation() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      dispatch(getActivities(user.uid));
    }
  }, [user]);

  return (
    <Tab.Navigator
      initialRouteName="Map"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: MEDIUM_STATE_BLUE_COLOR,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "rgba(119, 136, 153, 0.4)",
        },
      }}
    >
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          title: "Тренировка",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="running"
              color={color}
              size={focused ? 28 : 24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ActivityList"
        component={ActivityList}
        options={{
          title: "Список тренировок",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="list-ol"
              color={color}
              size={focused ? 28 : 24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          title: "Статистика",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="chart-line"
              color={color}
              size={focused ? 28 : 24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default LoggedInNavigation;
