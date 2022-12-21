import React, { useState } from "react";
import format from "date-fns/format";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
	GET_DISTRITO_BY_PROVINCE,
	GET_FAIXAS_ETARIAS,
	GET_INQUERITOS,
	GET_INTERVENCOES,
	GET_PROVINCIAS,
	GET_SECTORES_CLINICOS,
	GET_SERVICOS_CUIDADOS,
	GET_SERVICOS_PREVENCAOS,
	GET_UNIDADES_SANITARIAS_BY_DISTRICT,
} from "../graphql/queries";
import { ADD_SONDAGEM } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

const AddInquerito = () => {
	const [provincias, setProvincias] = useState([]);
	const [provinciaId, setProvinciaId] = useState(0);
	const [distritos, setDistritos] = useState([]);
	const [distritoId, setDistritoId] = useState(0);
	const [unidades, setUnidades] = useState([]);
	const [usId, setUsId] = useState(0);
	const [razoes, setRazoes] = useState([]);
	const [razaoId, setRazaoId] = useState(0);
	const [faixasEtarias, setFaixasEtarias] = useState([]);
	const [faixaEtariaId, setFaixaEtariaId] = useState(0);
	const [sectorClinico, setSectorClinico] = useState([]);
	const [sectorId, setSectorId] = useState(0);
	const [servicosPrevencaos, setServicosPrevencaos] = useState([]);
	const [servicoPrevencaoId, setSevicoPrevencaoId] = useState(0);
	const [sevicosCuidaddos, setServicosCuidaddos] = useState([]);
	const [servicoCuidadosId, setServicosCuidaddosId] = useState(0);
	const [dataSondagem, setDataSondagem] = useState(
		format(new Date(new Date()), "yyyy-MM-dd")
	);
	const [nomeEntrevistador, setNomeEntrevistador] = useState("");

	const { loading, error, data } = useQuery(GET_PROVINCIAS);
	const {
		loading: distritoLoading,
		error: distritoError,
		data: distritoData,
	} = useQuery(GET_DISTRITO_BY_PROVINCE, {
		variables: {
			provinciaId: provinciaId,
		},
	});

	const {
		loading: usLoading,
		error: usError,
		data: usData,
	} = useQuery(GET_UNIDADES_SANITARIAS_BY_DISTRICT, {
		variables: {
			distritoId,
		},
	});

	const {
		loading: razoesLoading,
		error: razoesError,
		data: razoesData,
	} = useQuery(GET_INTERVENCOES);

	const {
		loading: faixasEtariasLoading,
		error: faixasEtariasError,
		data: faixasEtariasData,
	} = useQuery(GET_FAIXAS_ETARIAS);

	const {
		loading: sectorLoading,
		error: sectorError,
		data: sectorData,
	} = useQuery(GET_SECTORES_CLINICOS);
	const {
		loading: servicosPrevencaoLoading,
		error: servicosPrevencaoError,
		data: servicosPrevencaoData,
	} = useQuery(GET_SERVICOS_PREVENCAOS);
	const {
		loading: servicoCuiddadosLoading,
		error: servicoCuiddadosError,
		data: servicoCuidadosData,
	} = useQuery(GET_SERVICOS_CUIDADOS);

	const [add_Sondagem] = useMutation(ADD_SONDAGEM, {
		variables: {
			dataInquerito: dataSondagem,
			provinciaId: provinciaId,
			distritoId: distritoId,
			unidadeSanitariaId: usId,
			nome: nomeEntrevistador,
			faixaEtariaId: faixaEtariaId,
			intervencaoId: razaoId,
			sectorClinicoId: sectorId,
			servicoPrevencaoId: servicoPrevencaoId,
			servicoCuidadoTratamentoId: servicoCuidadosId,
		},
		refetchQueries: [{ query: GET_INQUERITOS }],
	});

	const navigate = useNavigate();

	const handleProvincias = (cod) => {
		const provinceData = data.provincias.filter((item) => item.id === cod);
		setProvincias(provinceData);
		const [{ id }] = provinceData;
		setProvinciaId(id);
	};

	const handleDistritos = (codProvincia) => {
		const dataDistrito = distritoData.distritoByProvince.filter(
			(item) => item.id === codProvincia
		);
		setDistritos(dataDistrito);
		//const [{ __typename, id, nome }] = sectorData;
		const [{ id }] = dataDistrito;
		setDistritoId(id);
		console.log(codProvincia);
	};

	const handleUnidadeSanitarias = (codDistrito) => {
		const dataUs = usData.unidadesSanitariasByDistrict.filter(
			(item) => item.id === codDistrito
		);
		setUnidades(dataUs);
		const [{ id }] = dataUs;
		setUsId(id);
		console.log(usId);
	};

	const handleRazoes = (cod) => {
		const dataRazao = razoesData.intervencoes.filter((item) => item.id === cod);
		setRazoes(dataRazao);
		const [{ id }] = dataRazao;
		setRazaoId(id);
	};

	const handleFaixasEtarias = (cod) => {
		const faixaData = faixasEtariasData.faixasEtarias.filter(
			(item) => item.id === cod
		);
		setFaixasEtarias(faixaData);
		const [{ id }] = faixaData;
		setFaixaEtariaId(id);
	};

	const handleSectorClinicos = (cod) => {
		const dataSector = sectorData.sectoresClinicos.filter(
			(item) => item.id === cod
		);
		setSectorClinico(dataSector);
		const [{ id }] = dataSector;
		setSectorId(id);
	};

	const handleServicosPrevencao = (cod) => {
		const dataServicoPrevencao =
			servicosPrevencaoData.servicosPrevencaos.filter(
				(item) => item.id === cod
			);
		setServicosPrevencaos(dataServicoPrevencao);
		const [{ id }] = dataServicoPrevencao;
		setSevicoPrevencaoId(id);
	};

	const handleServicosCuidados = (cod) => {
		const dataServicoCuidados = servicoCuidadosData.servicosCuidados.filter(
			(item) => item.id === cod
		);
		setServicosCuidaddos(dataServicoCuidados);
		const [{ id }] = dataServicoCuidados;
		setServicosCuidaddosId(id);
	};

	const handleDataSondagem = (newDate) => {
		const formattedDate = format(new Date(newDate), "yyyy-MM-dd");
		setDataSondagem(formattedDate);

		console.log(dataSondagem);
	};

	const clearFields = () => {
		setProvincias([]);
		setDistritos([]);
		setUnidades([]);
		setNomeEntrevistador("");
		setFaixasEtarias([]);
		setRazoes([]);
		setSectorClinico([]);
		setServicosCuidaddos([]);
		setServicosPrevencaos([]);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		add_Sondagem(
			provinciaId,
			distritoId,
			usId,
			nomeEntrevistador,
			dataSondagem,
			faixaEtariaId,
			razaoId,
			sectorId,
			servicoPrevencaoId,
			servicoCuidadosId
		);
		clearFields();
		navigate("/inquerito");
	};

	return (
		<>
			<div className="container mx-auto pb-16 shadow-lg rounded-lg bg-white w-3/4 h-auto m-12">
				<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
					<form onSubmit={onSubmit}>
						<h3 className="text-xl font-medium font-poppins text-center text-gray-900 dark:text-white">
							Instrumento de Sondagens
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<div id="provincia">
								<div className="mb-2 block">
									<Label htmlFor="provincia" value="Selecione a provincia" />
								</div>
								<Select
									id="provincia"
									onChange={(e) => handleProvincias(e.target.value)}
								>
									<option value="">Selecione provincia</option>
									{!loading && !error
										? data.provincias.map((provincia) => (
												<option key={provincia.id} value={provincia.id}>
													{provincia.nome}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>
							<div id="distrito">
								<div className="mb-2 block">
									<Label htmlFor="distrito" value="Distritos" />
								</div>
								<Select
									id="distrito"
									onChange={(e) => handleDistritos(e.target.value)}
								>
									<option value="">Selecione distritos</option>
									{!distritoLoading && !distritoError
										? distritoData.distritoByProvince.map((distrito) => (
												<option key={distrito.id} value={distrito.id}>
													{distrito.nome}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div id="us">
								<div className="mb-2 block">
									<Label htmlFor="us" value="Unidade Sanitaria" />
								</div>
								<Select
									id="us"
									onChange={(e) => handleUnidadeSanitarias(e.target.value)}
								>
									<option value="">Selecione a Unidade Sanitaria</option>
									{!usLoading && !usError
										? usData.unidadesSanitariasByDistrict.map((us) => (
												<option key={us.id} value={us.id}>
													{us.nome}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>

							<div>
								<div className="mb-2 block">
									<Label htmlFor="nome" value="Nome do entrevistador" />
								</div>
								<TextInput
									id="nome"
									type="text"
									required={true}
									value={nomeEntrevistador}
									onChange={(e) => setNomeEntrevistador(e.target.value)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div id="razao">
								<div className="mb-2 block">
									<Label
										htmlFor="razao"
										value="Razões de procura dos serviços de saúde (Intervenções)"
									/>
								</div>
								<Select
									id="razao"
									onChange={(e) => handleRazoes(e.target.value)}
								>
									<option value="">Selecione Intervencao</option>
									{!razoesLoading && !razoesError
										? razoesData.intervencoes.map((razao) => (
												<option key={razao.id} value={razao.id}>
													{razao.nome}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>
							<div id="area">
								<div className="mb-2 block">
									<Label htmlFor="faixaEtaria" value="Faixa Etária " />
								</div>
								<Select
									id="faixaEtaria"
									onChange={(e) => handleFaixasEtarias(e.target.value)}
								>
									<option value="">Selecione Faixa Etária</option>
									{!faixasEtariasLoading && !faixasEtariasError
										? faixasEtariasData.faixasEtarias.map((faixas) => (
												<option key={faixas.id} value={faixas.id}>
													{faixas.descricao}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4"></div>
						<div id="sectorClinico">
							<div className="mb-2 block">
								<Label
									htmlFor="sectorClinico"
									value="Em que sector foi atendido?"
								/>
							</div>
							<Select
								id="sectorClinico"
								onChange={(e) => handleSectorClinicos(e.target.value)}
							>
								<option value="">Selecione Sector Clinico</option>
								{!sectorLoading && !sectorError
									? sectorData.sectoresClinicos.map((sectorClinico) => (
											<option key={sectorClinico.id} value={sectorClinico.id}>
												{sectorClinico.nome}
											</option>
									  ))
									: "No data"}
							</Select>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<div id="data">
									<div className="mb-3 block">
										<Label htmlFor="Data" />
									</div>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<Stack spacing={3}>
											<DesktopDatePicker
												components={{
													OpenPickerIcon: CalendarMonthIcon,
													LeftArrowIcon: ArrowLeftIcon,
													RightArrowIcon: ArrowRightIcon,
												}}
												label="Data"
												inputFormat="dd/MM/yyyy"
												value={dataSondagem}
												onChange={handleDataSondagem}
												renderInput={(params) => <TextField {...params} />}
											/>
										</Stack>
									</LocalizationProvider>
								</div>
							</div>
						</div>

						<div id="servicoPrevencao">
							<div className="mb-2 block">
								<Label
									htmlFor="servicoPrevencao"
									value="Que os serviços/pacotes de prevenção que recebeu?"
								/>
							</div>
							<Select
								id="servicoPrevencao"
								onChange={(e) => handleServicosPrevencao(e.target.value)}
							>
								<option value="">
									Selecione serviços de prevenção que recebeu
								</option>
								{!servicosPrevencaoLoading && !servicosPrevencaoError
									? servicosPrevencaoData.servicosPrevencaos.map(
											(prevencao) => (
												<option key={prevencao.id} value={prevencao.id}>
													{prevencao.nome}
												</option>
											)
									  )
									: "No data"}
							</Select>
						</div>

						<div id="servicoCuidados">
							<div className="mb-2 block">
								<Label
									htmlFor="servicoCuidados"
									value="Que serviços de Cuidados e Tratamento recebeu?"
								/>
							</div>
							<Select
								id="servicoCuidados"
								onChange={(e) => handleServicosCuidados(e.target.value)}
							>
								<option value="">
									Selecione serviços de cuidados e tratamento que recebeu
								</option>
								{!servicoCuiddadosLoading && !servicoCuiddadosError
									? servicoCuidadosData.servicosCuidados.map((cuidados) => (
											<option key={cuidados.id} value={cuidados.id}>
												{cuidados.nome}
											</option>
									  ))
									: "No data"}
							</Select>
						</div>

						<div className="flex flex-row space-x-4 justify-start items-center w-full m-4">
							<Button type="submit" color="success">
								Salvar
							</Button>
							<Button color="failure" onClick={clearFields}>
								Cancelar
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddInquerito;
