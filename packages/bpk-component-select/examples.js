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

import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'bpk-storybook-utils';

import BpkSelect from './index';

class StatefulBpkSelect extends React.Component {
  constructor() {
    super();
    this.state = { value: 'oranges' };
  }

  onChange = value => {
    action(`BpkSelect changed. New value: ${value}`);
    this.setState({ value });
  };

  render() {
    return (
      <BpkSelect
        id="destination"
        name="destination"
        value={this.state.value}
        onChange={event => {
          this.onChange(event.target.value);
        }}
        {...this.props}
      >
        <option value="Karachi">Karachi</option>
        <option value="Lahore">Lahore</option>
        <option value="Faisalabad">Faisalabad</option>
        <option value="Islamabad" disabled>
          Islamabad
        </option>
      </BpkSelect>
    );
  }
}

const getFlagUriFromCountryCode = countryCode =>
  `https://images.skyscnr.com/images/country/flag/header/${countryCode.toLowerCase()}.png`;

const countries = [
  { key: 0, id: 'AT', name: 'Austria', disabled: false },
  { key: 1, id: 'BR', name: 'Brazil', disabled: false },
  { key: 2, id: 'CN', name: 'China', disabled: false },
  { key: 3, id: 'DJ', name: 'Djibouti', disabled: false },
  { key: 4, id: 'EC', name: 'Ecuador', disabled: false },
  { key: 5, id: 'GD', name: 'Grenada', disabled: false },
  { key: 6, id: 'HT', name: 'Haiti', disabled: false },
  { key: 7, id: 'IT', name: 'Italy', disabled: false },
  { key: 8, id: 'US', name: 'USA', disabled: true },
];
class SelectWithImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'IT',
    };
  }

  getItemByValue = () => {
    const { options } = this.props;
    return val => {
      const items = options.filter(o => o.id === val);
      if (!items.length) throw new Error('Item does not exists');
      return items[0];
    };
  };

  getItem = this.getItemByValue();

  handleChange = e => {
    const item = this.getItem(e.target.value);

    this.setState({
      selected: item.id,
    });
  };

  image = id => <img alt="Flag" src={getFlagUriFromCountryCode(id)} />;

  render() {
    const { options, ...rest } = this.props;
    return (
      <BpkSelect
        value={this.getItem(this.state.selected).id}
        {...rest}
        image={this.image(this.getItem(this.state.selected).id)}
        onChange={this.handleChange}
      >
        {options.map(o => (
          <option key={o.id} disabled={o.disabled && 'disabled'} value={o.id}>
            {o.name}
          </option>
        ))}
      </BpkSelect>
    );
  }
}

SelectWithImage.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Example = () => <StatefulBpkSelect />;

const Invalid = () => <StatefulBpkSelect valid={false} />;

const InvalidWithImage = () => (
  <SelectWithImage
    valid={false}
    id="countries"
    name="countries"
    options={countries}
  />
);

const Disabled = () => <StatefulBpkSelect disabled />;

const Large = () => <StatefulBpkSelect large />;

const Docked = () => (
  <div style={{ display: 'flex' }}>
    <StatefulBpkSelect large docked />
    <StatefulBpkSelect large docked />
    <StatefulBpkSelect large docked />
    <StatefulBpkSelect large docked />
  </div>
);

const DockedWithImages = () => (
  <div style={{ display: 'flex' }}>
    <SelectWithImage
      large
      dockedFirst
      id="countries"
      name="countries"
      options={countries}
    />
    <SelectWithImage
      large
      dockedMiddle
      id="countries"
      name="countries"
      options={countries}
    />
    <SelectWithImage
      large
      dockedMiddle
      id="countries"
      name="countries"
      options={countries}
    />
    <SelectWithImage
      large
      dockedLast
      id="countries"
      name="countries"
      options={countries}
    />
  </div>
);

const ManuallyDocked = () => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '100%' }}>
      <StatefulBpkSelect large dockedFirst />
    </div>
    <div style={{ width: '100%' }}>
      <StatefulBpkSelect large dockedMiddle />
    </div>
    <div style={{ width: '100%' }}>
      <StatefulBpkSelect large dockedMiddle />
    </div>
    <div style={{ width: '100%' }}>
      <StatefulBpkSelect large dockedLast />
    </div>
  </div>
);

const ManuallyDockedWithImages = () => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        large
        dockedFirst
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        large
        dockedMiddle
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        large
        dockedMiddle
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        large
        dockedLast
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
  </div>
);

const WithImage = () => (
  <SelectWithImage id="countries" name="countries" options={countries} />
);

const WithImageLarge = () => (
  <SelectWithImage large id="countries" name="countries" options={countries} />
);

const MixedExample = () => (
  <div>
    <Example />
    <Invalid />
    <InvalidWithImage />
    <Disabled />
    <Large />
    <Docked />
    <ManuallyDocked />
  </div>
);

export {
  Example,
  Invalid,
  InvalidWithImage,
  Disabled,
  Large,
  Docked,
  DockedWithImages,
  ManuallyDocked,
  ManuallyDockedWithImages,
  WithImage,
  WithImageLarge,
  MixedExample,
};
