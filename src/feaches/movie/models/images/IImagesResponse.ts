import {IBackdrop} from "./IBackdrop.ts";
import {ILogo} from "./ILogo.ts";
import {IPoster} from "./IPoster.ts";


export interface IImagesResponse {
  backdrops: IBackdrop[];
  id: number;
  logos: ILogo[];
  posters: IPoster[];
}