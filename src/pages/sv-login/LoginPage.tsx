import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { genesysApi } from '../../api/genesysApi';
import { useState } from 'react';
import axios from 'axios';

export const LoginPage = (props: any) => {
    try {
        const [token, setToken] = useState()
        const [chatId, setchatId] = useState()

        //para crear chat
        const [participanteNombre, setParticipanteNombre] = useState('');
        const [nroDocumento, setNroDocumento] = useState('');
        const [mensaje, setMensaje] = useState('');

        const handleSubmit = async () => {
            // url para axios
            const url = {
                baseURL: 'http://192.168.1.219:3333/v1'
            }

            // parametros login
            const loginParams = {
                username: "edufer95@outlook.es",
                password: "123"
            }

            // ejecuta login
            const login = await axios.create(url)
                .post('/auth/login', loginParams)

            console.log('login.data', login.data.data)

            setToken(login.data.data.accessToken)

            // config
            const config = {
                headers: {
                    Authorization: `Bearer ${login.data.data.accessToken}`
                }
            }

            // parametros para crear el chat
            const chatParams = {
                participanteNombre: participanteNombre,
                participanteId: nroDocumento,
                participanteAvatar: "https://media.licdn.com/dms/image/C4D03AQF2y8lUEfzQkw/profile-displayphoto-shrink_800_800/0/1607906665142?e=2147483647&v=beta&t=wyfxNxIy_hRicdF0J9s22lQqeRdvfF5B6bZC1KWg3CU",
                mensaje: mensaje
            }

            // crea el chat
            
            const chat = await axios.create(url)
                .post('/chats', chatParams, config)

            console.log('chat.data', chat.data.data)

            if (chat.data.data.chat.chatId) {
                setchatId(chat.data.data.chat.chatId);
                let params = {
                    chatId: await chat.data.data.chat.chatId,
                    token: await login.data.data.accessToken
                }
                props.navigation.navigate('chat', params);
            }

        }

        return (
            <View style={styles.container}>
                    <Text style={styles.label}>Ingrese su Nombre</Text>
                    <TextInput 
                        style={styles.input}
                        id="user"
                        value={participanteNombre}
                        onChangeText={setParticipanteNombre}
                    />
                    <Text style={styles.label}>Ingrese su Numero de Documento</Text>
                    <TextInput 
                        style={styles.input}
                        id="user"
                        value={nroDocumento}
                        onChangeText={setNroDocumento}
                    />
                    <Text style={styles.label}>Escriba un mensaje para Iniciar!</Text>
                    <TextInput 
                        style={styles.input} 
                        id="password"
                        value={mensaje}
                        onChangeText={setMensaje}
                    />
                    <Button title="Ingresar" onPress={handleSubmit} />
            </View>
        )

    } catch (e) {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'linear-gradient(143deg, rgba(0,1,41,1) 0%, rgb(11, 51, 74) 68%, rgba(44,197,171,0.5323275862068966) 88%, rgba(50,224,190,0.6961206896551724) 99%)',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        margin: 10
    },
    input: {
        backgroundColor: '#fff',
        color: '#000000',
        width: '50%',
        height: 35,
        margin: 10,
        borderRadius: 10
    },
});
