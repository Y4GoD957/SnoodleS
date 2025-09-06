# app/routes/generate.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import requests
import json

router = APIRouter()

class GenerateRequest(BaseModel):
    projectName: str = ""
    niche: str = ""
    features: List[str] = []
    aiIntegration: str = ""
    messageAutomation: str = ""
    targetAudience: str = ""
    adminPanel: str = ""
    platform: str = ""
    observations: str = ""
    colorPalette: List[str] = []
    hasLogo: bool = False
    logoDataUrl: Optional[str] = None

def libre_translate_texts(texts: List[str], target: str = "en") -> List[str]:
    """
    Traduz uma lista de textos do português para inglês usando LibreTranslate (gratuito/open-source).
    """
    translated = []
    for t in texts:
        if not t.strip():
            translated.append("")
            continue
        try:
            resp = requests.post(
                "https://libretranslate.com/translate",
                data={"q": t, "source": "pt", "target": target},
                timeout=30
            )
            resp.raise_for_status()
            translated.append(resp.json().get("translatedText", ""))
        except Exception as e:
            translated.append(t)  # fallback: mantém original se erro
    return translated

@router.post("/generate-project")
def generate_project(body: GenerateRequest):
    try:
        # Preparar textos para tradução
        fields = [
            ("projectName", body.projectName),
            ("niche", body.niche),
            ("aiIntegration", body.aiIntegration),
            ("messageAutomation", body.messageAutomation),
            ("targetAudience", body.targetAudience),
            ("adminPanel", body.adminPanel),
            ("platform", body.platform),
            ("observations", body.observations),
        ]
        to_translate = [text or "" for _, text in fields] + (body.features or [])

        translated = libre_translate_texts(to_translate, target="en")

        # Reconstruir campos traduzidos
        translated_fields = {key: translated[i] for i, (key, _) in enumerate(fields)}
        translated_features = translated[len(fields):]

        # Criar prompt para Lovable
        prompt_lines = [
            f"Create a {translated_fields.get('platform','web')} application called \"{translated_fields.get('projectName','')}\".",
            f"Niche: {translated_fields.get('niche','')}.",
        ]
        if translated_features:
            prompt_lines.append(f"Main features: {', '.join(translated_features)}.")
        prompt_lines.append(f"AI integration required: {translated_fields.get('aiIntegration','')}.")
        prompt_lines.append(f"Message automation: {translated_fields.get('messageAutomation','')}.")
        prompt_lines.append(f"Target audience: {translated_fields.get('targetAudience','')}.")
        prompt_lines.append(f"Admin panel: {translated_fields.get('adminPanel','')}.")
        if body.colorPalette:
            prompt_lines.append(f"Preferred color palette: {', '.join(body.colorPalette)}.")
        if body.hasLogo and body.logoDataUrl:
            prompt_lines.append("A logo was provided as base64 data URL. Use it in the header.")
        if translated_fields.get('observations'):
            prompt_lines.append(f"Extra notes: {translated_fields.get('observations')}")
        prompt = "\n".join(prompt_lines)

        print("=== Generated English Prompt START ===")
        print(prompt)
        print("=== Generated English Prompt END ===")

        # Chamar Lovable (ou retornar mock)
        LOVABLE_ENDPOINT = os.getenv("LOVABLE_ENDPOINT")
        LOVABLE_KEY = os.getenv("LOVABLE_KEY")
        code, preview_url = None, None

        if LOVABLE_ENDPOINT and LOVABLE_KEY:
            headers = {"Authorization": f"Bearer {LOVABLE_KEY}", "Content-Type": "application/json"}
            payload = {"prompt": prompt, "options": {"format":"react"}}
            r = requests.post(LOVABLE_ENDPOINT, headers=headers, json=payload, timeout=60)
            r.raise_for_status()
            jr = r.json()
            code = jr.get("code") or jr.get("generated_code") or json.dumps(jr)
            preview_url = jr.get("previewUrl")
        else:
            code = (
                f"// Mock generated code for {translated_fields.get('projectName','')}\n"
                "console.log('This is a mocked generated project. Replace with Lovable response.');\n"
            )

        return {"prompt": prompt, "code": code, "previewUrl": preview_url}

    except requests.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Lovable request failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))