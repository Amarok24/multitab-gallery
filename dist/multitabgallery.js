import { CssTools } from "./csstools.js";
export { MultiTabGallery };
class MultiTabGallery {
    constructor(queryNavWrappers, queryContentWrappers) {
        this.maxHeightIndexes = [];
        this.cssClassNavActive = 'mt-selected';
        this.cssClassContentActive = 'mt-shown';
        this._timeoutIdWindowResize = 0;
        this.recalculateHighestElemIndexes = () => {
            const doAfterResize = () => {
                for (let w = 0; w < this.contentWrappers.length; w++) {
                    for (let ch = 0; ch < this.contentWrappers[w].childElementCount; ch++) {
                        CssTools.elemClassRemove(this.contentWrappers[w].children[ch], 'mt-highest');
                    }
                }
                this.maxHeightIndexes = this.getHighestElemIndexes(this.contentWrappers);
                console.log('Indexes of highest content:', this.maxHeightIndexes);
                for (let w = 0; w < this.contentWrappers.length; w++) {
                    const highestChild = this.contentWrappers[w].children[this.maxHeightIndexes[w]];
                    CssTools.elemClassAdd(highestChild, 'mt-highest');
                }
            };
            if (this._timeoutIdWindowResize !== 0) {
                clearTimeout(this._timeoutIdWindowResize);
            }
            this._timeoutIdWindowResize = setTimeout(doAfterResize, 200);
        };
        this.navWrappers = document.querySelectorAll(queryNavWrappers);
        this.contentWrappers = document.querySelectorAll(queryContentWrappers);
        this.coupleNavAndCards(this.navWrappers, this.contentWrappers);
        this.recalculateHighestElemIndexes();
        window.addEventListener('resize', this.recalculateHighestElemIndexes);
        this.init();
    }
    init() {
        CssTools.injectCss(`
      .mt-card-wrapper {
        position: relative;
      }

      .mt-card-content {
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: auto;
        max-width: 100%;
        opacity: 0;
        transition: opacity 500ms ease-out;
      }

      .mt-card-content.mt-shown {
        z-index: 1;
        opacity: 1;
      }

      .mt-card-content.mt-highest {
        position: static;
      }
      `);
        for (let i = 0; i < this.contentWrappers.length; i++) {
            CssTools.elemClassAdd(this.contentWrappers[i].children[0], 'mt-shown');
            CssTools.elemClassAdd(this.contentWrappers[i], 'mt-card-wrapper');
        }
        for (let w = 0; w < this.contentWrappers.length; w++) {
            for (let ch = 0; ch < this.contentWrappers[w].childElementCount; ch++) {
                CssTools.elemClassAdd(this.contentWrappers[w].children[ch], 'mt-card-content');
            }
        }
    }
    coupleNavAndCards(navWrappers, contentWrappers) {
        const onNavButtonClick = (wrapperIndex, buttonIndex, ev) => {
            ev.preventDefault();
            for (let i = 0; i < this.contentWrappers[wrapperIndex].childElementCount; i++) {
                CssTools.elemClassRemove(this.contentWrappers[wrapperIndex].children[i], this.cssClassContentActive);
                CssTools.elemClassRemove(this.navWrappers[wrapperIndex].children[i], this.cssClassNavActive);
            }
            CssTools.elemClassAdd(this.contentWrappers[wrapperIndex].children[buttonIndex], this.cssClassContentActive);
            CssTools.elemClassAdd(this.navWrappers[wrapperIndex].children[buttonIndex], this.cssClassNavActive);
        };
        for (let w = 0; w < this.navWrappers.length; w++) {
            for (let b = 0; b < this.navWrappers[w].childElementCount; b++) {
                this.navWrappers[w].children[b].addEventListener('click', onNavButtonClick.bind(null, w, b));
            }
        }
    }
    getHighestElemIndexes(nodeList) {
        let numArray = [];
        if (nodeList.length === 0)
            return numArray;
        for (let parentIndex = 0; parentIndex < nodeList.length; parentIndex++) {
            let tempPixels = 0;
            let tempMaxPixels = 0;
            let currentMaxIndex = 0;
            for (let ch = 0; ch < nodeList[parentIndex].childElementCount; ch++) {
                tempPixels = nodeList[parentIndex].children[ch].getBoundingClientRect().height;
                console.log('tempPixels ', tempPixels);
                if (tempPixels > tempMaxPixels) {
                    currentMaxIndex = ch;
                    tempMaxPixels = tempPixels;
                }
            }
            numArray.push(currentMaxIndex);
        }
        return numArray;
    }
}
