
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region:'us-east-1'});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const {artist,song}= event.headers;
  const command = new GetCommand({
    TableName: "Music",
  Key: {
      Artist:artist,
    SongTitle:song
      
      
    }
  });

  const response = await docClient.send(command);
  console.log( await docClient.send(command));
  return response;
};