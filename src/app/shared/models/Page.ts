import { Key } from "aws-sdk/clients/dynamodb";
import { Car } from "./Car";

export interface Page{
    cars:Car[];
    
    lastEvaluatedKey: Key | undefined;

    pageIndex: number;
}