# app.py
from flask import Flask, request, jsonify
from transformers import LlamaForCausalLM, LlamaTokenizer

app = Flask(__name__)
tokenizer = LlamaTokenizer.from_pretrained("path/to/llama")
model = LlamaForCausalLM.from_pretrained("path/to/llama")

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    input_text = data['text']
    inputs = tokenizer.encode(input_text, return_tensors='pt')
    outputs = model.generate(inputs)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"response": generated_text})

if __name__ == '__main__':
    app.run(debug=True)
