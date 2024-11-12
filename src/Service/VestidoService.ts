import Vestido from "@/types/VestidoType";
import axios from "axios";
import { Response } from "./Rest";

const url_base = 'http://localhost:8089/api/vestido';

class VestidoService {

  public async getAllVestidos(page: number, itemsPerPage: number): Promise<Response<Vestido[]>> {
    const response: Response<Vestido[]> = {
      hasError: false
    };

    try {
      const data = await axios.get(`${url_base}?page=${page - 1}&size=${itemsPerPage}`)

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

    return response
  }

  public async getVestidoById(idVestido: number): Promise<Response<Vestido>> {
    const response: Response<Vestido[]> = {
      hasError: false
    };

    try {
      const data = await axios.get(`${url_base}/${idVestido}`)

      response.content = data.data.content;

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

  public async cadastrarVestido(vestido: Vestido): Promise<Response<Vestido>> {
    const response: Response<Vestido> = {
      hasError: false
    };


    try {
      console.log(`vestido sendo cadastrado ${JSON.stringify(vestido)}`)

      const { data } = await axios.post(`${url_base}`, { ...vestido });

      response.content = data.content;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        response.error = {
          message: error.response.data.message,
          code: error.response.status,
          type: error.response.data.error,
        }
      } else {
        response.error = { message: error.message }
      }

      response.hasError = true
    }

    return response;
  }

  public async findByNuVstido(nuVestido: string, page: number, itemsPerPage: number): Promise<Vestido[]> {
    const response = new Response<Vestido[]>();

    try {
      const response = await axios.get(`${url_base}/vestido/${nuVestido}?page=${page - 1}&size=${itemsPerPage}`);

      return response.data.content;
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
  }

}

export default new VestidoService;
