This project takes input text and file as input stores it in aws s3 using aws sdk in javascript file 

 
 Now this input data both text, file data will be stored in dynamodb passed using aws api gateway parameters Ex: https://wi5tnox5ik.execute-api.us-east-1.amazonaws.com/dev/s3input? path=path&text=text
 
 
 After the file is added in s3 and data is stored in dynamodb, the same lambda function is used to create ec2 instance with an existing ami or new ami, to run the EC2runscript which reads data from dynamo and updates data to dynamodb and s3 we will use EC2 userdata commands to run this script and does the above functionalities. 
 
 After executing the script and when the lambda function is succeded the same lambda function terminates the EC2 instance.

## Files

**fileUploadComponent.js** This file has the code for the reactjs UI and also to trigger API gateway to upload data in S3 and dynamodb
**EC2runScript.py** This script is used to run inside EC2
**lambda_index.js** This file has all the functionalities discussed above.

## Usage

To run the above architecture, clone this repo, npm install packages, create AWS bucket, update AWS parameters in fileUploadComponent.js file and run the above file. For the API Gateway part create a get api using console, in integrations choose AWS Lambda, deploy the API and add params required like input text, file path to store data in dynamo DB


After configuring API Gateway, create dynamodb table with fields id, input_text, input_path, deploy the lambda code in AWS configure AMI from existing ec2 or create new AMI, create a security group, set permissions using IAM policies and run the react code locally, the entire pipeline will be triggered automatically and returns a sucessful response.
