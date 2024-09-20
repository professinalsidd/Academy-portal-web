import AllRoutes from "./routes/allRoutes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AllRoutes />
      </PersistGate>
    </Provider>
  );
};

export default App;
