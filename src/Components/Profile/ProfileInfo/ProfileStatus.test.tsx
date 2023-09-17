import React from "react";
import {create} from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="New status for component" updateStatus={()=>{}}/>);
    const instance = component.getInstance();
    if (instance) {
      expect(instance.props.status).toBe("New status for component");
    }
  });

  test("after creation <span> should be showed", () => {
    const component = create(<ProfileStatus status="New status for component" updateStatus={()=>{}}/>);
    const root = component.root;
    let span = root.findByType('span')
    expect(span).not.toBeNull();
  });

  test("after creation <input> shouldn't be showed", () => {
    const component = create(<ProfileStatus status="New status for component" updateStatus={()=>{}}/>);
    const root = component.root;
    expect(()=>{
      let input = root.findByType('input')
    }).toThrow();
  });

  test("after creation <span> should contain correct status", () => {
    const component = create(<ProfileStatus status="New status for component" updateStatus={()=>{}}/>);
    const root = component.root;
    let span = root.findByType('span')
    expect(span.children[0]).toBe('New status for component');
  });

  test("input should be showed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="New status for component" updateStatus={()=>{}}/>);
    const root = component.root;
    let span = root.findByType('span')
    span.props.onDoubleClick();
    let input = root.findByType('input')
    expect(input.props.value).toBe('New status for component');
    expect(()=>{
      let span = root.findByType('span')
    }).toThrow();
  });

  test("callback should be called", () => {
    const mockCallback = jest.fn()
    const component = create(<ProfileStatus status="New status for component" updateStatus={mockCallback}/>);
    const instance = component.getInstance()
    // @ts-ignore
    instance.offEditMode()
    expect(mockCallback.mock.calls.length).toBe(1)
  });
});