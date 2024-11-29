import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ChatsBrowser from "./pages/ChatsBrowser";
import Chat from "./pages/Chat";
import PageNotFound from "./pages/PageNotFound";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/template-chat" element={<Home />} />
        <Route path="/template-chat/chats" element={<ChatsBrowser />} />
        <Route path="/template-chat/chat/:ChatId" element={<Chat />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
