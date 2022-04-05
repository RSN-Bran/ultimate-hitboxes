import React from 'react'
//import {render} from "@testing-library/react"
import {create, act} from 'react-test-renderer';
import {shallow} from 'enzyme'

import Slider from '../components/Slider'


import "@testing-library/jest-dom/extend-expect"
import { Router } from 'react-router-dom'

describe ('Slider component', () => {
    it('current frame test', () => {
        let currentFrame=3
        let totalFrames=10
        const wrapper = shallow(<Slider currentFrame={currentFrame} totalFrames={totalFrames}/>)
        const text = wrapper.find('h5').text()
        expect(text).toEqual(`Frame: ${currentFrame}/${totalFrames}`)
    })

    it('total frame is 1', () => {
        let currentFrame=1
        let totalFrames=1
        const wrapper = shallow(<Slider currentFrame={currentFrame} totalFrames={totalFrames}/>)
        expect(wrapper.isEmptyRender()).toBe(true)
    })

    it('user interaction', () => {
        let func = (frame) => {
            currentFrame = frame
        }
        let initialFrame=1
        let currentFrame=1
        let totalFrames=10
        const wrapper = shallow(<Slider currentFrame={currentFrame} totalFrames={totalFrames} jumpToFrame={func}/>)
        
        wrapper.find('#videoSlider').simulate('change', {target: {value:currentFrame+1}})

        expect(currentFrame).toEqual(initialFrame+1)
    })
})

test('Slider Snapshot Test', () => {

    let func = (frame) => {
        console.log(frame)
    }

    let app;
    act(()=>{
        app = create(<Slider totalFrames={11} currentFrame={2} jumpToFrame={func}/>)
    })


    expect(app.toJSON()).toMatchSnapshot()
    
})