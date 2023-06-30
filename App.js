import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminScreen from "./src/screens/AdminScreen";
import LoginScreen from "./src/screens/LoginScreen";
import UserScreen from "./src/screens/UserScreen";
import HappyListScreen from "./src/screens/HappyListScreen";
import CreateHappyListScreen from "./src/screens/CreateHappyListScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="HappyList" component={HappyListScreen} />
        <Stack.Screen
          name="CreateHappyList"
          component={CreateHappyListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
