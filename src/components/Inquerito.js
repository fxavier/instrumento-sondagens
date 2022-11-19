import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GET_INQUERITOS } from "../graphql/queries";
import InqueritoRow from "./InqueritoRow";
import Pagination from "./Pagination";
import SearchInqueritos from "./SearchInqueritos";

const Inquerito = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { loading, error, data } = useQuery(GET_INQUERITOS, {
		variables: {
			page: page,
			search: search,
		},
	});

	if (loading)
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);

	if (error) return <p>An error ocurred.</p>;

	const inqueritos =
		searchResults.length > 0 ? searchResults : data.inqueritos.results;

	const onPaginateFront = () => {
		setPage(page + 1);
	};

	const onPaginateBack = () => {
		setPage(page - 1);
	};

	return (
		<>
			<div>
				<SearchInqueritos setSearchResults={setSearchResults} />
				<Button className="font-medium text-blue-600 hover:underline dark:text-blue-500 mt-8">
					<Link to={`/inquerito/add`}>Novo</Link>
				</Button>
			</div>
			<div className="container mx-auto py-16">
				<Table hoverable={true}>
					<Table.Head>
						<Table.HeadCell>Provincia</Table.HeadCell>
						<Table.HeadCell>Distrito</Table.HeadCell>
						<Table.HeadCell>Unidade Sanitaria</Table.HeadCell>
						<Table.HeadCell>Data de Sondagem</Table.HeadCell>
						<Table.HeadCell>Entrevistador</Table.HeadCell>
						<Table.HeadCell>Razoes de procura de Intervenções</Table.HeadCell>
						<Table.HeadCell>Faixa Etária </Table.HeadCell>
						<Table.HeadCell>Sector atendido</Table.HeadCell>
						<Table.HeadCell>serviços de prevenção recebeu</Table.HeadCell>
						<Table.HeadCell>
							serviços Cuidados e Tratamentos recebeu
						</Table.HeadCell>

						<Table.HeadCell>
							<span className="sr-only">Edit</span>
						</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Remover</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{inqueritos.map((inquerito) => (
							<InqueritoRow key={inquerito.id} inquerito={inquerito} />
						))}
					</Table.Body>
				</Table>
				<div className="flex flex-row items-center justify-center text-center">
					<Pagination
						numberOfPages={data.inqueritos.total}
						totalRecords={data.inqueritos.size}
						paginateFront={onPaginateFront}
						paginateBack={onPaginateBack}
						currentPage={data.inqueritos.current}
						disabledBackButton={!data.inqueritos.hasPrev}
						disabledForwardButton={!data.inqueritos.hasNext}
					/>
				</div>
			</div>
		</>
	);
};

export default Inquerito;
