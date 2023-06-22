import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
const client = new S3Client({})
export const handler = async(event) => {
    // TODO implement
    
let file_content =event["content"] ;
let buff = new Buffer(file_content);
let base64data = buff.toString('base64');
      const command = new PutObjectCommand({
    Bucket: "buckyll",
    Key: "hello1-s3.pdf",
    Body: base64data,
  });
  try {
    const response = await client.send(command);
    console.log(response);
console.log(event)
        return event;
  } 
catch (err) {
    console.error(err);
  }}