import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./chatsBrowser.css";
import { Link } from "react-router-dom";

import mediumGlobe from "/mediumGlobe.png";
import tabOption from "/tabOption.svg";
import privateRoom from "/privateRoom.png";
import publicRoom from "/publicRoom.png";

function ChatsBrowser() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("sessao")) {
      navigate("/template-chat");
    } else {
      setUser(JSON.parse(localStorage.getItem("sessao")));
    }
  }, []);

  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    try {
      const { data } = await api.get("/salas", {
        headers: {
          token: user.token,
          idUser: user.idUser,
          nick: user.nick,
        },
      });
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sairDaSala = async () => {
    if (confirm("Tem certeza que deseja sair do chat?")) {
      try {
        await api.delete("/sair", {
          headers: {
            token: user.token,
            idUser: user.idUser,
            nick: user.nick,
          },
        });
      } catch (error) {
        console.log(error);
      }
      localStorage.setItem("sessao", "");
      navigate("/template-chat");
    }
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
            <button>
              <p
                style={{
                  cursor: "pointer",
                  textShadow: "rgba(0,0,0,0.25) 0 2px 1px",
                }}
              >
                +
              </p>
            </button>
            <button
              style={{
                cursor: "pointer",
                textShadow: "rgba(0,0,0,0.25) 0 3px 1px",
              }}
              onClick={sairDaSala}
            >
              <p>X</p>
            </button>
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
                <Link to={`/template-chat/chat/${chat._id}`}>Entrar</Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatsBrowser;
