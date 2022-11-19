import { gql } from "@apollo/client";

const GET_PROVINCIAS = gql`
	query getProvincias {
		provincias {
			id
			nome
		}
	}
`;

const GET_DISTRITO_BY_PROVINCE = gql`
	query getDistritoByProvince($provinciaId: Int!) {
		distritoByProvince(provinciaId: $provinciaId) {
			id
			provincia {
				nome
			}
			nome
		}
	}
`;

const GET_UNIDADES_SANITARIAS_BY_DISTRICT = gql`
	query getUnidadesSanitariasByDistrict($distritoId: Int!) {
		unidadesSanitariasByDistrict(distritoId: $distritoId) {
			id
			distrito {
				nome
				provincia {
					nome
				}
			}

			nome
		}
	}
`;

const GET_FAIXAS_ETARIAS = gql`
	query getFaixasEtarias {
		faixasEtarias {
			id
			descricao
		}
	}
`;

const GET_INTERVENCOES = gql`
	query getIntervencoes {
		intervencoes {
			id
			nome
		}
	}
`;

const GET_SERVICOS_PREVENCAOS = gql`
	query getServicosPrevencaos {
		servicosPrevencaos {
			id
			nome
		}
	}
`;

const GET_SERVICOS_CUIDADOS = gql`
	query getServicosCuidados {
		servicosCuidados {
			id
			nome
		}
	}
`;

const GET_SECTORES_CLINICOS = gql`
	query GetSectoresClinicos {
		sectoresClinicos {
			id
			nome
		}
	}
`;

const GET_INQUERITOS = gql`
	query getInqueritos($page: Int, $search: String) {
		inqueritos(page: $page, search: $search) {
			total
			size
			current
			hasNext
			hasPrev
			results {
				id
				nome
				provincia {
					nome
				}
				distrito {
					id
					nome
				}
				unidadeSanitaria {
					nome
				}
				dataInquerito
				razoesProcuraServicos {
					nome
				}
				faixaEtaria {
					id
					descricao
				}
				sectorClinico {
					id
					nome
				}
				servicoPrevencaoRecebeu {
					id
					nome
				}
				servicoCuidadoTratamentoRecebeu {
					id
					nome
				}
			}
		}
	}
`;

export {
	GET_PROVINCIAS,
	GET_DISTRITO_BY_PROVINCE,
	GET_UNIDADES_SANITARIAS_BY_DISTRICT,
	GET_SECTORES_CLINICOS,
	GET_SERVICOS_CUIDADOS,
	GET_FAIXAS_ETARIAS,
	GET_INTERVENCOES,
	GET_SERVICOS_PREVENCAOS,
	GET_INQUERITOS,
};
