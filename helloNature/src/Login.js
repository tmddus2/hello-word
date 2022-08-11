import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Button, TextInput } from 'react-native';


const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const login = () => {

        console.log("PRESSS!!");
        var requestBody = {
            username: username,
            password: password
        }
        console.log("->", requestBody)

        axios.post("http://192.168.0.15:8080/api/signin", requestBody)
            .then(res => {
                console.log("->",res.data)
                if (res.data) {
                    AsyncStorage.multiSet([
                        ['isLogin', 'true'],
                        ['accessToken', `Bearer ${res.headers.auth_token}`],
                        ['username', `${res.data.username}`]
                    ])
                    navigation.replace('Root');
                } else {
                    console.log("fail " + res.data.message)
                }
            }).catch(error => console.log(error));

    }

    const usernameChanege = e => {
        setUsername(e.target.value)
    }

    const passwordChange = e => {
        setPassword(e.target.value)
    }

    return (<>
        <TextInput
            onChangeText={setUsername}
            placeholder="Username">

        </TextInput>
        <TextInput
            onChangeText={setPassword}
            type="password"
            placeholder="Password">

        </TextInput>
        <Button title="submit" onPress={login}>Login</Button>
    </>)
}

export default LoginScreen;
