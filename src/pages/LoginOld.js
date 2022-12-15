import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { basicSchema } from "../schema";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";

const onSubmit = async (values, actions) => {
	console.log(values.email);
	console.log(actions);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	actions.resetForm();
};

const Login = () => {
	const paperStyle = {
		padding: 20,
		height: "550",
		width: 350,
		margin: "20px auto",
	};
	const avatarStyle = { backgroundColor: "#1bbd7e" };
	const btnstyle = { margin: "8px 0" };
	const context = useContext(AuthContext);
	const navigate = useNavigation();
	const [erros, setErros] = useState([]);

	const {
		values,
		touched,
		errors,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: basicSchema,
		onSubmit,
	});

	const [login] = useMutation(LOGIN, {
		update(proxy, { data: { loginUser: userData } }) {
			context.login(userData);
			//	navigate("/");
		},
		onError({ graphQLErrors }) {
			setErros(graphQLErrors);
		},
		variables: {
			email: values.email,
			password: values.password,
		},
	});

	// const onSubmit = async (values, actions) => {
	// 	console.log(values);
	// 	console.log(actions);
	// 	await new Promise((resolve) => setTimeout(resolve, 1000));
	// 	actions.resetForm();
	// 	login(values.email, values.password);
	// };

	return (
		<Box className="mt-36">
			<Paper elevetion={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockIcon />
					</Avatar>
					<h2>Sign In</h2>
				</Grid>
				<div className="flex flex-col-3 space-y-2.5">
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							variant="filled"
							type="text"
							label="Email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name="email"
							error={!!touched.email && !!errors.email}
							helpertext={touched.email && errors.email}
							sx={{ gridColumn: "span 2" }}
						/>
						<TextField
							fullWidth
							variant="filled"
							type="password"
							label="Password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
							error={!!touched.password && !!errors.password}
							helpertext={touched.password && errors.password}
							sx={{ gridColumn: "span 2" }}
						/>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button
								type="submit"
								color="primary"
								variant="contained"
								style={btnstyle}
								fullWidth
							>
								Entrar
							</Button>
						</Box>
					</form>
				</div>
			</Paper>
		</Box>
	);
};

export default Login;
