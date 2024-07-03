from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_name = 'codeparrot/codeparrot-small'
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.json.get('prompt', '')
    inputs = tokenizer(prompt, return_tensors='pt', max_length=512, truncation=True)
    outputs = model.generate(inputs.input_ids, max_length=512, num_return_sequences=1, do_sample=True, temperature=0.7)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
