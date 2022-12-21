import "./App.css";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Listagem from "./pages/Listagem";
import InqueritoPage from "./pages/InqueritoPage";
import AddInquerito from "./components/AddInquerito";

import Login from "./pages/Login";

import Layout from "./components/Layout";
import Formulario from "./pages/Formulario";

const App = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Login />} />

			<Route
				path="/dashboard"
				element={
					<Layout>
						<Dashboard />
					</Layout>
				}
			/>
			{/* <Route
				path="/"
				element={
					<Layout>
						<Login />
					</Layout>
				}
			/> */}
			<Route
				path="/inquerito"
				element={
					<Layout>
						<InqueritoPage />
					</Layout>
				}
			/>
			<Route
				path="/inquerito/add"
				element={
					<Layout>
						<AddInquerito />
					</Layout>
				}
			/>
			<Route
				path="/listagem"
				element={
					<Layout>
						<Listagem />
					</Layout>
				}
			/>
			<Route
				path="/form"
				element={
					<Layout>
						<Formulario />
					</Layout>
				}
			/>
		</Routes>
	);
};

// 	</ApolloProvider>
// </AuthProvider>
// );
//};

export default App;
