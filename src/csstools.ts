/*
MultiTab-Gallery
Version 1.0
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

export {
  CssTools
};


class CssTools {

  static elemClassAdd(elem: Element | null, className: string): void {
    elem?.classList.add(className);
  }

  static elemClassRemove(elem: Element | null, className: string): void {
    elem?.classList.remove(className);
  }

  static elemClassToggle(elem: Element | null, className: string): void {
    elem?.classList.toggle(className);
  }
  /* 
    static nodeListClassAdd<T extends Element = HTMLElement>(list: NodeListOf<T>, className: string): void {
      if (list.length === 0) return;
  
      for (let i = 0; i < list.length; i++) {
        this.elemClassAdd(list[i], className);
      }
    }
  
    static nodeListClassRemove<T extends Element = HTMLElement>(list: NodeListOf<T>, className: string): void {
      if (list.length === 0) return;
  
      for (let i = 0; i < list.length; i++) {
        this.elemClassRemove(list[i], className);
      }
    }
  
    static nodeListClassToggle<T extends Element = HTMLElement>(list: NodeListOf<T>, className: string): void {
      if (list.length === 0) return;
  
      for (let i = 0; i < list.length; i++) {
        this.elemClassToggle(list[i], className);
      }
    }
   */


  static injectCss(css: string): void {
    const elemStyle = document.createElement('style');
    elemStyle.textContent = css;
    document.head.append(elemStyle);
  }
}
