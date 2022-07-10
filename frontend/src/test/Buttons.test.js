import React from 'react'
//import {render} from "@testing-library/react"
import {create, act} from 'react-test-renderer';
import {shallow} from 'enzyme'

import Buttons from '../components/Buttons'

import "@testing-library/jest-dom/extend-expect"
import { BrowserRouter  } from 'react-router-dom'

import * as mockCharacterData from './mockData/mock-characterdata.json'
import * as mockMoveData from './mockData/mock-movedata.json'

describe ('Buttons component', () => {
    it('Buttons exist', () => {
        const wrapper = shallow(<Buttons
             currentCharacterData={mockCharacterData}
             currentMoveData={mockMoveData}
             settings={{theme:"dark"}}
             playing={true}
             currentFrame={4}
            />)
    })

})

test('Buttons Snapshot Test', () => {

    let func = (frame) => {
        console.log(frame)
    }

    let app;
    act(()=>{
        app = create(<BrowserRouter >
                <Buttons
                    currentCharacterData={mockCharacterData}
                    currentMoveData={mockMoveData}
                    settings={{theme:"dark"}}
                    playing={true}
                    currentFrame={4}
                />
           </BrowserRouter >)
    })


    expect(app.toJSON()).toMatchSnapshot()
    
})