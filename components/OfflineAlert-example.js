import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';

const App = () => {
	const [isConnected, setConnected] = useState(true);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setConnected(state.isConnected);
			if (!state.isConnected) {
				showAlert();
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const showAlert = () => {
		Alert.alert(
			'Internet Connection',
			'You are offline. Some features may not be available.'
		);
	};

	return (
		<View>{isConnected ? <Text>Online</Text> : <Text>Offline</Text>}</View>
	);
};