import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Main from "../pages/Main";
import FormPayment from "../pages/FormPayment";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      FormPayment,
    },
    {
      defaultNavigationOptions: {
        headerStyle: { backgroundColor: "rgba(65,80,200,225)" },
        headerTitleStyle: { color: "#fff" },
      },
    },
  ),
);

export default Routes;
