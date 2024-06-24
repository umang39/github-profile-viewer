import { intialState } from "../store/Reducers/FetchdataReducers";
import { responseDataInterface } from "./ResponseInterface";

export interface fetchReducerInterface {
  data:
    | string
    | null
    | responseDataInterface
    | typeof intialState.data
    | undefined;
}
