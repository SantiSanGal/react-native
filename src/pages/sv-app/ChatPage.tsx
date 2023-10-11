import { genesysApi } from '../../api/genesysApi'
import { useEffect, useRef, useState } from 'react'
import { Mensaje } from '../../components/sv-app/Mensaje';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

import io from 'socket.io-client';
import axios from 'axios';

interface Message {
  mensajeId: number;
  mensaje: string;
}

interface Chat {
  data: {
    chat: {
      mensajes: Message[];
    };
  };
}

const getMessages = async (setChat: any, chatId: number, token: string) => {
  // url para axios
  const url = {
    baseURL: 'http://192.168.1.219:3333/v1'
  }

  // config
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // ejecuta mensajes
  const mensajes = await axios.create(url)
    .get(`/chats/${chatId}/messages`, config)

  setChat(mensajes.data)
}

export const ChatPage = (params: any) => {
  const [socket, setSocket] = useState(null);
  const chatId = params.route.params.chatId;
  const token = params.route.params.token;

  const [ chat, setChat] = useState<Chat | undefined>();
  const [ message, setMessage] = useState('');
  const [ messageId, setMessageId] = useState<number>(0);
  // const [ messageText, setMessageText ] = useState('')
  const chatMessages = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket: any = io('http://192.168.1.219:3333');

    socket.on('connect', () => {
      console.log('Conexión exitosa al servidor de WebSocket');
    });
    socket.on("refresh/" + chatId, async (refresh: any) => {
      await getMessages(setChat, chatId, token)
      console.log('Conexión exitosa al servidor de WebSocket');
    });

    // Manejar la desconexión del socket cuando el componente se desmonta.
    return () => {
      socket.disconnect();
    };

    // Guarda la instancia del socket en el estado.
    setSocket(socket);
  }, []);

  let data = {
    mensajeId: 230,
    mensaje: ''
  }

  useEffect(() => {
    getMessages(setChat, chatId, token)
  }, [])

  useEffect(() => {
    if (chatMessages.current) {
      chatMessages.current.scrollTop = chatMessages?.current?.scrollHeight;
    }
  }, [chat?.data?.chat.mensajes]);


  const handleSendMessage = () => {
    data.mensajeId = messageId == 0 ? undefined : messageId;
    data.mensaje = message

    genesysApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    genesysApi.post(`/chats/${chatId}/messages/send`, data)
      .then((res) => {
        getMessages(setChat, chatId, token)
        setMessage('');
        setMessageId(0);
        data.mensajeId = 0;
      })
      .catch(err => console.log(err))
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.username}>Qbox Asistente Virtual</Text>
      </View>
      <View style={styles.chatMainContainer}>
        <View style={styles.chatMessagesContainer}>
          <ScrollView style={styles.chatMessages}>
            {
              chat?.data?.chat.mensajes.map(mensaje => (
                <Mensaje
                  key={mensaje.mensajeId}
                  mensaje={mensaje}
                  messageId={messageId}
                  setMessageId={setMessageId}
                  setMessage={setMessage}
                />
              ))
            }
          </ScrollView>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              id='message'
              value={message}
              onChangeText={setMessage}
              placeholder="Escriba un Mensaje"
              placeholderTextColor={styles.placeholderStyle.color}
            />
            <Button title="Enviar" onPress={handleSendMessage} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  placeholderStyle: {
    color: '#fff',
  },
  chatContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    height: '7%',
    backgroundColor: '#202c33',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  username: {
    color: '#fff',
  },
  bxUser: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  bxChevronLeft: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  chatMainContainer: {
    width: '100%',
    height: '93%',
    flexDirection: 'row',
  },
  chatMessagesContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    // overflow: 'scroll'
  },
  chatMessages: {
    width: '100%',
    height: '86%',
    backgroundColor: '#111b21',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    overflowY: 'scroll'
  },
  chatMessagesMessage: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#202c33',
    wordWrap: 'break-word',
  },
  containerInput: {
    width: '100%',
    height: '7%',
    backgroundColor: '#202c33',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    width: '70%',
    height: '80%',
    backgroundColor: '#2a3942',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputMessage: {
    backgroundColor: '#2a3942',
    color: '#fff',
  },
  button: {
    width: '20%',
    height: '80%',
    backgroundColor: '#8696a0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s ease',
    borderRadius: 5,
  },
  buttonHover: {
    backgroundColor: '#00da60',
  },
  chatPrivado: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
    flexDirection: 'row',
  },
  sidebarPrivado: {
    height: '100%',
    width: '25%',
    backgroundColor: 'red',
  },
  chatPrivadoMessages: {
    height: '100%',
    width: '75%',
  },
  headerPrivado: {
    height: '7%',
    width: '100%',
  },
  participante: {
    backgroundColor: '#075E54',
    marginLeft: 'auto',
  },
});

export default styles;
