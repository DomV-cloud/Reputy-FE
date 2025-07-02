import { UserProvider } from "./Context/UserContext";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
}

export default App;
