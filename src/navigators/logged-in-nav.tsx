import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from "../screens/map/map";
import ActivityList from "../screens/activity-list/activity-list";
import Analytics from '../screens/analytics/analytics';
import { FontAwesome5 } from "@expo/vector-icons";

function LoggedInNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator 
      initialRouteName="Map"
      backBehavior="initialRoute"
    >
      <Tab.Screen 
        name="Map"
        component={Map}
        options={{
          title: "Тренировка",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="running" color={color} size={size} />
          ),           
        }}
      />
      <Tab.Screen 
        name="ActivityList"
        component={ActivityList}
        options={{
          title: "Список тренировок",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list-ol" color={color} size={size} />
          ),  
        }}
      />
       <Tab.Screen 
        name="Analytics"
        component={Analytics}
        options={{
          title: "Статистика",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-line" color={color} size={size} />
          ),  
        }}
      />
    </Tab.Navigator>
  )
}

export default LoggedInNavigation;