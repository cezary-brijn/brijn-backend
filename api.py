from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://brijn-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/scan")
async def scan_file(file: UploadFile = File(...), text: str = Form(...)):
    # Placeholder analysis
    return {"status": "ok", "file": file.filename, "text": text}
