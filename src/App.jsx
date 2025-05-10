import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<Router basename="/">
			<Routes>
				<Route path="/" element={<Body />}>
					<Route path="/" element={<HomePage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
