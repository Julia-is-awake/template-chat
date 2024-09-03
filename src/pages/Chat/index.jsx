import { useState, useEffect } from "react";
import mediumGlobe from "../../../public/mediumGlobe.png";
import tabOption from "../../../public/tabOption.svg";
import "./chat.css";
import { Link } from "react-router-dom";


const generateColorFromNick = (nick) => {
    let hash = 0;
    for (let i = 0; i < nick.length; i++) {
        hash = nick.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash & 0x00FFFFFF) >> 0).toString(16).padStart(6, '0')}`;
    return color;
};

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [user, setUser] = useState({ nick: 'Manu' });

    const handleSend = () => {
        if (inputValue.trim() === "") return;

        const newMessage = {
            id: messages.length + 1,
            username: user.nick,
            text: inputValue,
            color: generateColorFromNick(user.nick)
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <div className="container">
            <div className="browser-window">
                <div className="browser-header">
                    <div className="header-title">
                        <img src={mediumGlobe} alt="icone de globo" />
                        <h1>Chat-in.ho</h1>
                    </div>
                    <div className="tab-options">
                        <button>
                            <p
                                style={{
                                    color: "#818181",
                                    textShadow: "rgba(0,0,0,0.25) 0 3px 1px",
                                }}
                            >
                                _
                            </p>
                        </button>
                        <button>
                            <img
                                src={tabOption}
                                alt="icone do header"
                                style={{ filter: "drop-shadow(0 3px 1px rgba(0,0,0,0.25)" }}
                            />
                        </button>
                        <Link to="/chats" style={{ textDecoration: 'none' }}>
                            <button
                                 style={{
                                    cursor: "pointer",
                                    textShadow: "rgba(0,0,0,0.25) 0 3px 1px",
                                    borderColor: "#ffffff",
                                }}
                            >
                                <p>X</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="chat-area">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className="chat-message"
                        >
                            <span className="username" style={{ color: message.color }}>
                                {message.username}:
                            </span>
                            <span>{message.text}</span>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        className="message-area"
                        type="text"
                        placeholder="Digite sua mensagem"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="btn-send" onClick={handleSend}>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
