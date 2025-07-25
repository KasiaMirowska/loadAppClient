# 🧾 Receipt Processing App

This is a full-stack app for uploading receipt images, processing them via OCR and LLM parsing (using AWS Textract and Bedrock), and storing structured transaction data into Firestore. Built with:

- **React + Redux Toolkit** frontend (deployed to S3)
- **AWS Lambda** serverless functions
  - `receiptProcessor`: triggered by S3 upload
  - `urlGenerator`: generates signed S3 upload URLs

---

## 📦 Project Structure

```bash
.
├── load-app-client/          # React frontend app (deployed to S3)
├── receiptProcessor/         # Lambda function to parse receipts and write to Firestore
└── generate-url-service/     # Lambda for issuing presigned S3 URLs
```
---

## 📦 Tech Stack:
```bash
• Frontend: React + Redux Toolkit + MUI + Styled Components
• State management: Redux (Transaction slice, Upload thunk)
• Backend: AWS Lambda (Node.js + TypeScript)
• Storage: Amazon S3 for raw files
• Database: Google Firestore (via service account key)
• OCR: Amazon Textract
• LLM Parsing: Claude 3 via AWS Bedrock
```
---

## Deployment: 
```bash 
Serverless Framework (sls deploy) for Lambdas, aws s3 sync for frontend
```

##SETUP
```bash
cd load-app-client
npm install
npm run build
```

## DEPLOY to S3: 
```bash
aws s3 sync ./build s3://<your-s3-bucket-name> --delete
```
---
 Workflow Summary: 

• User uploads receipt via client (drag & drop box).

• Client dispatches uploadReceiptImages():

• Calls generate-url-service for presigned S3 URL.

• Uploads the image + a manifest.json with metadata.

• S3 triggers receiptProcessor Lambda:

• Reads receipt image and manifest.json

• Parses it using Textract + Claude 3

• Writes the structured transaction to Firestore

• Client displays receipt preview and parsed data (with loading state)

---
👩‍💻 Author
Built by Kasia Mirowska – blending creative design sensibility with modern serverless architecture 💡
