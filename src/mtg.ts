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

import { MultiTabGallery } from "./multitabgallery.js";


// Adjust these CSS queries to match your HTML content
const cssQueryNavWrapper = '.myNav';
const cssQueryContentWrapper = '.myTabContent';

new MultiTabGallery(cssQueryNavWrapper, cssQueryContentWrapper);

/*
  Or use
    new MultiTabGallery(cssQueryNavWrapper, cssQueryContentWrapper, false);
  if you don't want to keep same height of the wrapper.
*/
