import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const {artist,song,changedValue}= event.body;
  const command = new UpdateCommand({
    TableName: "Music",
    Key: {
      Artist: artist,
      SongTitle:song
    },
    UpdateExpression: "set AlbumTitle = :val",
    ExpressionAttributeValues: {
      ":val": changedValue,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};