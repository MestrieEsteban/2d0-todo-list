import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'


const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

	const onLoginPressed = async () => {
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			return
		}
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("email", email.value);
		urlencoded.append("password", password.value);

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		};


		try {
			let response = await fetch(
				"http://localhost:4242/api/auth/signin", requestOptions
			);
			response = await response.json()
			let user = response.user
			await AsyncStorage.setItem("email", user.email)
			await AsyncStorage.setItem("firstname", user.firstname)
			await AsyncStorage.setItem("lastname", user.lastname)
			await AsyncStorage.setItem("id", user.id)
			await AsyncStorage.setItem("token", response.token)
			navigation.reset({
				index: 0,
				routes: [{ name: 'Dashboard' }],
			})

		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Background>
			<BackButton goBack={navigation.goBack} />
			<Header>Welcome back</Header>
			<TextInput
				label="Email"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: '' })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
			/>
			<TextInput
				label="Password"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: '' })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
			/>
			<Button mode="contained" onPress={onLoginPressed}>
				Login
      </Button>
			<View style={styles.row}>
				<Text>Don’t have an account? </Text>
				<TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
					<Text style={styles.link}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	forgotPassword: {
		width: '100%',
		alignItems: 'flex-end',
		marginBottom: 24,
	},
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	forgot: {
		fontSize: 13,
		color: theme.colors.secondary,
	},
	link: {
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
})

export default LoginScreen
