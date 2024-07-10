import Cliente from '@/types/ClienteType';
import axios from "axios";
import { RemoteError, Response } from "./Rest";

const url_consulta = 'http://localhost:8089/api/cliente?page=0&size=10';
const url_base = 'http://localhost:8089/api/cliente';

interface Response<T> {
  content?: T;
  error?: string;
}

class ClienteService{

    public async findAllClientes() : Promise<Cliente[]> {
        const response = new Response<Cliente[]>();

        try{
            const response = await axios.get(url_consulta);

            return response.data.content;
        }catch (error) {
            // response.error = this.remoteError(e);
            console.log('Erro ao buscar clientes', error);
            throw error;
        }
    }


    public async deleteCliente(idCliente: number): any {
      await axios.delete(`${url_base}/${idCliente}`)
      .then(() => {
        console.log('Registro excluido com sucesso!')
      })
      .catch((error) => {
        console.log(`Erro ao excluir registro ${error}`)
      })
    }


    // public async cadastrarCliente(cliente: Cliente): any {
    //     const response = new Response<Cliente>();

    //     try{
    //         const response = await axios.post(`${url_base}`, cliente);

    //         return response.data.content;
    //     }catch (error) {
    //         // response.error = this.remoteError(e);
    //         console.log(error.response.data.message);
    //         return error.response.data.message
    //     }
    // }

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

    public async findByNmCliente(nmCliente: string) : Promise<Cliente[]> {
      const response = new Response<Cliente[]>();

      try{
          const response = await axios.get(`${url_base}/${nmCliente}?page=0&size=10`);

          return response.data.content;
      }catch (error) {
          console.log('Erro ao buscar clientes', error);
          throw error;
      }
  }

}

export default new ClienteService;
