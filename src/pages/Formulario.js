import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderForm from "../components/HeaderForm";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROVINCIAS } from "../graphql/queries";

const Formulario = () => {
	const isNonMobile = useMediaQuery("(min-width:600px)");
	// eslint-disable-next-line
	const [provincias, setProvincias] = useState([]);

	const { loading, error, data } = useQuery(GET_PROVINCIAS);

	/* const handleFormSubmit = (values) => {
		console.log(values);
	}; */

	return (
		<Box m="20px">
			<HeaderForm title="INTRODUZIR DADOS" subtitle="Introduzir novos dados" />

			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					alert(JSON.stringify(values, null, 2));
					console.log(values);
				}}
				validationSchema={checkoutSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<Form>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
							}}
						>
							<TextField
								fullWidth
								variant="outlined"
								type="text"
								label="First Name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.firstName}
								name="firstName"
								error={!!touched.firstName && !!errors.firstName}
								helpertext={touched.firstName && errors.firstName}
								sx={{ gridColumn: "span 4" }}
							/>

							<Select
								id="provincia"
								labelId="provincia"
								fullWidth
								size="small"
								variant="outlined"
								label="Provincia"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.provincia}
								name="provincia"
								error={!!touched.provincia && !!errors.provincia}
								helpertext={touched.provincia && errors.provincia}
								sx={{ gridColumn: "span 2" }}
							>
								{!loading && !error
									? data.provincias.map((provincia) => (
											<MenuItem key={provincia.id} value={provincia.id}>
												{provincia.nome}
											</MenuItem>
									  ))
									: "No data"}
							</Select>
							<TextField
								fullWidth
								size="small"
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
								type="text"
								label="Contact Number"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.contact}
								name="contact"
								error={!!touched.contact && !!errors.contact}
								helpertext={touched.contact && errors.contact}
								sx={{ gridColumn: "span 4" }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Address 1"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.address1}
								name="address1"
								error={!!touched.address1 && !!errors.address1}
								helpertext={touched.address1 && errors.address1}
								sx={{ gridColumn: "span 4" }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Address 2"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.address2}
								name="address2"
								error={!!touched.address2 && !!errors.address2}
								helpertext={touched.address2 && errors.address2}
								sx={{ gridColumn: "span 4" }}
							/>
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button type="submit" color="secondary" variant="contained">
								Create New User
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const phoneRegExp =
	/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	contact: yup
		.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.required("required"),
	address1: yup.string().required("required"),
	address2: yup.string().required("required"),
	provincia: yup.string().required("required"),
});
const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	contact: "",
	address1: "",
	address2: "",
	provincia: "",
};

export default Formulario;
