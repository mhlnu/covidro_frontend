import React from 'react';
import ReactEcharts from 'echarts-for-react'

const MainData = ({ data }) => {

	const extractDataToList = (arg) => {
		const res = []
		for (let i in data) {
			if (arg === 'date') {
				res.push(data[i][arg])	
			} else {
				res.push(data[i]['total'][arg])
			}
		}
		return res
	}

	const dates = extractDataToList('date')
	const totalInfected = extractDataToList('cases')
	const cured = extractDataToList('recovered')
	const deceased = extractDataToList('deceased')

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
			data: [ 'Infectați', 'Vindecați', 'Decedați' ]
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
				name: 'Decedați',
				type: 'line',
				smooth: true,
				stack: 'one',
				data: deceased,
				// areaStyle: {},
				symbol: 'none',
				color: '#000'
			},
			{
				name: 'Vindecați',
				type: 'line',
				smooth: true,
				stack: 'one',
				data: cured,
				// areaStyle: {},
				symbol: 'none',
				color: '#00FF00'
			},
			{
				name: 'Infectați',
				type: 'line',
				smooth: true,
				stack: 'one',
				data: totalInfected,
				// areaStyle: {},
				symbol: 'none',
				color: '#FF0000'
			},
		]
	};
	

	return (
		<React.Fragment>
			<h2>Evoluție generală</h2>
			<ReactEcharts
              style={{
                height: '500px',
                width: '100%'
              }}
              option={ options }
            //   theme={SUMMARY_CHART_THEME}
            />
		</React.Fragment>
	);
};

export default MainData;
