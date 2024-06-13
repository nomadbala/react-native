import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import EvilIcons from "@expo/vector-icons/EvilIcons";

import { Tasks, AddTask } from "./pages/Tasks";
import Settings from "./pages/Settings";
import { TasksProvider } from "./components/TasksProvider";

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name="Tasks"
            component={Tasks}
            options={({ navigation }) => ({
              headerLargeTitle: true,
              headerLeft: () => (
                <Pressable onPress={() => navigation.navigate("Settings")}>
                  <EvilIcons name="gear" size={24} color="black" />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate("Add task")}>
                  <Text style={{ fontSize: 24 }}>+</Text>
                </Pressable>
              ),
            })}
          />

          <RootStack.Screen
            name="Settings Stack"
            component={Settings}
            options={({ navigation }) => ({})}
          />
        </RootStack.Group>

        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen
            name="Settings"
            component={Settings}
            options={({ navigation }) => ({})}
          />
          <RootStack.Screen name="Add task" component={AddTask} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
