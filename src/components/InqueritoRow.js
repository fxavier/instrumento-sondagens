import { Table } from "flowbite-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import format from "date-fns/format";
const InqueritoRow = ({ inquerito }) => {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{inquerito.provincia.nome}
			</Table.Cell>
			<Table.Cell>{inquerito.distrito.nome}</Table.Cell>
			<Table.Cell>{inquerito.unidadeSanitaria.nome}</Table.Cell>
			<Table.Cell>
				{format(new Date(inquerito.dataInquerito), "dd-MM-yyyy")}
			</Table.Cell>
			<Table.Cell>{inquerito.nome}</Table.Cell>
			<Table.Cell>{inquerito.razoesProcuraServicos.nome}</Table.Cell>
			<Table.Cell>{inquerito.faixaEtaria.descricao}</Table.Cell>
			<Table.Cell>{inquerito.sectorClinico.nome}</Table.Cell>
			<Table.Cell>{inquerito.servicoPrevencaoRecebeu.nome}</Table.Cell>
			<Table.Cell>{inquerito.servicoCuidadoTratamentoRecebeu.nome}</Table.Cell>

			<Table.Cell>
				<a
					href="/"
					className="font-medium text-blue-600 hover:underline dark:text-blue-500"
				>
					<FaEdit />
				</a>
			</Table.Cell>
			<Table.Cell>
				<a
					href="/"
					className="font-medium text-blue-600 hover:underline dark:text-blue-500"
				>
					<FaTrash />
				</a>
			</Table.Cell>
		</Table.Row>
	);
};

export default InqueritoRow;
