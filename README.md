# 🧠 Veritas – Fake News Detection Platform

**Veritas** is a web-based AI application designed to detect fake news by analyzing text and returning the **probability of it being false**, accompanied by an optional brief explanation. The project combines state-of-the-art NLP with a user-friendly interface to help users quickly assess the credibility of online content.

---

## 📌 Table of Contents

- [🎯 Project Purpose](#-project-purpose)
- [⚙️ Technologies](#-technologies)
- [📁 Project Structure](#-project-structure)
- [🚀 Deployment](#-deployment)
- [📊 Model Training & Report](#-model-training--report)
- [📷 Screenshots](#-screenshots)
- [📚 License](#-license)

---

## 🎯 Project Purpose

The goal of **Veritas** is to:
- Provide an intuitive platform for verifying the authenticity of articles and statements.
- Raise awareness of misinformation and encourage critical thinking.
- Demonstrate the practical application of fine-tuned transformer models in a production web environment.

---

## ⚙️ Technologies

**Frontend**
- React.js
- TailwindCSS
- Deployed via [Vercel](https://vercel.com)

**Backend**
- FastAPI
- Hosted on Google Cloud Platform (GCP)
- Runs a fine-tuned transformer model (BERT)

**ML & Training**
- Hugging Face Transformers
- Datasets (LIAR, FakeNewsNet, or custom)
- Training notebook included in the `notebooks/` directory

## 🚀 Deployment

### Frontend
- Hosted on **Vercel**
- Designed in React and TailwindCSS

### Backend
- Dockerized FastAPI application
- Hosted on **Google Cloud Run**

## 📊 Model Training & Report

Training was done using a fine-tuned BERT-based model for binary classification (`REAL` vs `FAKE`). The training notebook includes:

- Dataset preprocessing
- Tokenization and fine-tuning with Hugging Face Transformers
- Evaluation metrics: accuracy, F1-score, ROC AUC
- Visualization of confidence distribution
- Model export for production use

📁 See `notebooks/veritas_tuning.ipynb` for full documentation.

**Veritas** – Because truth matters.
