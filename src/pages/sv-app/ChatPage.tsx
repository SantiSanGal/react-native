import './css/chatpage.css'
import { genesysApi } from '../../api/genesysApi'
import { useEffect, useRef, useState } from 'react'
import { Mensaje } from '../../components/sv-app/Mensaje';

const getMessages = (setChat:any) => {
    genesysApi.get(`/chats/${localStorage.getItem('chatId')}`)
        .then(res => {
            console.log(res)
            setChat(res.data)
        })
        .catch(err => console.log(err))
}

export const ChatPage = () => {
    const [chat, setChat] = useState();
    const [message, setMessage] = useState('');
    const [messageId, setMessageId] = useState(230);
    const chatMessages = useRef();

    let data = {
        mensajeId: 230,
        mensaje:''
    }
    
    useEffect(() => {
        getMessages(setChat)
    }, [])

    useEffect(() => {
        chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
      }, [chat?.data?.chat.mensajes]);
    

    const handleSendMessage = () => {
        data.mensajeId = messageId
        data.mensaje = message

        genesysApi.put(`/chats/${localStorage.getItem('chatId')}`, data)
            .then((res) => {
                getMessages(setChat)
                setMessage('');
            })
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }
    
  return (
    <div>
        <div className="header">
            <div className="username"><strong>Qbox Asistente Virtual</strong></div>
        </div>
        <div className="chat-main-container">
            <div className="chat-messages-container">
                <div className="chat-messages" ref={chatMessages}>
                    {
                        chat?.data?.chat.mensajes.map(mensaje => (
                            <Mensaje
                                key={mensaje.mensajeId}
                                mensaje={mensaje}
                                messageId={messageId}
                                setMessageId={setMessageId}  
                            />
                        ))
                    }
                </div>

                <div className="container-input">
                    <input 
                        type="text"
                        id='message'
                        value={message}
                        onChange={handleChange}
                        className="inputMessage"
                        placeholder="Escriba un Mensaje"
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    </div>
  )
}
