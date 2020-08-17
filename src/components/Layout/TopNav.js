import React from 'react'
import { useHistory } from "react-router-dom";
import { Menu, Container } from 'semantic-ui-react'

const TopNav = () => {

    const history = useHistory()

    const items = [
        { slug: '/evolutie', text: 'Evoluție'},
        { slug: '/teste', text: 'Teste' },
        { slug: '/spital', text: 'Spitalizări' },
    ]

    return (
        <Menu className='fixed'>
            <Container>
                <Menu.Item onClick={ () => history.push('/') }><span className='logo' />CovidRo.info</Menu.Item>
                { items.map( (item, i) => <Menu.Item key={i} onClick={ () => history.push(item.slug) }>{ item.text }</Menu.Item> ) }
            </Container>
        </Menu>
    )
}

export default TopNav