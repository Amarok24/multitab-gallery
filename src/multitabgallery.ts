/*
MultiTab-Gallery
Version 1.0.2
Copyright 2021 Jan Prazak, https://github.com/Amarok24

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { CssTools } from "./csstools.js";

export { MultiTabGallery };


class MultiTabGallery {

  public navWrappers: NodeListOf<Element>;
  public contentWrappers: NodeListOf<Element>;
  public maxHeightIndexes: number[] = [];

  public cssClassCardWrapper = 'mt-card-wrapper';
  public cssClassCardContent = 'mt-card-content';
  public cssClassNavActive = 'mt-selected';
  public cssClassContentActive = 'mt-shown';
  public cssClassContentHighest = 'mt-highest';

  private cssMaybeStatic = 'position: static;';
  private _timeoutIdWindowResize = 0;

  constructor(queryNavWrappers: string, queryContentWrappers: string, keepHeight: boolean = true) {
    this.navWrappers = document.querySelectorAll<Element>(queryNavWrappers);
    this.contentWrappers = document.querySelectorAll<Element>(queryContentWrappers);
    this.coupleNavAndCards(this.navWrappers, this.contentWrappers);

    if (keepHeight) {
      this.cssMaybeStatic = '';
      this.recalculateHighestElemIndexes();
      window.addEventListener('resize', this.recalculateHighestElemIndexes);
    }

    this.init();
  }


  protected init() {
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
        ${this.cssMaybeStatic}
      }

      .mt-card-content.mt-highest {
        position: static;
      }
      `);

    for (let i = 0; i < this.contentWrappers.length; i++) {
      CssTools.elemClassAdd(this.contentWrappers[i].children[0], this.cssClassContentActive);
      CssTools.elemClassAdd(this.contentWrappers[i], this.cssClassCardWrapper);
    }

    for (let w = 0; w < this.contentWrappers.length; w++) {

      for (let ch = 0; ch < this.contentWrappers[w].childElementCount; ch++) {
        CssTools.elemClassAdd(this.contentWrappers[w].children[ch], this.cssClassCardContent);
      }

    }
  }


  protected coupleNavAndCards(
    navWrappers: NodeListOf<Element>, contentWrappers: NodeListOf<Element>): void {

    const onNavButtonClick = (
      wrapperIndex: number, buttonIndex: number, ev: Event): void => {
      // Must be an arrow function because of 'this'.
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


  protected getHighestElemIndexes(nodeList: NodeListOf<Element>): number[] {
    let numArray: number[] = [];

    if (nodeList.length === 0) return numArray;

    for (let parentIndex = 0; parentIndex < nodeList.length; parentIndex++) {
      let tempPixels = 0;
      let tempMaxPixels = 0;
      let currentMaxIndex = 0;

      for (let ch = 0; ch < nodeList[parentIndex].childElementCount; ch++) {
        tempPixels = nodeList[parentIndex].children[ch].getBoundingClientRect().height;
        //console.log('tempPixels ', tempPixels);

        if (tempPixels > tempMaxPixels) {
          currentMaxIndex = ch;
          tempMaxPixels = tempPixels;
        }
      }

      numArray.push(currentMaxIndex);
    }

    return numArray;
  }

  /* Must be an arrow function because AFs don't have own binding to 'this'.
    If a regular function was used it would throw an error in event listener 'resize'.
  */
  protected recalculateHighestElemIndexes = (): void => {

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
      // Optimization to not overload the browser with too many func executions.
      // Timeout ID gets deleted each time, so doAfterResize gets executed only after
      // user stops resizing the window (number in milliseconds below).
      clearTimeout(this._timeoutIdWindowResize);
    }
    this._timeoutIdWindowResize = setTimeout(doAfterResize, 200);
  };

}
