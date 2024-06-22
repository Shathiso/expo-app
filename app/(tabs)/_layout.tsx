import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Loader from '@/components/Loader';
import { useGlobalContext } from "../../store/globalProvider";
import { State } from '@/typescript_types/types';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {isLoading} = useGlobalContext();

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
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
          title: 'Information',
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
