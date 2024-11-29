import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./chat.css";
import api from "../../services/api";
import { useState, useEffect } from "react";

/*Imagens*/
import mediumGlobe from "/mediumGlobe.png";
import tabOption from "/tabOption.svg";

function Chat() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chatName, setChatName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { ChatId } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("sessao")) {
      navigate("/template-chat");
    } else {
      setUser(JSON.parse(localStorage.getItem("sessao")));
    }
  }, []);

  useEffect(() => {
    getData();
    getChatName();
  }, [user]);

  const getData = async () => {
    const { data } = await api.get(
      `sala/mensagens/?idSala=${ChatId}&timestamp=${Math.floor(
        Date.now() / 1000
      )}`,
      {
        headers: {
          token: user.token,
          idUser: user.idUser,
          nick: user.nick,
        },
      }
    );
    console.log(data.msgs);
    setMessages(data.msgs);
  };

  const getChatName = async () => {
    const { data } = await api.get("/salas", {
      headers: {
        token: user.token,
        idUser: user.idUser,
        nick: user.nick,
      },
    });
    console.log(data[0]._id);
    console.log(ChatId);
    data.map((chat) => {
      if (chat._id === ChatId) {
        setChatName(chat.nome);
      }
    });
  };

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      msg: inputValue,
      idSala: ChatId,
    };

    const newViewMessage = {
      nick: user.nick,
      msg: inputValue,
      timestamp: Date.now(),
    };

    try {
      await api.post("/sala/mensagem", newMessage, {
        headers: {
          token: user.token,
          idUser: user.idUser,
          nick: user.nick,
        },
      });
      setInputValue("");
    } catch (error) {
      console.log(error);
    }

    console.log(newMessage);
    setMessages([...messages, newViewMessage]);
    setInputValue("");
  };

  // const sairDaSala = async () => {
  //   if (confirm("Tem certeza que deseja sair da sala?") === true) {
  //     try {
  //       await api.put(`/sala/sair?idsala=${ChatId}`, {
  //         headers: {
  //           token: user.token,
  //           idUser: user.iduser,
  //           nick: user.nick,
  //         },
  //       });
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //     navigate("/template-chat/chats");
  //   }
  // };

  const sairDaSala = async () => {
    if (confirm("Tem certeza que deseja sair da sala?") === true) {
      try {
        const userData = JSON.parse(localStorage.getItem("sessao"));
        const headers = createHeaders(userData);

        const response = await api.put(
          `/sala/sair?idsala=${ChatId}`,
          {},
          { headers }
        );
        console.log(response);
        setSalaSelecionada(null);
        setIdSalaSelecionada(null);
        setMensagens([]);
      } catch (error) {
        console.log(error);
      }
      navigate("/template-chat/chats");
    }
  };

  return (
    <div className="container">
      <div className="browser-window">
        <div className="browser-header">
          <div className="header-title">
            <img src={mediumGlobe} alt="icone de globo" />
            <h1>{chatName}</h1>
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
                onClick={sairDaSala}
              >
                X
              </p>
            </button>
          </div>
        </div>
        <div>
          <div className="messages">
            <div className="chat-area">
              {messages.map((message) => (
                <div key={message.timestamp} className="chat-message">
                  <span
                    className={user.nick === message.nick ? "proprio" : "outro"}
                  >
                    {message.nick}:
                  </span>
                  <span>{message.msg}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-input">
            <input
              className="message-area"
              type="text"
              placeholder="Digite sua mensagem"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn-send" onClick={handleSend}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
