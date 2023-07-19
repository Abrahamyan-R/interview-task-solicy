import { Exclude, Expose, Transform } from "class-transformer";

export class GetCatalogByIdResDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  url: string;

  @Expose()
  @Transform(params => ({
    cost1: params.obj.cost1,
    cost2: params.obj.cost2,
    cost3: params.obj.cost3,
  }))
  price: {
    cost1: number,
    cost2: number,
    cost3: number,
  };
  
  @Expose()
  @Transform(params => ({
    req1: params.obj.req1,
    req2: params.obj.req2,
    req3: params.obj.req3,
  }))
  req: {
    req1: number;
    req2: number;
    req3: number;
  }
}