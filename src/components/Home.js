import React from 'react'
import Summary from './Summary'
import Layout from './Layout/Layout'

const Home = ({ data }) => {
	return (
		<Layout>
			<Summary data={ data } />
		</Layout>
	)
}

export default Home

