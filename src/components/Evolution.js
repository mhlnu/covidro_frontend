import React from 'react';
import ReactEcharts from 'echarts-for-react'
import Layout from './Layout/Layout'
import AllData from './charts/AllData';
import MainData from './charts/MainData';

const Evolution = ({ data }) => {
    return (
        <Layout>
            <MainData data={ data } />
            <AllData data={ data } />
        </Layout>
    )
}

export default Evolution