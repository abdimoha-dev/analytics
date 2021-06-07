import { shallow } from 'enzyme'
import React from 'react'
import Item from '../UnselectedItem'

describe('Unselected item component', () => {
    let props
    let shallowItem

    const item = () => {
        if (!shallowItem) {
            shallowItem = shallow(<Item {...props} />)
        }
        return shallowItem
    }

    beforeEach(() => {
        props = {
            id: 'unselected-item-test-id',
            name: 'I am an unselected item',
            index: 0,
            highlighted: false,
            onClick: jest.fn(),
        }
        shallowItem = undefined
    })

    it('renders an unhighlighted item', () => {
        const wrapper = item()

        expect(wrapper).toMatchSnapshot()
    })

    it('renders a highlighted item', () => {
        props.highlighted = true
        const wrapper = item()

        expect(wrapper).toMatchSnapshot()
    })

    describe('onClick', () => {
        it('fires onClick property', () => {
            item()
                .props()
                .onClick({ preventDefault: () => undefined })

            expect(props.onClick).toBeCalledTimes(1)
        })

        it('fires onClick with correct arguments when metaKey pressed', () => {
            item()
                .props()
                .onClick({
                    preventDefault: () => undefined,
                    metaKey: true,
                    ctrlKey: false,
                    shiftKey: false,
                })

            expect(props.onClick).toBeCalledTimes(1)
            expect(props.onClick).toBeCalledWith({
                isCtrlPressed: true,
                isShiftPressed: false,
                index: 0,
                id: props.id,
            })
        })

        it('fires onClick with correct arguments when ctrlKey pressed', () => {
            item()
                .props()
                .onClick({
                    preventDefault: () => undefined,
                    metaKey: false,
                    ctrlKey: true,
                    shiftKey: false,
                })

            expect(props.onClick).toBeCalledTimes(1)
            expect(props.onClick).toBeCalledWith({
                isCtrlPressed: true,
                isShiftPressed: false,
                index: 0,
                id: props.id,
            })
        })

        it('fires onClick with correct arguments when shiftKey pressed', () => {
            item()
                .props()
                .onClick({
                    preventDefault: () => undefined,
                    metaKey: false,
                    ctrlKey: false,
                    shiftKey: true,
                })

            expect(props.onClick).toBeCalledTimes(1)
            expect(props.onClick).toBeCalledWith({
                isCtrlPressed: false,
                isShiftPressed: true,
                index: 0,
                id: props.id,
            })
        })
    })
})
