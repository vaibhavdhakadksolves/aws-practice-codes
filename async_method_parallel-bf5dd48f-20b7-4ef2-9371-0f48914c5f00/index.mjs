import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import waterfall from 'async/waterfall.js';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const result = await new Promise((resolve, reject) => {
      waterfall([
        function (callback) {
          const command = new ScanCommand({
            TableName: "Music",
          });
          docClient.send(command)
            .then((response) => {
              callback(null, response);
            })
            .catch((error) => {
              callback(error);
            });
        },
        function (arg1, callback) {
          const command1 = new ScanCommand({
            TableName: "User",
          });
          docClient.send(command1)
            .then((response2) => {
              console.log(response2);
              callback(null, { arg1: arg1.Items, response2: response2.Items });
            })
            .catch((error) => {
              callback(error);
            });
        },
      ],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
