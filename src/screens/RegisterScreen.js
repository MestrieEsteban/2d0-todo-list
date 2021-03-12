import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';


import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState({ value: '', error: '' })
	const [firstName, setFirstname] = useState({ value: '', error: '' })
	const [lastname, setlastname] = useState({ value: '', error: '' })
	const [birthdate, setbirthdate] = useState({ value: '', error: '' })
	const [gender, setgender] = useState({ value: '', error: '' })
	const [confpassword, setconfpassword] = useState({ value: '', error: '' })
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })

	const onSignUpPressed = async () => {
		const nameError = nameValidator(name.value)
		const firstNameError = nameValidator(firstName.value)
		const lastnameError = nameValidator(lastname.value)
		const birthdateError = nameValidator(birthdate.value)
		const genderError = nameValidator(gender.value)
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		const confpasswordError = passwordValidator(confpassword.value)
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("email", email.value);
		urlencoded.append("password", password.value);
		urlencoded.append("passwordConfirmation", confpassword.value);
		urlencoded.append("firstname", firstName.value);
		urlencoded.append("lastname", lastname.value);
		urlencoded.append("birthdate", birthdate.value);
		urlencoded.append("gender", gender.value);

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		};


		try {
			let response = await fetch(
				"http://localhost:4242/api/auth/signup", requestOptions
			);
			response = await response.json()
			console.log(response);
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
			<Header>Create Account</Header>
			<TextInput
				label="Firstname"
				returnKeyType="next"
				value={firstName.value}
				onChangeText={(text) => setFirstname({ value: text, error: '' })}
				error={!!firstName.error}
				errorText={firstName.error}
			/>
			<TextInput
				label="Lastname"
				returnKeyType="next"
				value={lastname.value}
				onChangeText={(text) => setlastname({ value: text, error: '' })}
				error={!!lastname.error}
				errorText={lastname.error}
			/>
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
				label="Birthdate"
				returnKeyType="next"
				value={birthdate.value}
				onChangeText={(text) => setbirthdate({ value: text, error: '' })}
				error={!!birthdate.error}
				errorText={birthdate.error}
			/>
			<TextInput
				label="Gender"
				returnKeyType="next"
				value={gender.value}
				onChangeText={(text) => setgender({ value: text, error: '' })}
				error={!!gender.error}
				errorText={gender.error}
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
			<TextInput
				label="Confirm Password"
				returnKeyType="done"
				value={confpassword.value}
				onChangeText={(text) => setconfpassword({ value: text, error: '' })}
				error={!!confpassword.error}
				errorText={confpassword.error}
				secureTextEntry
			/>
			<Button
				mode="contained"
				onPress={onSignUpPressed}
				style={{ marginTop: 24 }}
			>
				Sign Up
      </Button>
			<View style={styles.row}>
				<Text>Already have an account? </Text>
				<TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
					<Text style={styles.link}>Login</Text>
				</TouchableOpacity>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	link: {
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
})

export default RegisterScreen
