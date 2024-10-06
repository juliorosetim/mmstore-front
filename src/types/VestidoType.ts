interface Vestido {
  idVestido?: number | null;
  nuVestido: string;
  vlrVestido: number;
  flSituacao: string;
  imgVestido?: [{
    idImgVestido?: number | null
    imgVestido?: string | null
  }];
  cor?: string;
}

export default Vestido;
