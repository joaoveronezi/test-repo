import React from 'react';
import { Provider } from 'react-redux'
import { mount } from "enzyme";
import configureStore from '../../store';
import Node from './Node';

describe("Node component", () => {
  const node = {
    url: "https://localhost:3000",
    online: false,
    name: "Test",
    loading: false
  };

  const store = configureStore();

  it("Should render the component", async () => {
    const Wrapp = await mount(
      <Provider store={store}>
        <Node
          node={node}
          key={node.url}
          expanded={true}
          toggleNodeExpanded={Object}
        />
      </Provider>
    );
    expect(Wrapp.text()).toContain("Testhttps://localhost:3000OFFLINELoading...");
  })
})