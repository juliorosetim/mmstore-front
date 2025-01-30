import TipoPagamento from "@/types/TipoPagamento/TipoPagamentoType";
import axios from "axios";
import { Response } from "../Rest";

const url_base = 'http://localhost:8089/api/tipo-pagamento';


class TipoPagamentoService {

  // public async findAllTipoPagamento(page: number, itemsPerPage: number): Promise<Response<TipoPagamento[]>> {
  //   const reponse: Response<TipoPagamento[]> = {
  //     hasError: false
  //   };

  //   try {
  //     const data = await axios.get(`${url_base}?page=${page - 1}&size=${itemsPerPage}`);

  //     response.content = data.data.content;
  //     response.totalElements = data.data.totalElements;
  //     response.totalPages = data.data.totalPages;
  //   } catch (error: any) {
  //     if (error.response && error.response.data && error.response.data.message) {
  //       response.error = {
  //         message: error.response.data.message,
  //         code: error.response.status,
  //         type: error.response.data.error,
  //       };
  //     } else {
  //       response.error = { message: error.message };
  //     }

  //     response.hasError = true;
  //   }

  //   return reponse;
  // }

  public async findAllTipoPagamento(page: number, itemsPerPage: number): Promise<Response<TipoPagamento[]>> {
    const response: Response<TipoPagamento[]> = {
      hasError: false
    };

    try {
      const data = await axios.get(`${url_base}?page=${page - 1}&size=${itemsPerPage}`);

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

}

export default new TipoPagamentoService;
