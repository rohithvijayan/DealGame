export async function translateToMalayalam(text: string): Promise<string> {
    if (!text) return "";
    try {
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error("Translation API failed");
        }

        const data = await response.json();
        return data.translatedText || text;
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Fallback to original text if translation fails
    }
}
