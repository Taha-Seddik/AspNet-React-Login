import "./styles/App.css";
import { Provider } from "react-redux";
import store from "./redux-store/store";
import { RoutesWrapper } from "./routes/routes";
import AuthProvider from "./utils/authProvider";
import { userManager } from "./api/userService";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider userManager={userManager}>
        <div className="App">
          <RoutesWrapper />
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
