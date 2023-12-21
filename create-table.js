import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const main = async () => {
  const command = new CreateTableCommand({
    TableName: "Stafftable",
   
    AttributeDefinitions: [
      {
        AttributeName: "Name",
        AttributeType: "S",
      },
      {
        AttributeName: "StaffID",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "StaffID",
        KeyType: "HASH",
      },
      {
        AttributeName: "Name",
        KeyType: "RANGE"
      },
      
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};
