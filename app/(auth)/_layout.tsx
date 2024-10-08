import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { State } from '../../typescript_types/types';
import { useGlobalContext } from "../../store/globalProvider";

import Loader from "../../components/Loader";

const AuthLayout = () => {
  const { isLoading, isLoggedIn, isAdmin } = useGlobalContext();
  if (!isLoading && isLoggedIn && !isAdmin) return <Redirect href="/home" />;
  if (!isLoading && isLoggedIn && isAdmin) return <Redirect href="/dashboard" />;
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
