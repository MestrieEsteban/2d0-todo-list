import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'




const StartScreen = ({ navigation }) => {
	const isLogin = async () => {
		if (await AsyncStorage.getItem("token")) {
			navigation.reset({
				index: 0,
				routes: [{ name: 'Dashboard' }],
			})
		}
	}
	isLogin()



	return (
		<Background>
			<Header>Task login</Header>
			<Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
				Login
    </Button>
			<Button
				mode="outlined"
				onPress={() => navigation.navigate('RegisterScreen')}
			>
				Sign Up
    </Button>
		</Background>
	)
}

export default StartScreen
