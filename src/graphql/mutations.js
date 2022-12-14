import { gql } from "@apollo/client";

const ADD_SONDAGEM = gql`
	mutation createInquerito(
		$dataInquerito: Date!
		$provinciaId: Int!
		$distritoId: Int!
		$unidadeSanitariaId: Int!
		$nome: String!
		$faixaEtariaId: Int!
		$intervencaoId: Int!
		$sectorClinicoId: Int!
		$servicoPrevencaoId: Int!
		$servicoCuidadoTratamentoId: Int!
	) {
		createInquerito(
			dataInquerito: $dataInquerito
			provinciaId: $provinciaId
			distritoId: $distritoId
			unidadeSanitariaId: $unidadeSanitariaId
			nome: $nome
			faixaEtariaId: $faixaEtariaId
			intervencaoId: $intervencaoId
			sectorClinicoId: $sectorClinicoId
			servicoPrevencaoId: $servicoPrevencaoId
			servicoCuidadoTratamentoId: $servicoCuidadoTratamentoId
		) {
			inquerito {
				id
			}
		}
	}
`;

const LOGIN = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			user {
				id
				name
				email
				password
			}
			access
			refresh
		}
	}
`;

export { ADD_SONDAGEM, LOGIN };
