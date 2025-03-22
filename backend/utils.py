from pinecone import Pinecone
import os
import dotenv
import json

dotenv.load_dotenv()

def query_pinecone(query_text, index_name="market", top_k=5):
    try:
        
        pc = Pinecone(api_key=os.getenv("PINECONE_API"), environment="us-east-1")
        index = pc.Index(index_name)

        
        embedding_results = pc.inference.embed(
            model="llama-text-embed-v2",
            inputs=[query_text],
            parameters={
                "input_type": "passage",
            }
        )
        query_embedding = embedding_results[0]["values"]

        
        query_results = index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True
        )

        
        results = []
        for match in query_results.get("matches", []):
            results.append({
                "id": match.get("id"),
                "score": match.get("score"),
                "metadata": match.get("metadata")
            })

        return json.dumps(results)

    except Exception as e:
        print(f"Error querying Pinecone: {e}")
        return "[]"