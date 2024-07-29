import Vestido from "@/types/VestidoType";
import axios from "axios";
import { Response } from "./Rest";

const url_base = 'http://localhost:8089/api/vestido';

class VestidoService{

    public async getAllVestidos(page: number, itemsPerPage: number): Promise<Response<Vestido[]>> {
      const response: Response<Vestido[]> = {
        hasError: false
      };

      try{
        const data = await axios.get(`${url_base}?page=${page-1}&size=${itemsPerPage}`)

        response.content = data.data.content;
        response.totalElements = data.data.totalElements;
        response.totalPages = data.data.totalPages;

      }catch(error:any){
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



}

export default new VestidoService;
