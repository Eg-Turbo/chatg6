import './App.css';
import { router } from "./router/router";
import store from "./redux/store"
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  );
}

export default App;
