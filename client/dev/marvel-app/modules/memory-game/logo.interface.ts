export interface Logo {
  idLogo: number;
  name: string;
  image: string;
  character: {
    id:number,
    thumbnail:{
      path:string,
      extension:string
    }
  };
}
