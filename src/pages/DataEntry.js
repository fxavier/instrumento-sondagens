import {
	Box,
	Container,
	Grid,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";

import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import HeaderForm from "../components/HeaderForm";

const DataEntrySchema = yup.object().shape({
	nome: yup
		.string()
		.min(3, "O nome Nao deve ter menos que 4 caracteres")
		.required("O nome e obrigatorio"),
	provincia: yup.string().required("Obrigatorio"),
	distrito: yup.string().required("Obrigatorio"),
	us: yup.string().required("Obrigatorio"),
	razoes: yup.string().required("Obrigatorio"),
	faixa_etaria: yup.string().required("Obrigatorio"),
	sector_clinico: yup.string().required("Obrigatorio"),
	servico_prevencao: yup.string().required("obrigatorio"),
	servico_cuidado_tratamento: yup.string().required("obrigatorio"),
});

const initial_form_state = {
	nome: "",
	provincia: "",
	distrito: "",
	us: "",
	razoes: "",
	faixa_etaria: "",
	sector_clinico: "",
	servico_prevencao: "",
	servico_cuidado_tratamento: "",
};

const DataEntry = () => {
	const isNonMobile = useMediaQuery("(min-width:600px)");
	const handleFormSubmit = (values) => {
		console.log(values);
	};
	return (
		<Box m="20px">
			<HeaderForm Title="INTRODUZ DADOS" subtitle="Introducao de novos dados" />
			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initial_form_state}
				validationSchema={DataEntrySchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
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
								size="small"
								variant="outlined"
								type="text"
								label="Nome"
								onBlur={handleBlur}
								onChange={handleChange}
								name="nome"
								value={values.nome}
								error={!!touched.nome && !!errors.nome}
								helperText={touched.nome && errors.nome}
								sx={{ gridColumn: "span 2" }}
							/>
							<Select
								labelId="provincia"
								id="provincia"
								value={values.provincia}
								label="Provincia"
								error={!!touched.provincia && !!errors.provincia}
								helperText={touched.provincia && errors.provincia}
								onChange={handleChange}
								size="small"
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default DataEntry;
