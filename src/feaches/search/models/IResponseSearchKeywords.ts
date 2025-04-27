import {IKeyword} from "./IKeyword.ts";

export interface IResponseSearchKeywords {
  page: number;
  results: IKeyword[];
  total_pages: number;
  total_results: number;
}