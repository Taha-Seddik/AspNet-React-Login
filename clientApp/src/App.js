import "./styles/App.css";
import { Provider } from "react-redux";
import store from "./redux-store/store";
import { RoutesWrapper } from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RoutesWrapper />
      </div>
    </Provider>
  );
}

export default App;
