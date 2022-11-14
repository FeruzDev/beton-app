import Auth from "./components/Auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import KirimTovar from "./components/KirimTovar";
import KirimPolya from "./components/KirimPolya";
import ChiqimPolya from "./components/ChiqimPolya";
import ChiqimTovar from "./components/ChiqimTovar";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div className="App d-flex justify-content-center">
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Auth} />
                <PrivateRoute path="/enter" exact component={KirimTovar} />
                <PrivateRoute path="/exit" exact component={ChiqimTovar} />
                <PrivateRoute path="/enter-product" exact component={KirimPolya} />
                <PrivateRoute path="/exit-product" exact component={ChiqimPolya} />
            </Switch>
        </BrowserRouter>
        <ToastContainer />

    </div>
  );
}

export default App;
