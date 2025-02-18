/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow strict */

export default (styles: {} = {}) => (
  ...classNames: Array<?string | ?boolean | ?number | ?{}>
) =>
  classNames.reduce((className, currentClass) => {
    if (currentClass && typeof currentClass === 'string') {
      const realName = styles[currentClass] || currentClass;
      return className ? `${className} ${realName}` : realName;
    }
    return className;
  }, '');
