import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./components/Body";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import store from "./store/store";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import Register from "./pages/Register";

function App() {
	return (
		<Provider store={store}>
			<Router basename="/">
				<Routes>
					<Route path="/" element={<Body />}>
						<Route path="/" element={<Feed />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/connections" element={<Connections />} />
						<Route path="/requests" element={<Requests />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
