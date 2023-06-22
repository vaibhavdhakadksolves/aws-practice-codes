import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region:'us-east-1'});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
 const command = new ScanCommand({
    
    TableName: "Music",
   
  });

  const response = await docClient.send(command);
  console.log('hellow')
  console.log(response);
  
    
  return response;
};
