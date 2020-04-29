import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'

import Login from './Login'
import Signup from './Signup'

export default function Admin() {
    return (
        <div>
            <Container fluid='sm' style={{backgroundColor: 'grey', borderRadius: '25px', marginTop: '30px'}}>
            <Tabs defaultActiveKey='Login' transition={false} id='noanim-tab-example'>
                <Tab eventKey='Login' title='Login'>
                    <Login />
                </Tab>
                <Tab eventKey='Signup' title='Signup'>
                    <Signup />
                </Tab>
            </Tabs>
            </Container>
        </div>
    )
}
