interface Vestido {
  idVestido?: number | null;
  nuVestido: string;
  vlrVestido: number;
  flSituacao: string;
  imgVestidos?: {
    idImgVestido?: number | null
    imgVestido?: string | null
  }[] | undefined;
  cor?: string;
}

export default Vestido;
