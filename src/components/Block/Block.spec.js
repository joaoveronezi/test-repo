import React from 'react';
import { shallow } from "enzyme";
import Block from './Block';

describe("Block component", () => {

  it("should render the component", () => {
    const Wrapp = shallow(
      <Block
        data="Test text"
        id="001"
      />
    );
    expect(Wrapp.text()).toEqual("001Test text");
  })
})