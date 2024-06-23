import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../store/globalProvider";

import Loader from "../../components/Loader";

const AdminLayout = () => {
  const { isLoading, isLoggedIn, isAdmin } = useGlobalContext();
  if (!isLoading && isLoggedIn && !isAdmin) return <Redirect href="/home" />;
  return (
    <>
      <Stack>
        <Stack.Screen
          name="dashboard"
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

export default AdminLayout;
