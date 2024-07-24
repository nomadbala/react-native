import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { loadFonts } from "./expo-fonts";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import RegisterScreen from "./src/screens/Register";
import { AuthProvider } from "./src/context/AuthContext";
import Browse from "./src/screens/Browse";
import LoginScreen from "./src/screens/Login";
import MovieScreen from "./src/screens/MovieScreen";
import SeatSelectionScreen from "./src/screens/SeatSelectionScreen";
import Profile from "./src/screens/Profile";
import TicketPurchaseScreen from "./src/screens/TicketPurchaseScreen";
import SessionSelectionScreen from "./src/screens/SessionSelectionScreen";

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="Register"
              component={RegisterScreen}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="Browse"
              component={Browse}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="MovieScreen"
              component={MovieScreen}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="SeatSelectionScreen"
              component={SeatSelectionScreen}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="TicketPurchase"
              component={TicketPurchaseScreen}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <RootStack.Screen
              name="SessionSelectionScreen"
              component={SessionSelectionScreen}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
