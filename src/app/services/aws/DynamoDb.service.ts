import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Car } from '../../shared/models/Car';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { Key, ScanOutput } from 'aws-sdk/clients/dynamodb';

@Injectable({
  providedIn: 'root'
})
export class DynamoDbService {

  dynamodb: AWS.DynamoDB;
  docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    var cred = new AWS.CognitoIdentityCredentials(
      { IdentityPoolId: 'eu-central-1:b0cb46ef-18b6-4593-ac70-07f93c55fcfb' }
    );

    AWS.config.credentials = cred;
    AWS.config.update({
      region: 'eu-central-1'
    });

    this.dynamodb = new AWS.DynamoDB();

    this.docClient = new AWS.DynamoDB.DocumentClient;
  }


  getAllCars(): Promise<Car[]> {
    const params = {
      TableName: 'Cars', // The name of the table
    };

    return new Promise((resolve, reject) => {
      this.docClient.scan(params, (err, data) => {
        if (err) {
          console.error('Error fetching data from DynamoDB:', err);
          reject(err);
        } else {
          resolve(data.Items as unknown as Car[]);
        }
      }
      );
    });

  }

  getCarsPage(startPage: Key | undefined, limit: number): Promise<ScanOutput> {

    let lastEvaluatedKey: Key | undefined = undefined;

    if (startPage) {
      lastEvaluatedKey = startPage;
    }

    const params: DocumentClient.ScanInput = {
      TableName: 'Cars',
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey
    };

    return new Promise((resolve, reject) => {
      this.docClient.scan(params, (err, data) => {
        if (err) {
          console.error('Error fetching data from DynamoDB:', err);
          reject(err);
        } else {

          resolve(data);

        }
      }
      );
    });
  }

  searchCarByName(startPage: Key | undefined, searchString: String, limit: number): Promise<ScanOutput> {
    let lastEvaluatedKey: Key | undefined = undefined;

    if (startPage) {
      lastEvaluatedKey = startPage;
    }

    const params: DocumentClient.QueryInput = {
      TableName: 'Cars',
      FilterExpression: 'contains(#carName, :theName)',
      ExpressionAttributeValues: {
        ':theName': searchString,
      },
      ExpressionAttributeNames:{
        "#carName": 'name'
      },
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey
    };

    return new Promise((resolve, reject) => {
      this.docClient.scan(params, (err, data) => {
        if (err) {
          console.error('Error fetching data from DynamoDB:', err);
          reject(err);
        } else {

          resolve(data);

        }
      }
      );
    });
  }

}
