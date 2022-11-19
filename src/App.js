import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Listagem from "./pages/Listagem";
import InqueritoPage from "./pages/InqueritoPage";
import AddInquerito from "./components/AddInquerito";
import Form from "./pages/Form";

export const client = new ApolloClient({
	uri: "http://localhost:8000/graphql/",
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="flex relative">
					<div>
						<Sidebar />
					</div>

					<div className="flex flex-col w-full">
						<Header />
						<div className="container mx-auto w-full h-[91vh]">
							<Routes>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/" element={<Dashboard />} />
								<Route path="/inquerito" element={<InqueritoPage />} />
								<Route path="/inquerito/add" element={<AddInquerito />} />
								<Route path="/listagem" element={<Listagem />} />
								<Route path="/form" element={<Form />} />
							</Routes>
						</div>
						<Footer />
					</div>
				</div>
			</Router>
		</ApolloProvider>
	);
};

export default App;
