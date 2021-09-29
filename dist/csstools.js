export { CssTools };
class CssTools {
    static elemClassAdd(elem, className) {
        elem?.classList.add(className);
    }
    static elemClassRemove(elem, className) {
        elem?.classList.remove(className);
    }
    static elemClassToggle(elem, className) {
        elem?.classList.toggle(className);
    }
    static injectCss(css) {
        const elemStyle = document.createElement('style');
        elemStyle.textContent = css;
        document.head.append(elemStyle);
    }
}
