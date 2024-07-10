import Cliente from '@/types/ClienteType';
import axios from "axios";
import { Response } from "./Rest";


//const url_consulta = 'http://localhost:8089/api/cliente?page=0&size=10';
//const url_consulta = 'http://localhost:8089/api/cliente?page=0&size=10';
const url_base = 'http://localhost:8089/api/cliente';

interface Response<T> {
  content?: T;
  error?: string;
  totalElements?: number;
  totalPages?: number;
}

class ClienteService{

    public async findAllClientes(page: number, itemsPerPage: number) : Promise<Response<any>> {
      const response: Response<any> = {};

      try{
          const data = await axios.get(`${url_base}?page=${page-1}&size=${itemsPerPage}`);

          response.content = data.data.content;
          response.totalElements = data.data.totalElements;
          response.totalPages = data.data.totalPages;

          return response;
      }catch (error) {
          // response.error = this.remoteError(e);
          console.log('Erro ao buscar clientes', error);
          response.error = response.error = error.response ? error.response.data.message : error.message;
      }

      return response;
  }


    public async deleteCliente(idCliente: number): Promise<Response<any>>  {
      const response: Response<any> = {};

      try{
        const data = await axios.delete(`${url_base}/${idCliente}`)

        response.content = data.data.content;

      }catch(error){
        response.error = response.error = error.response ? error.response.data.message : error.message;
      }

      return response;
    }

    public async cadastrarCliente(cliente: Cliente): Promise<Response<any>>  {
      const response: Response<any> = {};
      try{
          const data = await axios.post(`${url_base}`, cliente);

          console.log(`1 ${data}`)
          response.content =  data.data.content;
      }catch (error) {
          console.log(`2 ${error}`)
          response.error = error.response ? error.response.data.message : error.message;
      }

      return response;
  }

    public async findByNmCliente(nmCliente: string, page: number, itemsPerPage: number) : Promise<Cliente[]> {
      const response = new Response<Cliente[]>();

      try{
          const response = await axios.get(`${url_base}/${nmCliente}?page=${page-1}&size=${itemsPerPage}`);

          return response.data.content;
      }catch (error) {
          console.log('Erro ao buscar clientes', error);
          throw error;
      }
  }

}

export default new ClienteService;
