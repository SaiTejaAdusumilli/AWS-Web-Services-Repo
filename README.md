In this project we explore different kinds of AWS services like EC2, DynamoDB, Lambda, API Gateway, S3 etc. and automate the execution flow using JS/python scripts

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


## ReactUI
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/5badc740-8749-42c2-b012-6969a530ecad)

## API Gateway URL
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/9dc0d8ca-5104-4056-8032-bc1ea8fac056)

## S3 Bucket
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/50732ec6-3d8e-4ac1-94c0-b0dbcd1f7789)

## DynamoDB Data

![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/b9550186-5cbe-4bb4-adc6-b692572ca014)

## Lambda Code
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/cfc4d4fa-2a52-4f2e-8bfd-6440a7170965)

## EC2 instances automatic
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/bb2ec76b-d1aa-4e85-b4b7-5c1652cc0694)

## Output file
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/c36e5e3f-edef-47f9-bae1-344b10b400a6)

## Input file data
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/7f17a74f-647f-4134-9e4e-43e946d34d2a)

## Output file data
![image](https://github.com/SaiTejaAdusumilli/Fovus-Challenge/assets/46951942/387d0d10-acdf-4074-b37f-95aa69fa617b)








