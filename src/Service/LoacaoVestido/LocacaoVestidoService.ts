import Locacao from "@/types/LocacaoVestido/LocacaoVestidoType";
import axios from "axios";
import { Response } from "../Rest";
import PagamentoLocacao from "@/types/Pagamento";

const url_base = 'http://localhost:8089/api/locacao';
const url_locacao_vestido = 'http://localhost:8089/api/locacaoVestido';
const url_pagamento_locacao = 'http://localhost:8089/api/pagamento-locacao';


class LocacaoVestidoService {

  public async findAllLocacoes(page: number, itemsPerPage: number): Promise<Response<Locacao[]>> {
    const response: Response<Locacao[]> = {
      hasError: false
    }

    try {
      const data = await axios.get(`${url_base}?page=${page - 1}&size${itemsPerPage}`);

      response.content = data.data.content;
      response.totalElements = data.data.totalElements;
      response.totalPages = data.data.totalPages;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        response.error = {
          message: error.response.data.message,
          code: error.response.status,
          type: error.response.data.error,
        };
      } else {
        response.error = { message: error.message };
      }

      response.hasError = true;
    }

    return response;
  }

  public async findAllLocacaoById(idLocacao: number): Promise<Response<Locacao[]>> {
    const response: Response<Locacao[]> = {
      hasError: false
    }

    try {
      const data = await axios.get(`${url_base}/${idLocacao}`);

      response.content = data.data;

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        response.error = {
          message: error.response.data.message,
          code: error.response.status,
          type: error.response.data.error,
        };
      } else {
        response.error = { message: error.message };
      }

      response.hasError = true;
    }

    // console.log('getLocacaoById Service', response)

    return response;
  }

  public async salvarLocacao(locacao: Locacao): Promise<Response<Locacao>> {
    const response: Response<Locacao> = {
      hasError: false
    }

    try {
      //console.log(`Cadastrando locação ${JSON.stringify(locacao)}`)

      const { data } = await axios.post(`${url_base}`, locacao, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      response.content = data.content
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        response.error = {
          message: error.response.data.message,
          code: error.response.status,
          type: error.response.data.error,
        };
      } else {
        response.error = { message: error.message };
      }

      response.hasError = true;
    }

    return response
  }

  public async deleteVestidoByLocacaoVestidoId(idLocacaoVestido: number): Promise<Response<Locacao[]>> {
    const response: Response<Locacao[]> = {
      hasError: false
    }

    try {
      await axios.delete(`${url_locacao_vestido}/${idLocacaoVestido}`);

      //response.content = data.data;

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        response.error = {
          message: error.response.data.message,
          code: error.response.status,
          type: error.response.data.error,
        };
      } else {
        response.error = { message: error.message };
      }

      response.hasError = true;
    }

    return response;
  }

  public async deletePagamentoLocacaoById(idPagamentoLocacao: number): Promise<Response<Locacao[]>> {
    const response: Response<Locacao[]> = {
      hasError: false
    }

    try {
      await axios.delete(`${url_pagamento_locacao}/${idPagamentoLocacao}`);

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        response.error = {
          message: error.response.data.message,
          code: error.response.status,
          type: error.response.data.error,
        };
      } else {
        response.error = { message: error.message };
      }

      response.hasError = true;
    }

    return response;
  }

  public async getPagamentosLocacaoByIdLocacao(idLocacao: number): Promise<Response<PagamentoLocacao[]>> {
    const response: Response<PagamentoLocacao[]> = {
      hasError: false
    }

    try {
      const data = await axios.get(`${url_pagamento_locacao}/${idLocacao}`);

      response.content = data.data;

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        response.error = {
          message: error.response.data.message,
          code: error.response.status,
          type: error.response.data.error,
        };
      } else {
        response.error = { message: error.message };
      }

      response.hasError = true;
    }

    return response;
  }

}

export default new LocacaoVestidoService;
