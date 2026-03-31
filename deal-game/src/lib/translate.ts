export async function performTranslation(text: string, targetLang: string = 'ml'): Promise<string> {
    if (!text) return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Google Translate API responded with ${response.status}`);
        const data = await response.json();
        return data[0].map((item: any) => item[0]).join("");
    } catch (error) {
        console.error("Translation error in lib:", error);
        return text;
    }
}
