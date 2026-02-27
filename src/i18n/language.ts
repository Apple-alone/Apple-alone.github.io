/**
 * 统一的语言配置文件
 * 所有语言相关的映射和配置都从这里导出
 */

export interface LanguageConfig {
<<<<<<< HEAD
	/** 翻译服务使用的语言代码 */
	translateCode: string;
	/** 语言显示名称 */
	displayName: string;
	/** Intl.DateTimeFormat 使用的 locale */
	locale: string;
	/** 语言图标（国旗 emoji） */
	icon: string;
=======
    /** 翻译服务使用的语言代码 */
    translateCode: string;
    /** 语言显示名称 */
    displayName: string;
    /** Intl.DateTimeFormat 使用的 locale */
    locale: string;
    /** 语言图标（国旗 emoji） */
    icon: string;
>>>>>>> upstream/main
}

/**
 * 支持的语言配置
 * 单一数据源，避免重复定义
 */
export const LANGUAGE_CONFIG = {
<<<<<<< HEAD
	zh: {
		translateCode: "chinese_simplified",
		displayName: "中文",
		locale: "zh-CN",
		icon: "🇨🇳",
	},
	en: {
		translateCode: "english",
		displayName: "English",
		locale: "en-US",
		icon: "🇺🇸",
	},
	ja: {
		translateCode: "japanese",
		displayName: "日本語",
		locale: "ja-JP",
		icon: "🇯🇵",
	},
	ko: {
		translateCode: "korean",
		displayName: "한국어",
		locale: "ko-KR",
		icon: "🇰🇷",
	},
	es: {
		translateCode: "spanish",
		displayName: "Español",
		locale: "es-ES",
		icon: "🇪🇸",
	},
	th: {
		translateCode: "thai",
		displayName: "ไทย",
		locale: "th-TH",
		icon: "🇹🇭",
	},
	vi: {
		translateCode: "vietnamese",
		displayName: "Tiếng Việt",
		locale: "vi-VN",
		icon: "🇻🇳",
	},
	tr: {
		translateCode: "turkish",
		displayName: "Türkçe",
		locale: "tr-TR",
		icon: "🇹🇷",
	},
	id: {
		translateCode: "indonesian",
		displayName: "Bahasa Indonesia",
		locale: "id-ID",
		icon: "🇮🇩",
	},
	fr: {
		translateCode: "french",
		displayName: "Français",
		locale: "fr-FR",
		icon: "🇫🇷",
	},
	de: {
		translateCode: "german",
		displayName: "Deutsch",
		locale: "de-DE",
		icon: "🇩🇪",
	},
	ru: {
		translateCode: "russian",
		displayName: "Русский",
		locale: "ru-RU",
		icon: "🇷🇺",
	},
	ar: {
		translateCode: "arabic",
		displayName: "العربية",
		locale: "ar-SA",
		icon: "🇸🇦",
	},
=======
    zh: {
        translateCode: "chinese_simplified",
        displayName: "中文",
        locale: "zh-CN",
        icon: "🇨🇳",
    },
    en: {
        translateCode: "english",
        displayName: "English",
        locale: "en-US",
        icon: "🇺🇸",
    },
    ja: {
        translateCode: "japanese",
        displayName: "日本語",
        locale: "ja-JP",
        icon: "🇯🇵",
    },
    ko: {
        translateCode: "korean",
        displayName: "한국어",
        locale: "ko-KR",
        icon: "🇰🇷",
    },
    es: {
        translateCode: "spanish",
        displayName: "Español",
        locale: "es-ES",
        icon: "🇪🇸",
    },
    th: {
        translateCode: "thai",
        displayName: "ไทย",
        locale: "th-TH",
        icon: "🇹🇭",
    },
    vi: {
        translateCode: "vietnamese",
        displayName: "Tiếng Việt",
        locale: "vi-VN",
        icon: "🇻🇳",
    },
    tr: {
        translateCode: "turkish",
        displayName: "Türkçe",
        locale: "tr-TR",
        icon: "🇹🇷",
    },
    id: {
        translateCode: "indonesian",
        displayName: "Bahasa Indonesia",
        locale: "id-ID",
        icon: "🇮🇩",
    },
    fr: {
        translateCode: "french",
        displayName: "Français",
        locale: "fr-FR",
        icon: "🇫🇷",
    },
    de: {
        translateCode: "german",
        displayName: "Deutsch",
        locale: "de-DE",
        icon: "🇩🇪",
    },
    ru: {
        translateCode: "russian",
        displayName: "Русский",
        locale: "ru-RU",
        icon: "🇷🇺",
    },
    ar: {
        translateCode: "arabic",
        displayName: "العربية",
        locale: "ar-SA",
        icon: "🇸🇦",
    },
>>>>>>> upstream/main
} as const satisfies Record<string, LanguageConfig>;

/** 支持的语言代码列表 */
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CONFIG) as Array<
<<<<<<< HEAD
	keyof typeof LANGUAGE_CONFIG
=======
    keyof typeof LANGUAGE_CONFIG
>>>>>>> upstream/main
>;

export type SupportedLanguage = keyof typeof LANGUAGE_CONFIG;

/**
 * 配置文件语言代码到翻译服务语言代码的映射
 * 自动从 LANGUAGE_CONFIG 生成
 */
export const langToTranslateMap: Record<string, string> = Object.fromEntries(
<<<<<<< HEAD
	Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => [
		lang,
		config.translateCode,
	]),
=======
    Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => [
        lang,
        config.translateCode,
    ]),
>>>>>>> upstream/main
);

/**
 * 翻译服务语言代码到配置文件语言代码的映射
 * 自动从 LANGUAGE_CONFIG 生成
 */
export const translateToLangMap: Record<string, string> = Object.fromEntries(
<<<<<<< HEAD
	Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => [
		config.translateCode,
		lang,
	]),
=======
    Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => [
        config.translateCode,
        lang,
    ]),
>>>>>>> upstream/main
);

/**
 * 语言代码到 locale 的映射
 * 自动从 LANGUAGE_CONFIG 生成
 */
export const langToLocaleMap: Record<string, string> = Object.fromEntries(
<<<<<<< HEAD
	Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => [
		lang,
		config.locale,
	]),
);

/**
 * 获取所有支持翻译的语言列表（用于 TranslateButton）
 */
export function getSupportedTranslateLanguages() {
	return Object.entries(LANGUAGE_CONFIG).map(([code, config]) => ({
		code: config.translateCode,
		name: config.displayName,
		icon: config.icon,
		langCode: code,
	}));
=======
    Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => [lang, config.locale]),
);

/**
 * 获取所有支持翻译的语言列表（用于 Translator）
 */
export function getSupportedTranslateLanguages() {
    return Object.entries(LANGUAGE_CONFIG).map(([code, config]) => ({
        code: config.translateCode,
        name: config.displayName,
        icon: config.icon,
        langCode: code,
    }));
>>>>>>> upstream/main
}
