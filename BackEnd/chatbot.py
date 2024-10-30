from fastapi import FastAPI, HTTPException
from transformers import LlamaTokenizer, LlamaForCausalLM
import torch

app = FastAPI()

# Load the model and tokenizer
tokenizer = LlamaTokenizer.from_pretrained("../meta-llama/Meta-Llama-3-8B-Instruct/original/tokenizer.model")
model = LlamaForCausalLM.from_pretrained("../meta-llama")

@app.post("/chat")
async def chat(user_input: str):
    inputs = tokenizer(user_input, return_tensors="pt")
    outputs = model.generate(**inputs)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
