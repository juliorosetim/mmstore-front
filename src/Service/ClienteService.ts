import Cliente from '@/types/ClienteType';
import axios from "axios";
import { RemoteError, Response } from "./Rest";

const url_consulta = 'http://localhost:8089/api/cliente?page=0&size=10';
const url_base = 'http://localhost:8089/api/cliente';

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

    private remoteError(error: any): RemoteError {
      return {
        message: error.response.data.message,
        code: error.response.data.status,
      } as RemoteError;
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


    public async cadastrarCliente(cliente: Cliente): any {
      // axios.post(`${url_base}`, cliente)
      //   .then((response) => {
      //     console.log('Cliente cadastrado com sucesso!', response.data);
      //   })
      //   .catch((error) => {
      //     console.error('Erro ao cadastrar cliente: 1', error);
      //   });

        const response = new Response<Cliente>();

        try{
            const response = await axios.post(`${url_base}`, cliente);

            return response.data.content;
        }catch (error) {
            // response.error = this.remoteError(e);
            console.log(error.response.data.message);
        }
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
