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

import PropTypes from 'prop-types';
import React, { type Node, Component, type Element } from 'react';
import { cssModules, withDefaultProps } from 'bpk-react-utils';
import BpkButton from 'bpk-component-button';
import { BpkNavigationBarButtonLink } from 'bpk-component-navigation-bar';
import { withAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import BpkText from 'bpk-component-text';
import {
  lineHeightBase,
  iconSizeSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import STYLES from './examples.module.scss';

import BpkModal from './index';

const ArrowIconWithRtl = withAlignment(
  withRtlSupport(ArrowIcon),
  lineHeightBase,
  iconSizeSm,
);
const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: 'base',
  tagName: 'p',
  className: getClassName('bpk-modal-paragraph'),
});

const content = [
  <Paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas sit amet
    nisi nec ultrices. In efficitur justo ac tristique ultricies. Mauris luctus
    felis arcu, a porttitor turpis aliquet faucibus. Aenean nibh nulla, dictum
    sit amet efficitur cursus, molestie vitae enim. Aenean vel nunc purus.
    Vestibulum consectetur luctus eros ac bibendum. Donec pretium nunc mi, sed
    iaculis nibh aliquet in. Integer ut accumsan orci, non hendrerit nunc.
    Quisque ante enim, convallis lacinia arcu eu, tincidunt dignissim nunc.
    Nulla facilisi. Curabitur mattis sapien imperdiet, dignissim ligula id,
    maximus erat. Morbi sed eros vitae augue accumsan dictum sit amet eu lectus.
    Integer vitae consectetur libero, sed porttitor urna.
  </Paragraph>,
  <Paragraph>
    In arcu leo, bibendum in vestibulum quis, vulputate sed nisl. Donec sit amet
    turpis quis metus viverra rutrum id id elit. Duis luctus, mauris ut accumsan
    vehicula, magna lorem posuere velit, nec laoreet magna ante ut nulla.
    Vivamus vestibulum bibendum purus quis dictum. In accumsan convallis tempor.
    Proin porta massa et metus viverra feugiat. Aenean blandit pellentesque
    nunc, in interdum magna molestie non. Suspendisse pretium lectus et libero
    fringilla placerat. Aliquam pellentesque odio non maximus egestas. Nam
    feugiat mi ac neque sodales, in euismod dolor varius.
  </Paragraph>,
  <Paragraph>
    Aenean tempus tempus lorem in consequat. Quisque nec felis vitae mi commodo
    ultricies sit amet in lectus. Praesent imperdiet auctor nisl sit amet
    ultricies. Donec posuere placerat nulla a scelerisque. Nulla sit amet
    eleifend magna. Ut eu cursus metus, id pulvinar lectus. Proin euismod sed ex
    vel dignissim. Donec faucibus nec risus eu pellentesque. Cras vulputate
    varius volutpat. Duis ut nisi nulla. Duis volutpat lectus purus. Aliquam
    placerat dignissim mauris vitae interdum. Donec venenatis mattis mi eu
    facilisis. Maecenas pellentesque eros elementum, tincidunt tortor ac,
    fringilla massa. Cras sed orci nec erat porttitor lacinia vitae sed arcu.
  </Paragraph>,
  <Paragraph>
    Nunc lobortis arcu eget tellus tincidunt commodo. Phasellus ac tortor
    turpis. Cras ac quam non metus iaculis sollicitudin. Vestibulum ante ipsum
    primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi
    aliquam consectetur nisl at fermentum. Phasellus nisi arcu, fermentum ut
    malesuada eu, ultrices nec enim. Donec eleifend eros mauris, eu rutrum
    tellus suscipit ac. Pellentesque finibus mollis arcu, non tempor lorem
    gravida at. Nam laoreet neque quis gravida blandit. Mauris pharetra urna
    hendrerit pretium auctor. Aliquam erat volutpat. Class aptent taciti
    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    Fusce quis felis non lectus egestas pretium id sed erat. Aliquam dapibus
    erat sit amet facilisis luctus.
  </Paragraph>,
  <Paragraph>
    Vestibulum convallis ut nulla in iaculis. Aliquam erat volutpat. Nullam non
    semper sem. Ut gravida est eu nisi condimentum, lobortis gravida ipsum
    tincidunt. Duis lacinia tincidunt suscipit. Maecenas tincidunt quam ipsum,
    non sodales ante placerat in. Suspendisse malesuada auctor erat, vel
    pulvinar erat dignissim vitae.
  </Paragraph>,
];

