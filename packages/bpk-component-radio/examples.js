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

import React from 'react';
import { action, BpkDarkExampleWrapper } from 'bpk-storybook-utils';

import BpkRadio from './index';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolores doloremque, expedita
quaerat temporibus ipsam, ut, ipsa, velit sed assumenda suscipit dolore quod similique delectus numquam neque!
Nesciunt, voluptate, illo.`;

class GroupExample extends React.Component<{}, { value: string }> {
  constructor() {
    super();
    this.state = { value: 'Lagos' };
  }

  updateValue = (value: string) => {
    action(`Radio changed. New value: ${value}`);
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { ...rest } = this.props;
    return (
      <div>
        {['Lagos', 'Kano', 'Ibadan', 'Benin City'].map(city => (
          <div>
            <BpkRadio
              {...rest}
              id={city}
              name={city}
              label={city}
              onChange={event => {
                this.updateValue(event.target.value);
              }}
              value={city}
              checked={value === city}
              disabled={city === 'Benin City'}
            />
          </div>
        ))}
      </div>
    );
  }
}

const DefaultExample = () => <GroupExample />;

const Multiline = () => (
  <BpkRadio
    id="multi_line"
    name="multi_line"
    label={loremIpsum}
    onChange={action('radio changed')}
  />
);

const Invalid = () => <GroupExample valid={false} />;

const White = () => (
  <BpkDarkExampleWrapper padded>
    <GroupExample white />
  </BpkDarkExampleWrapper>
);

const DisabledChecked = () => (
  <BpkRadio
    id="disabled_checked"
    name="disabled_checked"
    label="Return"
    onChange={action('radio changed')}
    checked
    disabled
  />
);

const DisabledUnchecked = () => (
  <BpkRadio
    id="disabled"
    name="disabled"
    label="Return"
    onChange={action('radio changed')}
    disabled
  />
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <Multiline />
    <Invalid />
    <White />
    <DisabledChecked />
    <DisabledUnchecked />
  </div>
);

export {
  DefaultExample,
  Multiline,
  Invalid,
  White,
  DisabledChecked,
  DisabledUnchecked,
  MixedExample,
};
