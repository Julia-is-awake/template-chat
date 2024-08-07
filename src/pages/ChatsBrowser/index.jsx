import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./chatsBrowser.css";

import mediumGlobe from "../../../public/mediumGlobe.png";

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
          <img src={mediumGlobe} alt="icone de globo" />
        </div>
        <div className="browser-chats">
          {chats &&
            chats.map((chat) => (
              <div key={chat._id}>
                <p>{chat.nome}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatsBrowser;
