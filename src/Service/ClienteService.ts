import Cliente from '@/types/ClienteType';
import axios from "axios";
import { Response } from "./Rest";

const url_base = 'http://localhost:8089/api/cliente';

class ClienteService{

    public async findAllClientes(page: number, itemsPerPage: number) : Promise<Response<Cliente[]>> {
      const response: Response<Cliente[]> = {
        hasError: false
      };

      try{
          const data = await axios.get(`${url_base}?page=${page-1}&size=${itemsPerPage}`);

          response.content = data.data.content;
          response.totalElements = data.data.totalElements;
          response.totalPages = data.data.totalPages;
      }catch (error:any) {
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


    public async deleteCliente(idCliente: number): Promise<Response<Cliente[]>>  {
      const response: Response<Cliente[]> = {
        hasError: false
      };

      try{
        await axios.delete(`${url_base}/${idCliente}`)

        const data = await this.findAllClientes(1, 10);

        response.content = data.content;
        response.totalElements = data.totalElements;
        response.totalPages = data.totalPages;
      }catch(error: any){
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

    public async cadastrarCliente(cliente: Cliente): Promise<Response<Cliente>>  {
      const response: Response<Cliente> = {
        hasError: false
      };

      try{
          console.log(`cadastrarCliente Service ${cliente.nmCliente}`)
          const {data} = await axios.post(`${url_base}`, {...cliente});

          response.content =  data.content;
      }catch (error: any) {
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

    public async findByNmCliente(nmCliente: string, page: number, itemsPerPage: number) : Promise<Cliente[]> {
      const response = new Response<Cliente[]>();

      try{
          const response = await axios.get(`${url_base}/${nmCliente}?page=${page-1}&size=${itemsPerPage}`);

          return response.data.content;
      }catch (error:any) {
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

export default new ClienteService;
