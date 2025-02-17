import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Food } from '../../shared/models/Food';

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


  getAllFoods(): Promise<Food[]> {
    const params = {
      TableName: 'Foods', // The name of the table
    };

    return new Promise((resolve, reject) => {
      this.docClient.scan(params, (err, data) => {
        if (err) {
          console.error('Error fetching data from DynamoDB:', err);
          reject(err);
        } else {
          resolve(data.Items as unknown as Food[]);
        }
      }
      );
    });
  }

}
