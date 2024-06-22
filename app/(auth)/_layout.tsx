import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { State } from '../../typescript_types/types';
import { useGlobalContext } from "../../store/globalProvider";

import Loader from "../../components/Loader";
//import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <Loader isLoading={isLoading} />
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default AuthLayout;
