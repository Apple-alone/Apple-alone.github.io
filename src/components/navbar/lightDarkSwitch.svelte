<script lang="ts">
<<<<<<< HEAD
import { DARK_MODE, LIGHT_MODE, SYSTEM_MODE } from "@constants/constants";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { getStoredTheme, setTheme } from "@utils/theme";
import type { LIGHT_DARK_MODE } from "@/types/config";

const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, SYSTEM_MODE];
let mode: LIGHT_DARK_MODE = $state(getStoredTheme());

function switchScheme(newMode: LIGHT_DARK_MODE) {
	mode = newMode;
	setTheme(newMode);
}

function toggleScheme() {
	let i = 0;
	for (; i < seq.length; i++) {
		if (seq[i] === mode) {
			break;
		}
	}
	switchScheme(seq[(i + 1) % seq.length]);
}

function showPanel() {
	const panel = document.querySelector("#light-dark-panel");
	panel.classList.remove("float-panel-closed");
}

function hidePanel() {
	const panel = document.querySelector("#light-dark-panel");
	panel.classList.add("float-panel-closed");
}
=======
import Icon from "@iconify/svelte";
import { onMount } from "svelte";

import { BREAKPOINT_LG } from "@constants/breakpoints";
import { SYSTEM_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";
import {
    getStoredTheme,
    setTheme,
} from "@utils/theme";
import { onClickOutside } from "@utils/widget";
import type { LIGHT_DARK_MODE } from "@/types/config";
import { siteConfig } from "@/config";
import { i18n } from "@i18n/translation";
import I18nKey from "@i18n/i18nKey";
import DropdownItem from "@/components/common/DropdownItem.svelte";
import DropdownPanel from "@/components/common/DropdownPanel.svelte";


const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, SYSTEM_MODE];
let mode: LIGHT_DARK_MODE = $state(siteConfig.defaultTheme || SYSTEM_MODE);
let isOpen = $state(false);

function switchScheme(newMode: LIGHT_DARK_MODE) {
    mode = newMode;
    setTheme(newMode);
}

function toggleScheme() {
    let i = 0;
    for (; i < seq.length; i++) {
        if (seq[i] === mode) {
            break;
        }
    }
    switchScheme(seq[(i + 1) % seq.length]);
}

function openPanel() {
    isOpen = true;
}

function closePanel() {
    isOpen = false;
}

// 点击外部关闭面板
function handleClickOutside(event: MouseEvent) {
    if (!isOpen) return;
    onClickOutside(event, "light-dark-panel", "scheme-switch", () => {
        isOpen = false;
    });
}

onMount(() => {
    mode = getStoredTheme();
    document.addEventListener("click", handleClickOutside);
    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
});
>>>>>>> upstream/main
</script>


<!-- z-50 make the panel higher than other float panels -->
<<<<<<< HEAD
<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
    <button aria-label="Light/Dark/System Mode" role="menuitem" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch" onmouseenter={showPanel} onclick={() => { if (window.innerWidth < 1024) { showPanel(); } else { toggleScheme(); } }}>
=======
<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={closePanel}>
    <button aria-label="Light/Dark/System Mode" role="menuitem" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch" onmouseenter={openPanel} onclick={() => { if (window.innerWidth < BREAKPOINT_LG) { openPanel(); } else { toggleScheme(); } }}>
>>>>>>> upstream/main
        <div class="absolute" class:opacity-0={mode !== LIGHT_MODE}>
            <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== DARK_MODE}>
            <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== SYSTEM_MODE}>
            <Icon icon="material-symbols:radio-button-partial-outline" class="text-[1.25rem]"></Icon>
        </div>
    </button>
<<<<<<< HEAD
    <div id="light-dark-panel" class="absolute transition float-panel-closed top-11 -right-2 pt-5" >
        <div class="card-base float-panel p-2">
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={mode === LIGHT_MODE}
=======
    <div id="light-dark-panel" class="absolute transition top-11 -right-2 pt-5" class:float-panel-closed={!isOpen}>
        <DropdownPanel>
            <DropdownItem
                    isActive={mode === LIGHT_MODE}
                    isLast={false}
>>>>>>> upstream/main
                    onclick={() => switchScheme(LIGHT_MODE)}
            >
                <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.lightMode)}
<<<<<<< HEAD
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={mode === DARK_MODE}
=======
            </DropdownItem>
            <DropdownItem
                    isActive={mode === DARK_MODE}
                    isLast={false}
>>>>>>> upstream/main
                    onclick={() => switchScheme(DARK_MODE)}
            >
                <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.darkMode)}
<<<<<<< HEAD
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95"
                    class:current-theme-btn={mode === SYSTEM_MODE}
=======
            </DropdownItem>
            <DropdownItem
                    isActive={mode === SYSTEM_MODE}
                    isLast={true}
>>>>>>> upstream/main
                    onclick={() => switchScheme(SYSTEM_MODE)}
            >
                <Icon icon="material-symbols:radio-button-partial-outline" class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.systemMode)}
<<<<<<< HEAD
            </button>
        </div>
=======
            </DropdownItem>
        </DropdownPanel>
>>>>>>> upstream/main
    </div>
</div>