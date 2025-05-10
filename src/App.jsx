import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
	return (
		<Provider store={store}>
			<Router basename="/">
				<Routes>
					<Route path="/" element={<Body />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
