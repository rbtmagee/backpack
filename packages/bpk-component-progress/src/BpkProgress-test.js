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
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import BpkProgress from './BpkProgress';

describe('BpkProgress', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkProgress min={0} max={100} value={25} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={100} value={25} className="my-progress-bar" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "small" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={9} value={2} small />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "stepped" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={9} value={2} stepped />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "stepColor" attribute', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={9} value={2} stepped stepColor="blue" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "small" and "stepped" attributes', () => {
    const { asFragment } = render(
      <BpkProgress min={0} max={9} value={2} small stepped />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call "onComplete" when "value" is set to be >= "max"', () => {
    const onCompleteSpy = jest.fn();
    const tree = shallow(
      <BpkProgress min={0} max={100} value={10} onComplete={onCompleteSpy} />,
      { lifecycleExperimental: true }, // See https://github.com/airbnb/enzyme/pull/318
    );
    expect(onCompleteSpy).not.toHaveBeenCalled();
    tree.setProps({ value: 100 }).update();
    expect(onCompleteSpy).toHaveBeenCalled();
  });

  it('should call "onCompleteTransitionEnd" when "value" is set to be >= "max"', () => {
    const onCompleteTransitionEndSpy = jest.fn();
    const tree = shallow(
      <BpkProgress
        min={0}
        max={100}
        value={10}
        onCompleteTransitionEnd={onCompleteTransitionEndSpy}
      />,
      { lifecycleExperimental: true }, // See https://github.com/airbnb/enzyme/pull/318
    );
    expect(onCompleteTransitionEndSpy).not.toHaveBeenCalled();
    tree.setProps({ value: 100 }).update();
    expect(onCompleteTransitionEndSpy).toHaveBeenCalled();
    expect(onCompleteTransitionEndSpy.mock.calls.length).toBe(1);

    tree
      .childAt(0)
      .props()
      .onTransitionEnd();
    expect(onCompleteTransitionEndSpy).toHaveBeenCalled();
    expect(onCompleteTransitionEndSpy.mock.calls.length).toBe(2);
  });
});
