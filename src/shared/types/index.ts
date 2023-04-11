export type CoordinatesType = [number, number]
export type CoordinatesAPIType = {
  x:number
  y:number
  name:string
}
 
export type YearSetType = {
  vds_sub: CoordinatesAPIType[];
  vds_wsub: CoordinatesAPIType[];
};


export type DatasetType = {
  [key: number]: YearSetType;
};
