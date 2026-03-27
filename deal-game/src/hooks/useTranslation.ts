import { useLangStore } from '@/store/langStore';
import { translations } from '@/i18n/translations';

export function useTranslation() {
    const { lang, toggleLang } = useLangStore();
    return { t: translations[lang], lang, toggleLang };
}
