<<<<<<< HEAD
// Function to set hue
export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
=======
import { siteConfig } from "@/config";


// Function to set hue
export function setHue(hue: number): void {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("hue", String(hue));
    }
    if (typeof document !== "undefined") {
        const r = document.querySelector(":root") as HTMLElement;
        if (!r) {
            return;
        }
        r.style.setProperty("--hue", String(hue));
    }
>>>>>>> upstream/main
}

// Function to get default hue from config-carrier dataset
export function getDefaultHue(): number {
<<<<<<< HEAD
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback);
=======
    const fallback = siteConfig.themeColor.hue.toString();
    if (typeof document !== "undefined") {
        const configCarrier = document.getElementById("config-carrier");
        return Number.parseInt(configCarrier?.dataset.hue || fallback);
    }
    return Number.parseInt(fallback);
>>>>>>> upstream/main
}

// Function to get hue from local storage or default
export function getHue(): number {
<<<<<<< HEAD
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored) : getDefaultHue();
=======
    if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("hue");
        return stored ? Number.parseInt(stored) : getDefaultHue();
    }
    return getDefaultHue();
>>>>>>> upstream/main
}

// Function to initialize hue from local storage or default
export function initHue(): void {
<<<<<<< HEAD
	const hue = getHue();
	setHue(hue);
}
=======
    const hue = getHue();
    setHue(hue);
}
>>>>>>> upstream/main
