
import { Provider } from "react-redux"
import Router from "./router/Router.js";
import store from './store/store.js';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
