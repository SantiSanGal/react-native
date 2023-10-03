import './css/mensaje.css'
export const Mensaje = ({mensaje, messageId,setMessageId}:any,) => {
    console.log("mensaje desde componente", mensaje);

  return (
    <span 
      onClick={() => setMessageId(mensaje.mensajeId)}
      className={`chat-messages-message ${mensaje.participante.participanteTipo == 'P' ? 'participante': ''}`}>
        {
            mensaje.participante.participanteTipo == 'P' ?
                ('')
                :
                (<strong> Qbox </strong>)
        }
        <p className="chat-messages-message-text">
        {
          mensaje.participante.participanteTipo == 'P' ?
              ('')
              :
              (<div className="round">
                <input 
                  type="checkbox" 
                  id={`checkbox-${mensaje.mensajeId}`}
                  
                />
                <label htmlFor={`checkbox-${mensaje.mensajeId}`}></label>
              </div>)
        }
        {mensaje.mensajeDescripcion}
        {/* {
          mensaje.participante.participanteTipo == 'P' ?
              ('')
              :
              (<button className='option'>Sí</button>)
        } */}
        </p>
    </span>
  )
}
