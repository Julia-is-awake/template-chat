import { useState } from "react";
import "./home.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userNick, setUserNick] = useState("");
  const navigate = useNavigate();

  const enterChatsBrowser = async (e) => {
    e.preventDefault();
    const user = {
      nick: userNick,
    };
    try {
      const response = await api.post("/entrar", user);

      const data = {
        idUser: response.data.idUser,
        nick: response.data.nick,
        token: response.data.token,
      };
      console.log(data);
      localStorage.setItem("sessao", JSON.stringify(data));
      navigate("/template-chat/chats");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <div>
        <div className="title  press-start-2p-regular">
          <h2>Bem-vindo ao</h2>
          <h1>Chat-in.ho</h1>
        </div>
        <div className="entrar">
          <textarea
            placeholder="Insira seu Nick"
            onChange={(e) => setUserNick(e.target.value)}
            value={userNick}
          ></textarea>
          <button onClick={enterChatsBrowser}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
