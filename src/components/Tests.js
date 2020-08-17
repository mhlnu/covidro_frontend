import React from 'react';
import ReactEcharts from 'echarts-for-react'
import Layout from './Layout/Layout'

const Tests = ({ data }) => {

    const extractDataToList = (arg, from, more) => {
		const res = []
		for (let i in data) {
			if (arg === 'date') {
				res.push(data[i][arg])	
			} else {
				if (more) {
					res.push(data[i][from][more][arg])
				} else {
					res.push(data[i][from][arg])
				}
			}
		}
		return res
    }

	const dates = extractDataToList('date')
	const totalTests = extractDataToList('tests', 'total')
    const newTests = extractDataToList('total', 'day', 'tests')
    const institutional = extractDataToList('institutional', 'day', 'tests')
    const onRequest = extractDataToList('onRequest', 'day', 'tests')
    const unreported = extractDataToList('prevUnreported', 'day', 'tests')
    const retestsPositive = extractDataToList('retestsPositive', 'day', 'tests')
    const retestsPctg = () => {
        const res = []
        for (let i in data) {
            let item = parseFloat((retestsPositive[i] / newTests[i]) * 100, 10).toFixed(2)
            res.push(item)
        }
        return res
    }

	const totalTested = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Total teste']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			show: true,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
			{
				name: 'Total teste',
				type: 'line',
				smooth: true,
				data: totalTests,
				symbol: 'none',
				color: '#981ceb'
			},
		]
    };
    
    const testsPerDay = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Teste noi pe zi']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			show: true,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
			{
				name: 'Teste noi pe zi',
				type: 'line',
				smooth: true,
				data: newTests,
				symbol: 'none',
				color: '#0000ff'
			},
		]
    };
    
    const compareTests = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Teste per zi - total', 'Teste instituțional', 'Teste la cerere' ]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			show: true,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
            {
				name: 'Teste per zi - total',
				type: 'line',
				smooth: true,
				data: newTests,
				symbol: 'none',
				color: '#000'
			},
			{
				name: 'Teste instituțional',
				type: 'line',
				smooth: true,
				data: institutional,
				symbol: 'none',
				color: '#0000ff'
            },
            {
				name: 'Teste la cerere',
				type: 'line',
				smooth: true,
				data: onRequest,
				symbol: 'none',
				color: 'green'
            },
		]
    };
    
    const retests = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Total', 'Retestări pozitive', 'Procentaj' ]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			show: true,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
            {
				name: 'Total',
				type: 'line',
				smooth: true,
				data: newTests,
				symbol: 'none',
				color: '#000'
			},
            {
				name: 'Retestări pozitive',
				type: 'line',
				smooth: true,
				data: retestsPositive,
				symbol: 'none',
				color: '#0000ff'
            },
            {
				name: 'Procentaj retestări din teste zilnice',
				type: 'line',
				smooth: true,
				data: retestsPctg(),
				symbol: 'none',
				color: 'red'
			},
		]
    };

    const pctg = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Procentaj' ]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			show: true,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
            {
				name: 'Procentaj',
				type: 'line',
				smooth: true,
				data: retestsPctg(),
				symbol: 'none',
				color: 'red'
			},
		]
    };

    const delayed = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Raportate cu întârziere' ]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			show: true,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
            {
				name: 'Raportate cu întârziere',
                type: 'bar',
                large: true,
				// smooth: true,
				data: unreported,
				symbol: 'none',
				color: 'red'
			},
		]
    };

    return (
        <Layout>
            <h2>Evoluție testări</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ totalTested }
            />
            <h2>Testări per zi</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ testsPerDay }
            />
            <h2>Testări instituțional vs. la cerere vs. zilnic</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ compareTests }
            />
            <h2>Evoluție retestări pozitive vs. teste per zi</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ retests }
            />
            <h2>Procentaj retestări pozitive din testări zilnice</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ pctg }
            />
            <h2>Efectuate anterior și raportate cu întârziere per zi</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ delayed }
            />
        </Layout>
    )
}

export default Tests