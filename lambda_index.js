import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { nanoid } from 'nanoid';
import { EC2 } from "@aws-sdk/client-ec2";


const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" }); 


const tableName = 'FileTable';

const ec2Client = new EC2({ region: 'us-east-1' });


export const handler = async (event) => {
    try {
     
        const s3FilePath = event.queryStringParameters.path;
        const s3TextInput = event.queryStringParameters.text;
       
        const uniqueId = nanoid();
      
        console.log("eventtttt",event)
        
        const params = {
            TableName: tableName,
            Item: {
                id: { S: uniqueId }, 
                input_text: { S: s3TextInput },
                input_file_path: { S: s3FilePath }
            }
        };

        
        const command = new PutItemCommand(params);

        
        await dynamoDBClient.send(command);

        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File path saved successfully.', id: uniqueId })
        };
    } catch (error) {
        
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving file path.', error: error })
        };
    }
    try {
        let instanceType = 't2.micro';  
        let amiId = 'ami-id';      
        let iamRoleArn = 'arn:aws:iam::dynamoec2role';   
        let keyName = 'commonec2 key pair';
        let securityGroupIds = ['securityGroupIds'];
        let bucketName = "bucketName";
        let key = "text file.txt";
        let filename = "EC2runScript.py";
        let ec2UserData = "'sudo yum -y install python', 'sudo yum -y install python-pip','aws s3 cp s3://${bucketName}/${filename} /root/fold/${filename}','python /root/fold/{filename} python script.py file_id input_file_key output_file_key local_input_file_path local_output_file_path file_text table_name bucket'";
        
        

        const params = {
            ImageId: amiId,
            InstanceType: instanceType,
            MinCount: 1,
            MaxCount: 1,
            UserData: Buffer.from(ec2UserData).toString('base64'),
            SecurityGroupIds: securityGroupIds,
            TagSpecifications: [
                {
                    ResourceType: "instance",
                    Tags: [
                        {
                            Key: "Name",
                            Value: "TempEC2Instance",
                        }
                    ]
                }
            ],
            IamInstanceProfile: {
                Arn: iamRoleArn
            }
        };
        const data = await ec2Client.runInstances(params);
        console.log('EC2 instance created:', data.Instances[0].InstanceId);
    } catch (err) {
        console.error('Error creating EC2 instance:', err);
    }
    const bucketName = 'your-bucket-name';
    const key = 'your-file-key'; 
    const filePath = '/path/to/save/file'; 

    const params = {
        Bucket: bucketName,
        Key: key
    };

    try {
        const data = await s3.getObject(params).promise();
        fs.writeFileSync(path.join(filePath, key), data.Body);
        console.log('File downloaded successfully.');
    } catch (err) {
        console.error('Error downloading file:', err);
    }

try {
                const instanceId = data.Instances[0].InstanceId;

        const params = {
            InstanceIds: [instanceId]
        };
        const data = await ec2Client.terminateInstances(params).promise();
        console.log('EC2 instance terminated:', data.TerminatingInstances[0].InstanceId);
    } catch (err) {
        console.error('Error:', err);
    }
    
};
