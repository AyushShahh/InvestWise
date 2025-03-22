from pinecone import Pinecone
import json
import dotenv
import os

dotenv.load_dotenv()
pc = Pinecone(api_key=os.getenv("PINECONE_API"), environment="us-east-1")

index_name = "market"

index = pc.Index(index_name)

# Do it for all of the data
with open("sebi.json", "r") as f:
    risk_data = json.load(f)

def extract_text(data, parent_key=""):
    text_list = []
    for key, value in data.items():
        new_key = f"{parent_key}_{key}" if parent_key else key
        if isinstance(value, str):
            text_list.append(f"{new_key}: {value}")
        elif isinstance(value, dict):
            text_list.extend(extract_text(value, new_key))
    return text_list

inputs = extract_text(risk_data["SEBI_Guidelines"])

embedding_results = pc.inference.embed(
    model="llama-text-embed-v2",
    inputs=inputs,
    parameters={
        "input_type": "passage",
    }
)

embeddings = [result["values"] for result in embedding_results]

vectors = []
for i, text in enumerate(inputs):
    embedding = embeddings[i]
    vector = {
        "id": f"sebi-{i}",
        "values": embedding,
        "metadata": {
            "text": text,
        }
    }
    vectors.append(vector)

index.upsert(vectors)

print("Data successfully inserted into pc!")