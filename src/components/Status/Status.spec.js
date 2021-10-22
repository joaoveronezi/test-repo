import React from 'react';
import { shallow } from "enzyme";
import Status from './Status';

describe("Status component", () => {

  it("should render the component", () => {
    const Wrapp = shallow(
      <Status
        online={true}
        loading={false}
      />
    );
    expect(Wrapp.text()).toEqual("ONLINE");
  })
})