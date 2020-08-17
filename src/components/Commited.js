import React from 'react';
import ReactEcharts from 'echarts-for-react'
import Layout from './Layout/Layout'

const Commited = ({ data }) => {

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
    const commited = extractDataToList('commited', 'day')
    const cases = extractDataToList('cases', 'day')
    const asymptomatic = extractDataToList('asymptomatic', 'day')
    const icu = extractDataToList('icu', 'pending')
    const averageInfectedOfTested = extractDataToList('averageInfectedOfTested', 'day')
    const icuPctg = () => {
        const res = []
        for (let i in data) {
            let item = parseFloat((icu[i] / commited[i]) * 100, 10).toFixed(2)
            if (item === 'Infinity') {
                res.push(null)
            } else {
                res.push(item)
            }
        }
        return res
    }

    const options = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Spitalizați', 'Asimptomatici', 'Terapie intensivă' ]
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
				name: 'Spitalizați',
				type: 'line',
				smooth: true,
				data: commited,
				symbol: 'none',
				color: '#0000ff'
            },
			{
				name: 'Terapie intensivă',
				type: 'line',
				smooth: true,
				data: icu,
				symbol: 'none',
				color: '#FF4500'
			},
		]
    };
    
    const asympto = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Spitalizați', 'Asimptomatici' ]
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
				name: 'Spitalizați',
				type: 'line',
				smooth: true,
				data: commited,
				symbol: 'none',
				color: '#0000ff'
            },
            {
				name: 'Asimptomatici',
				type: 'line',
				smooth: true,
				data: asymptomatic,
				symbol: 'none',
				color: '#FF4500'
			},
		]
    };
    
    const asympto1 = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Terapie intensivă', 'Asimptomatici externați' ]
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
				name: 'Terapie intensivă',
				type: 'line',
				smooth: true,
				data: icu,
				symbol: 'none',
				color: '#0000ff'
            },
            {
				name: 'Asimptomatici externați',
				type: 'line',
				smooth: true,
				data: asymptomatic,
				symbol: 'none',
				color: '#FF4500'
			},
		]
    };
    
    const icuCompare = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Terapie intensivă', 'Cazuri noi' ]
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
				name: 'Terapie intensivă',
				type: 'line',
				smooth: true,
				data: icu,
				symbol: 'none',
				color: '#0000ff'
            },
            {
				name: 'Cazuri noi',
				type: 'line',
				smooth: true,
				data: cases,
				symbol: 'none',
				color: '#FF4500'
			},
		]
    };
    
    const icuCasesPctg = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Medie Terapie Intensivă', 'Medie infectări noi' ]
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
				name: 'Medie Terapie Intensivă',
				type: 'line',
				smooth: true,
				data: icuPctg(),
				symbol: 'none',
				color: '#0000ff'
            },
            {
				name: 'Medie infectări noi',
				type: 'line',
				smooth: true,
				data: averageInfectedOfTested,
				symbol: 'none',
				color: '#FF4500'
			},
		]
	};

    return (
        <Layout>
            <h2>Evoluție spitalizări per zi</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ options }
            />
            <h2>Asimptomatici externați</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ asympto }
            />
            <h2>Asimptomatici externați vs. Terapie Intensivă</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ asympto1 }
            />
            <h2>Spitalizați la ATI vs. cazuri noi</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ icuCompare }
            />
            <h2>Medie procentuală: infectați/testări vs. Terapie Intensivă/total internări %</h2>
            <ReactEcharts
                style={{
                    height: '500px',
                    width: '100%'
                }}
                option={ icuCasesPctg }
            />
        </Layout>
    )
}

export default Commited