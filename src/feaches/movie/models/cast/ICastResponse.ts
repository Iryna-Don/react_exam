import {ICast} from "./ICast.ts";
import {ICrew} from "./ICrew.ts";

export interface ICastResponse {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}