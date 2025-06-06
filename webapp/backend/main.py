from transformers import AutoTokenizer, AutoModelForSequenceClassification
from peft import PeftModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch.nn.functional as F
import torch
import os

model_path = os.path.join(os.path.dirname(__file__), "model_directory")

app = FastAPI()

origins = [
    "https://veritas-eight.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

base_model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased"
)
model = PeftModel.from_pretrained(
    base_model,
    model_path,
    local_files_only=True
)
tokenizer = AutoTokenizer.from_pretrained(
    model_path,
    local_files_only=True
)
model.eval()

class InputText(BaseModel):
    text: str

@app.post("/predict")
def predict(input: InputText):
    inputs = tokenizer(input.text, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    probs = F.softmax(logits, dim=1)
    confidence, predicted_class = torch.max(probs, dim=1)

    return {
        "label": predicted_class.item(),
        "confidence": round(confidence.item() * 100, 2)
    }
