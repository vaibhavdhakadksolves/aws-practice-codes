import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const {artist,song,title}=event.body
  const command = new PutItemCommand({
    TableName: 'Music',
    
    Item: {
      Artist:{S:artist},
      SongTitle:{S:song},
    },
    ReturnValues:'ALL_OLD'
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};