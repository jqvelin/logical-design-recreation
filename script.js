"use strict";

const header = document.querySelector(".header");
const wordmark = document.querySelector(".header__wordmark");
const mark = document.querySelector(".header__mark");

const sections = document.querySelectorAll(".section");

const introSection = document.querySelector(".intro-section");
const introSectionRightBg = document.querySelector(".intro-section__right-background")
const deployImg = document.querySelector(".intro-section__right-img-deploy")
const envCardImg = document.querySelector(".intro-section__right-img-env-card")
const typeImg = document.querySelector(".intro-section__right-img-type")
const modalImg = document.querySelector(".intro-section__right-img-modal")


const screensContainer = document.querySelector(".screens-container");
const screens = document.querySelectorAll(".screen");


// Часть introSection, которую проскролилли
// диапазон значений - [0; 1]
let scrolledPart = 0;

handleAnimations()
setupIntersectionObserver();

window.addEventListener("scroll", handleAnimations)
window.addEventListener("resize", handleAnimations)

function handleAnimations() {
    updateScrolledPart();

    handleHeaderAnimations();
    handleScreensContainerAnimations();
    handleIntroSectionScroll();
    handleIntroSectionImgAnimations();
}

function setupIntersectionObserver() {
    const intersectionObserver = new IntersectionObserver((entries) => {

    })
}

function handleHeaderAnimations() {
    // Промотанная часть introSection, при достижении которой начинаем анимацию
    const animationBreakpoint = 0.25;

    if (scrolledPart >= animationBreakpoint) {
        wordmark.classList.add("header__wordmark--dark")
    } else {
        wordmark.classList.remove("header__wordmark--dark")
    }

    // Игнорируем значения меньше animationBreakpoint
    const restrictedScrolledPart = Math.max(animationBreakpoint, scrolledPart);
    // В каких пределах значения скролла будем менять ширину
    const scrollRange = 1 - animationBreakpoint;

    const minWidthPercent = 50;
    // Промежуток изменения ширины (от 50% до 100%)
    const widthRange = 100 - minWidthPercent;

    const WIDTH = (restrictedScrolledPart - animationBreakpoint) / scrollRange * widthRange + minWidthPercent;
    
    const translateYScrollRange = -25 - 0;

    const minTranslateYPercent = 0;

    const TRANSLATE_Y = (restrictedScrolledPart - animationBreakpoint) / scrollRange * translateYScrollRange + minTranslateYPercent;
    
    const markRotationRange = 360;

    const MARK_ROTATE = (restrictedScrolledPart - animationBreakpoint) / scrollRange * markRotationRange;

    const markAndWordmarkScaleMin = 1;
    const markAndWordmarkScaleRange = 0.75 - markAndWordmarkScaleMin;

    const MARK_AND_WORDMARK_SCALE = (restrictedScrolledPart - animationBreakpoint) / scrollRange * markAndWordmarkScaleRange + markAndWordmarkScaleMin;

    header.style = `width: ${WIDTH}%; transform: translateY(${TRANSLATE_Y}%)`;
    mark.style = `transform: rotate(${MARK_ROTATE}deg) scale(${MARK_AND_WORDMARK_SCALE})`
    wordmark.style = `transform: scale(${MARK_AND_WORDMARK_SCALE})`
}

function handleScreensContainerAnimations() {
    const animationBreakpoint = 0;
    const restrictedScrolledPart = Math.min(0.3, scrolledPart)
    const scrollRange = 0.3 - animationBreakpoint;
    const translateXMin = -25;
    const translateXRange = 0 - translateXMin;

    const TRANSLATE_X = (restrictedScrolledPart - animationBreakpoint) / scrollRange * translateXRange + translateXMin;

    const translateYMin = 40;
    const translateYRange = 0 - translateYMin;

    const TRANSLATE_Y = (restrictedScrolledPart - animationBreakpoint) / scrollRange * translateYRange + translateYMin;

    const scaleMin = 0.5;
    const scaleRange = 1 - scaleMin;

    const SCALE = (restrictedScrolledPart - animationBreakpoint) / scrollRange * scaleRange + scaleMin;

    screensContainer.style = `transform: translateX(${TRANSLATE_X}%) translateY(${TRANSLATE_Y}%) scale(${SCALE})`;
}

function handleIntroSectionScroll() {
    introSectionRightBg.style = `opacity: ${1 - scrolledPart}`;

    const animationBreakpoint = 0.3;
    const restrictedScrolledPart = Math.max(animationBreakpoint, scrolledPart);
    const scrollRange = 1 - animationBreakpoint;

    const translateYRange = -introSection.clientHeight;

    const TRANSLATE_Y =  (restrictedScrolledPart - animationBreakpoint) / scrollRange * translateYRange;

    introSection.style = `transform: translateY(${TRANSLATE_Y}px)`;
}

function handleIntroSectionImgAnimations() {
    const animationsBreakpoint = 0.3;
    const scrollRange = 1 - animationsBreakpoint;
    const restrictedScrolledPart = Math.max(animationsBreakpoint, scrolledPart);

    const deployImgTranslateYRange = 400 - 0;
    const DEPLOY_IMG_TRANSLATE_Y = (restrictedScrolledPart - animationsBreakpoint) / scrollRange * deployImgTranslateYRange;

    const modalImgTranslateYRange = -800 - 0;
    const MODAL_IMG_TRANSLATE_Y = (restrictedScrolledPart - animationsBreakpoint) / scrollRange * modalImgTranslateYRange;

    const envCardImgTranslateXRange = -100 - 0;
    const ENV_CARD_IMG_TRANSLATE_X = (restrictedScrolledPart - animationsBreakpoint) / scrollRange * envCardImgTranslateXRange;

    const typeImgTranslateXRange = 300 - 0;
    const TYPE_IMG_TRANSLATE_X = (restrictedScrolledPart - animationsBreakpoint) / scrollRange * typeImgTranslateXRange;

    deployImg.style = `transform: translateY(${DEPLOY_IMG_TRANSLATE_Y}px)`
    modalImg.style = `transform: translateY(${MODAL_IMG_TRANSLATE_Y}px)`
    envCardImg.style = `transform: translateX(${ENV_CARD_IMG_TRANSLATE_X}px)`
    typeImg.style = `transform: translateX(${TYPE_IMG_TRANSLATE_X}px)`
}

function handleOutroSectionAnimations() {
    
}

function updateScrolledPart() {
    scrolledPart = Math.min(document.documentElement.scrollTop / introSection.clientHeight, 1);
}