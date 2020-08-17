import React from 'react'
import TopNav from './TopNav'
import Footer from './Footer'
import { Container, Header, Segment } from 'semantic-ui-react'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <TopNav />
            <Container className="mt6 mb2 main">
                <Header as="h1" className='title'>Statistici Covid România</Header>
                <Segment>
                    { children }
                </Segment>
            </Container>
            <Footer />
        </React.Fragment>
    )
}

export default Layout