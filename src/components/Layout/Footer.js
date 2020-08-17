import React from 'react'
import { Segment, Container } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment className='footer'>
            <Container className='pt1 pb1'>
                <p>Proiect open-source de <a href='https://www.subiectiv.ro'>Alex Mihăileanu</a>. Cod disponibil pe <a href='https://github.com/mhlnu/covidro_frontend'>GitHub</a>.
                <br />Sursa datelor: <a href='https://www.datelazi.ro'>datelazi.ro</a> și <a href='https://www.graphs.ro'>graphs.ro</a>.</p>
            </Container>
        </Segment>
    )
}

export default Footer