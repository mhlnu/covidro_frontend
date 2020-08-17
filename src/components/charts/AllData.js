import React from 'react';
import ReactEcharts from 'echarts-for-react'
import Layout from './../Layout/Layout';

const AllData = ({ data }) => {
	
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
	const totalInfected = extractDataToList('cases', 'total')
	const cured = extractDataToList('recovered', 'total')
	const curedDay = extractDataToList('recovered', 'day')
	const deceased = extractDataToList('deceased', 'total')
	const deceasedDay = extractDataToList('deceased', 'day')
	const totalTests = extractDataToList('tests', 'total')
	const newTests = extractDataToList('total', 'day', 'tests')
	const dailyInfected = extractDataToList('cases', 'day')
	const averageInfectedOfTested = extractDataToList('averageInfectedOfTested', 'day')

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
			data: [ 'Total teste', 'Teste noi', 'Infectați per zi', 'Evoluție infectați', 'Vindecați', 'Decedați' ]
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
				name: 'Infectați per zi',
				type: 'line',
				smooth: true,
				data: dailyInfected,
				symbol: 'none',
				color: '#FF4500'
			},
			{
				name: 'Decedați',
				type: 'line',
				smooth: true,
				data: deceased,
				symbol: 'none',
				color: '#000'
			},
			{
				name: 'Teste noi',
				type: 'line',
				smooth: true,
				data: newTests,
				symbol: 'none',
				color: '#0000ff'
			},
			{
				name: 'Vindecați',
				type: 'line',
				smooth: true,
				data: cured,
				symbol: 'none',
				color: '#00FF00'
			},
			{
				name: 'Evoluție infectați',
				type: 'line',
				smooth: true,
				data: totalInfected,
				symbol: 'none',
				color: '#FF0000'
			},
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

	const infectedPerDay = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Infectați per zi' ]
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
				name: 'Infectați per zi',
				type: 'line',
				smooth: true,
				data: dailyInfected,
				symbol: 'none',
				color: '#FF4500'
			},
		]
	};

	const curedPerDay = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Vindecați per zi' ]
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
				name: 'Vindecați per zi',
				type: 'line',
				smooth: true,
				data: curedDay,
				symbol: 'none',
				color: '#00FF00'
			},
		]
	};

	const deceasedPerDay = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Decedați per zi' ]
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
				name: 'Decedați per zi',
				type: 'line',
				smooth: true,
				data: deceasedDay,
				symbol: 'none',
				color: '#000'
			},
		]
	};

	const average = {
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
				data: averageInfectedOfTested,
				// areaStyle: {},
				symbol: 'none',
				color: '#FF0000'
			},
		]
	};
	

	return (
		<React.Fragment>
			<h2>(Aproape) toate datele</h2>

			<ReactEcharts
              style={{
                height: '500px',
                width: '100%'
              }}
              option={ options }
            />
			<h2>Infectări noi per zi</h2>
			<ReactEcharts
			style={{
				height: '500px',
				width: '100%'
			}}
			option={ infectedPerDay }
			/>
			<h2>Procentaj de infectați din persoane testate per zi</h2>
			<ReactEcharts
              style={{
                height: '500px',
                width: '100%'
              }}
              option={ average }
            />
			<h2>Vindecați per zi</h2>
			<ReactEcharts
			style={{
				height: '500px',
				width: '100%'
			}}
			option={ curedPerDay }
			/>
			<h2>Decedați per zi</h2>
			<ReactEcharts
			style={{
				height: '500px',
				width: '100%'
			}}
			option={ deceasedPerDay }
			/>
		</React.Fragment>
	);
};

export default AllData;
