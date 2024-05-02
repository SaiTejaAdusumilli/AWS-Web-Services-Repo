import sys
import boto3

REGION = 'us-east-1'

dynamodb = boto3.client('dynamodb', region_name=REGION)
s3 = boto3.client('s3', region_name=REGION)

def get_input_from_dynamodb(file_id,file_text,table_name):
    response = dynamodb.get_item(
        TableName=table_name,
        Key={"id": {"S": file_id},"input_text":{"S":file_text}}
    )
    input_text = response['Item']['input_text']['S']
    return input_text

def download_input_from_s3(bucket,input_file_key, local_file_path):
    s3.download_file(bucket, input_file_key, local_file_path)

def append_input_to_file(input_text, input_file_path, output_file_path):
    with open(input_file_path, 'r') as f:
        input_file_content = f.read()

    output_file_content = f"{input_file_content}: {input_text}"

    with open(output_file_path, 'w') as f:
        f.write(output_file_content)

def upload_output_to_s3(output_file_path, bucket,output_file_key):
    s3.upload_file(output_file_path, bucket, output_file_key)

def save_outputs_to_dynamodb(file_id, output_file_key, table_name):
    dynamodb.put_item(
        TableName=table_name,
	      Item={
            'id': {'S': str(file_id)},
	          'input_text':{'S':str(file_id)},
            'output_file_path': {'S': output_file_key}
        }
    )

def main():
    if len(sys.argv) != 9:
        print("Usage: python script.py file_id input_file_key output_file_key local_input_file_path local_output_file_path file_text table_name bucket")
        return

    file_id = sys.argv[1]
    input_file_key = sys.argv[2]
    output_file_key = sys.argv[3]
    local_input_file_path = sys.argv[4]
    local_output_file_path = sys.argv[5]
    file_text = sys.argv[6]
    table_name = sys.argv[7]
    bucket = sys.argv[8]

    input_text = get_input_from_dynamodb(file_id,file_text,table_name)

    download_input_from_s3(bucket,input_file_key, local_file_path)

    append_input_to_file(input_text, local_input_file_path, local_output_file_path)

    upload_output_to_s3(local_output_file_path, bucket, output_file_key)

    save_outputs_to_dynamodb(file_id, output_file_key, table_name)

if __name__ == "__main__":
    main()
