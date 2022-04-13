import React from 'react'
//import {render} from "@testing-library/react"
import {create, act} from 'react-test-renderer';
import {shallow} from 'enzyme'

import Header from '../components/Header'

import "@testing-library/jest-dom/extend-expect"
import { BrowserRouter  } from 'react-router-dom'

import * as mockCharacterData from './mockData/mock-characterdata.json'
import * as mockMoveData from './mockData/mock-movedata.json'

// describe ('Buttons component', () => {
//     it('Buttons exist', () => {
//         const wrapper = shallow(<Buttons
//              currentCharacterData={mockCharacterData}
//              currentMoveData={mockMoveData}
//              settings={{theme:"dark"}}
//              playing={true}
//              currentFrame={4}
//             />)
//     })

// })

describe('Header Snapshot Tests', () => {
    it('Dark mode snapshot', () => {
        let app;
        act(()=>{
            app = create(<BrowserRouter >
                    <Header
                        settings={{theme:"dark"}}
                    />
               </BrowserRouter >)
        })
        expect(app.toJSON()).toMatchSnapshot()
    })

    it('Light mode snapshot', () => {
        let app;
        act(()=>{
            app = create(<BrowserRouter >
                    <Header
                        settings={{theme:"light"}}
                    />
               </BrowserRouter >)
        })
        expect(app.toJSON()).toMatchSnapshot()
    })    
})