import {Cliente} from '@/types/ClienteType';
import axios from "axios";
import { RemoteError, Response } from "./Rest";

const url_base = 'http://localhost:8089/api/cliente';

class ClienteService{

    public async findAllClientes() : Promise<Response<Cliente>> {
        const response = new Response<Cliente>();

        try{
            const data = await axios.get(url_base);
            response.content = data.data;
        }catch (e) {
            response.error = this.remoteError(e);
        }

        return response;
    }

    private remoteError(error: any): RemoteError {
        return {
          message: error.response.data.message,
          code: error.response.data.status,
        } as RemoteError;
      }    

}

export default new ClienteService;