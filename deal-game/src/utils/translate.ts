export async function translateToMalayalam(text: string): Promise<string> {
    if (!text) return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ml&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Google Translate responded with ${response.status}`);
        const data = await response.json();
        return data[0].map((item: any) => item[0]).join("");
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
}
