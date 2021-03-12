import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Keyboard, ScrollView } from 'react-native';


import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import Task from '../components/Task'
import TextInput from '../components/TextInput'


const Dashboard = ({ navigation }) => {
	const [tasks, setTask] = useState([])
	const [taskName, setTaskName] = useState({ value: '', error: '' })
	const getTask = async () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		};
		let uuid = await AsyncStorage.getItem("id")


		try {
			let response = await fetch(
				`http://localhost:4242/api/task/${uuid}`, requestOptions
			);
			response = await response.json()
			setTask(response)
		} catch (error) {
			console.error(error);
		}
	}
	getTask()


	return (
		<Background>
			<Header>Today's Task</Header>
			<View style={styles.items}>
				{
					tasks.map(task => {
						return (
							<Task text={task.content} />
						)
					})
				}
			</View>

			<TextInput
				label="Task name"
				returnKeyType="done"
				value={taskName.value}
				onChangeText={(text) => setTaskName({ value: text, error: '' })}
				error={!!taskName.error}
				errorText={taskName.error}
			/>
			<Button
				mode="outlined"
				onPress={async () => {
					var myHeaders = new Headers();
					myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
					var urlencoded = new URLSearchParams();
					urlencoded.append("content", taskName.value);
					var requestOptions = {
						method: 'POST',
						headers: myHeaders,
						body: urlencoded,
						redirect: 'follow'
					};
					let uuid = await AsyncStorage.getItem("id")


					try {
						await fetch(
							`http://localhost:4242/api/task/${uuid}`, requestOptions
						);

					} catch (error) {
						console.error(error);
					}
				}
				}
			> Add task
						    </Button>

			<Button
				mode="outlined"
				onPress={async () => {
					await AsyncStorage.removeItem("email")
					await AsyncStorage.removeItem("firstname")
					await AsyncStorage.removeItem("lastname")
					await AsyncStorage.removeItem("token")
					await AsyncStorage.removeItem("id")
					navigation.reset({
						index: 0,
						routes: [{ name: 'StartScreen' }],
					})
				}
				}
			>
				Logout
    </Button>
		</Background>
	)
}


const styles = StyleSheet.create({
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	items: {
		marginTop: 30,
	},
});


export default Dashboard
