import Cliente from '@/types/ClienteType';
import axios from "axios";
import { RemoteError, Response } from "./Rest";

const url_base = 'http://localhost:8089/api/cliente?page=0&size=10';

class ClienteService{

    public async findAllClientes() : Promise<Cliente[]> {
        const response = new Response<Cliente[]>();

        try{
            const response = await axios.get(url_base);

            return response.data.content;
        }catch (error) {
            // response.error = this.remoteError(e);
            console.log('Erro ao buscar clientes');
            throw error;
        }
        
        
    }

    private remoteError(error: any): RemoteError {
        return {
          message: error.response.data.message,
          code: error.response.data.status,
        } as RemoteError;
      }    

}

export default new ClienteService;