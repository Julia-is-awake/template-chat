import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./chatsBrowser.css";
import { Link } from "react-router-dom";

import mediumGlobe from "../../../public/mediumGlobe.png";
import tabOption from "../../../public/tabOption.svg";
import privateRoom from "../../../public/privateRoom.png";
import publicRoom from "../../../public/publicRoom.png";

function ChatsBrowser() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("sessao")) {
      navigate("/");
    } else {
      setUser(JSON.parse(localStorage.getItem("sessao")));
    }
  }, []);

  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    const { data } = await api.get("/salas", {
      headers: {
        token: user.token,
        idUser: user.idUser,
        nick: user.nick,
      },
    });
    console.log(data);
    setChats(data);
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
            <Link to="/" style={{ textDecoration: 'none' }}>
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
        <div className="browser-chats">
          {chats &&
            chats.map((chat) => (
              <div key={chat._id} className="chat-item">
                <div className="chat-icon">
                  <img
                    src={chat.tipo === "publica" ? publicRoom : privateRoom}
                    alt="ícone do chat"
                  />
                </div>
                <p>{chat.nome}</p>
                <Link to={`/chat/${chat._id}`}>Entrar</Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatsBrowser;
