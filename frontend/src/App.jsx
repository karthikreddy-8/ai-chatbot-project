import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatPage />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;