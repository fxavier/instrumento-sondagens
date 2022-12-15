import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import client from "./ApolloClient";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<ApolloProvider client={client}>
				<Router>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</Router>
			</ApolloProvider>
		</AuthProvider>
	</React.StrictMode>
);
