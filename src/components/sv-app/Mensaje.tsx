import { Text, View, StyleSheet, Button } from 'react-native';

// import Checkbox from '@mui/material/Checkbox';
// or
// import { Checkbox } from '@mui/material';

export const Mensaje = ({mensaje, messageId, setMessageId, setMessage }:any,) => {
  const handlePress = (mensaje:any) => {
    setMessageId(mensaje.mensajeId)
    if (mensaje.mensajeDescripcion == '¿Quieres una tarjeta?') {
      setMessage('Quiero una tarjeta')
    }else if(mensaje.mensajeDescripcion == '¿Necesitas un prestamo?'){
      setMessage('Necesito un prestamo')
    }else if(mensaje.mensajeDescripcion == '¿Quieres hablar con un agente?'){
      setMessage('Quiero Hablar con un agente')
    }else if (mensaje.mensajeDescripcion == '¿Crédito?') {
      setMessage('Crédito')
    }else if(mensaje.mensajeDescripcion == '¿Debito?'){
      setMessage('Debito')
    }else if(mensaje.mensajeDescripcion == 'Gs. 1.000.000'){
      setMessage('Gs. 1.000.000')
    }else if (mensaje.mensajeDescripcion == 'Gs. 1.500.000') {
      setMessage('Gs. 1.500.000')
    }else if(mensaje.mensajeDescripcion == 'Gs. 2.000.000'){
      setMessage('Gs. 2.000.000')
    }
  }

  return (
    <View style={[styles.chatMessagesMessage, mensaje.participante.participanteTipo == 'P' ? styles.participante : null]}>
      <Text style={styles.title} >{mensaje.participante.participanteNombre}</Text>
      <Text style={styles.text}>{mensaje.mensajeDescripcion}</Text>
      {/* <Checkbox onChange={()=>handlePress(mensaje)}/> */}
      {
        mensaje.pregunta == true ?
        (<Button title='Seleccionar' onPress={()=>handlePress(mensaje)}/>)
        :
        (undefined)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  seleccionar: {
    backgroundColor: ''
  },
  text: {
    color: '#fff'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold'
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
  },
  chatMessages: {
    width: '100%',
    height: '86%',
    backgroundColor: '#111b21',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },
  chatMessagesMessage: {
    margin: 10,
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

