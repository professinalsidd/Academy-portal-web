import AllRoutes from "./routes/allRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
};

export default App;
