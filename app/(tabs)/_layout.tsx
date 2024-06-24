import { Tabs, Redirect } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import Loader from '@/components/Loader';
import { useGlobalContext } from "../../store/globalProvider";

export default function TabLayout() {

  const { isLoading, isLoggedIn, isAdmin } = useGlobalContext();
  if (!isLoading && isLoggedIn && isAdmin) return <Redirect href="/dashboard" />;

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize:12,
          marginBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="applications"
        options={{
          title: 'Applications',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'create' : 'create-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="faults"
        options={{
          title: 'Faults',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cog' : 'cog-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="statements"
        options={{
          title: 'Statements',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cash' : 'cash-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="information"
        options={{
          title: 'Info',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'information' : 'information-outline'} color={color} />
          ),
        }}
      />
    </Tabs>

    <Loader isLoading={isLoading} />
    </>
  );
}
