import React from 'react';
import { shallow } from "enzyme";
import configureStore from '../../store/index';
import Node from './Node';

describe("Node component", () => {
  const mock = jest.fn();

  const nodes = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: false
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: false
      }
    ]
  };



  it("should render the component", () => {
    const Wrapp = shallow(
      <Node
        node={nodes.list[0]}
        key={nodes.list[0].url}
        expanded={true}
        toggleNodeExpanded={mock}
      />
    );
    expect(Wrapp.text()).toEqual("https://thawing-springs-53971.herokuapp.com");
  })
})