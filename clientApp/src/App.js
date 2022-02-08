import "./styles/App.css";
import { Provider } from "react-redux";
import store from "./redux-store/store";
import { RoutesWrapper } from "./routes/routes";
import { OidcProvider } from "redux-oidc";
import { userManager } from "./config/userManager";

function App() {
  return (
    <Provider store={store}>
      <OidcProvider userManager={userManager} store={store}>
        <div className="App">
          <RoutesWrapper />
        </div>
      </OidcProvider>
    </Provider>
  );
}

export default App;
