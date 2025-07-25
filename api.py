from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional
import tempfile
import os

app = FastAPI()

# pozwalamy frontendowi na dostęp (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/scan")
async def scan(
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    if not file and not text:
        return JSONResponse(content={
            "verdict": "❌",
            "summary": "No input provided."
        })

    image_path = None
    if file:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            content = await file.read()
            tmp.write(content)
            image_path = tmp.name

    result = analyze(image_path, text)

    if image_path:
        os.unlink(image_path)

    return JSONResponse(content=result)

def analyze(image_path, text):
    # Prosta logika analizy
    if image_path and text:
        return {
            "verdict": "✅ Mixed input",
            "summary": "Image and text received. Placeholder analysis complete."
        }
    elif image_path:
        return {
            "verdict": "📷 Image only",
            "summary": "Only image uploaded. Placeholder image analysis complete."
        }
    elif text:
        return {
            "verdict": "💬 Text only",
            "summary": f"Only text provided: '{text[:50]}...'"
        }
    else:
        return {
            "verdict": "❌",
            "summary": "No valid input detected."
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