class ModalContainer extends Component<
  {
    children: Node,
    accessoryView: ?Element<any>,
    buttonLabel: ?string,
    wrapperProps: ?Object,
  },
  {
    isOpen: boolean,
  },
> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    accessoryView: PropTypes.func,
    buttonLabel: PropTypes.string,
    wrapperProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    accessoryView: null,
    buttonLabel: null,
    wrapperProps: null,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      children,
      wrapperProps,
      buttonLabel,
      accessoryView,
      ...rest
    } = this.props;

    return (
      <div id="modal-container" {...wrapperProps}>
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>
            {buttonLabel || 'Open modal'}
          </BpkButton>
          {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
          <BpkModal
            id="my-modal"
            className="my-classname"
            isOpen={this.state.isOpen}
            onClose={this.onClose}
            getApplicationElement={() => document.getElementById('pagewrap')}
            renderTarget={() => document.getElementById('modal-container')}
            accessoryView={accessoryView}
            {...rest}
          >
            {children}
          </BpkModal>
        </div>
      </div>
    );
  }
}

const DefaultExample = () => (
  <ModalContainer title="Modal title" closeLabel="Close modal">
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const WideExample = () => (
  <ModalContainer title="Modal title" closeLabel="Close modal" wide>
    This is a wide modal.
  </ModalContainer>
);

const OverflowingExample = () => (
  <ModalContainer title="Modal title" closeLabel="Close modal">
    {React.Children.toArray(content)}
  </ModalContainer>
);

const CloseButtonTextExample = () => (
  <ModalContainer title="Modal title" closeText="Done">
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const LongTitleExample = () => (
  <ModalContainer
    title="We have to remember what's important in life: friends, waffles, and work. Or waffles, friends, work. But work has to come third."
    closeText="Done"
  >
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const NotFullScreenOnMobileExample = () => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    fullScreenOnMobile={false}
  >
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const FullScreenExample = () => (
  <ModalContainer title="Modal title" closeLabel="Close modal" fullScreen>
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const FullScreenOverflowingExample = () => (
  <ModalContainer title="Modal title" closeLabel="Close modal" fullScreen>
    {React.Children.toArray(content)}
  </ModalContainer>
);

const NestedExample = () => (
  <ModalContainer title="Modal title" closeLabel="Close modal" fullScreen>
    This is a full-screen modal. You can put anything you want in here,
    including other modals!
    <ModalContainer
      title="Inner modal title"
      closeLabel="Close modal"
      wrapperProps={{ id: 'inner-modal-container' }}
      buttonLabel="Open another modal from this modal"
      id="inner-modal"
      renderTarget={() => document.getElementById('inner-modal-container')}
    >
      This is a default modal. You can put anything you want in here.
    </ModalContainer>
  </ModalContainer>
);

const NoHeaderExample = () => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    showHeader={false}
  >
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const NoPaddingExample = () => (
  <ModalContainer title="Modal title" closeLabel="Close modal" padded={false}>
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const WithAccessoryViewExample = () => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    accessoryView={
      <BpkNavigationBarButtonLink
        label="Close"
        onClick={() => {}}
        className={getClassName('bpk-modal__leading-button')}
      >
        <div>
          <BpkText>
            <ArrowIconWithRtl /> Back to results
          </BpkText>
        </div>
      </BpkNavigationBarButtonLink>
    }
  >
    The left hand button is intentally not functional. You can put anything you
    want in here.
  </ModalContainer>
);

export {
  DefaultExample,
  WideExample,
  OverflowingExample,
  CloseButtonTextExample,
  LongTitleExample,
  NotFullScreenOnMobileExample,
  FullScreenExample,
  FullScreenOverflowingExample,
  NestedExample,
  NoHeaderExample,
  NoPaddingExample,
  WithAccessoryViewExample,
};
