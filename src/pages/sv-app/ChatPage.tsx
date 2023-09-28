import './css/chatpage.css'

export const ChatPage = () => {
  return (
    <div>
        <div className="header">
            <div className="username">Username</div>
        </div>
        <div className="chat-main-container">
            <div className="chat-messages-container">
                <div className="chat-messages"></div>

                <div className="container-input">
                    <input 
                        type="text"
                        className="inputMessage"
                        placeholder="Escriba un Mensaje"
                    />
                    <button>></button>
                </div>
            </div>
        </div>
    </div>
  )
}
