import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

function App() {
	return (
		<Router basename="/">
			<Routes>
				<Route path="/" element={<Body />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
