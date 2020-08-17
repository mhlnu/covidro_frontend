import React from 'react';
import { Grid, Statistic, Header, Segment, Icon, Label } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import { mnemonics } from '../data/mnemonics';
import Moment from 'react-moment';
import echarts from 'echarts';
import map from './../data/roGeo.json';
import moment from 'moment'

echarts.registerMap('RO', map);

const VariationIcon = ({ today, prevDay, inversed }) => {
	const t = parseFloat(today)
	const y = parseFloat(prevDay)
	const inv = inversed === true ? true : false
	const anyNull = ( t === null || y === null ) ? true : false
	const color = ( t > y ) ? 'green' : ( t < y ) ? 'red' : 'grey'
	const colorInverse = ( t > y ) ? 'red' : ( t < y ) ? 'green' : 'grey'
	const icon = ( t > y ) ? 'arrow up' : ( t < y ) ? 'arrow down' : 'pause'

	return (
		<div className='variation'>
			<Label circular color={ anyNull ? 'grey' : inv ? colorInverse : color }>
				<Icon name={ anyNull ? 'pause' : icon }></Icon>
			</Label>
		</div>
	)
}

const Stat = ({ name, today, prevDay, size, inversed, pctg, background }) => {
	const color = name === 'Testați' ? 'grey' : name === 'Cazuri noi' ? 'red' : name === 'Vindecați' ? 'green' : 'black'
	const numbs = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
	}

	return (
		<Grid.Column width={ size }>
			<div className={ background ? 'stat ' + background : 'stat' }>
				<VariationIcon inversed={ inversed } today={ today } prevDay={ prevDay } />
				<div className='data'>
					<Statistic color={ color } size={'tiny'}>
						<Statistic.Value>{ today === null ? '-' : pctg === true ? today + '%' : numbs(today) }</Statistic.Value>
					</Statistic>
					<span className='mini-header'>{ name }</span>
				</div>
			</div>
		</Grid.Column>
	)
}

const Summary = ({ data }) => {
	const today = data[data.length - 1];
	const prevDay = data[data.length - 2]
	const countyLowestColor = '#FFFF66';
	const countyHighestColor = '#DC143C';
	const curedColor = '#65E0E0';

	const countyInfectionsNumbers = today.distribution.county

	// const news = 'https://stirioficiale.ro/feeds/informatii.xml'
	// const vids = 'https://stirioficiale.ro/feeds/video.xml'
	// const legal = 'https://stirioficiale.ro/feeds/hotarari.xml'

	// const parseRSS = (url) => {
	// 	fetch(url)
	// 	.then(res => res.data)
	// 	.catch(err => console.log(err))
	// 	// .then(data => console.log(data))
	// }
	// parseRSS("https://api.rss2json.com/v1/api.json?rss_url=" + news)
	// parseRSS("https://api.rss2json.com/v1/api.json?rss_url=" + vids)
	// parseRSS("https://api.rss2json.com/v1/api.json?rss_url=" + legal)

	const counties = Object.entries(countyInfectionsNumbers)
		.filter(([key]) => key !== '-')
		.map(([key, entry]) => ({
			name: mnemonics[key][0],
			value: ((1000 * entry) / mnemonics[key][1]).toFixed(2),
			totalPopulation: mnemonics[key][1],
			numberInfected: entry,
			county: key
		}))
		.sort((a, b) =>
			// reversed by count
			a.value > b.value ? -1 : 1
		);

	const getChartOptions = (data) => {
		return {
			tooltip: {
				trigger: 'item',
				formatter: (item) => {
					return `
						<strong style="color:#fff">${item.name}</strong></br>
						Cazuri: ${item.data.numberInfected}</br>
						Cazuri per mie: ${item.value}‰`;
				}
			},
			visualMap: {
				show: true,
				min: 0,
				max: data[0].value,
				left: 'left',
				top: 'bottom',
				text: ['Ridicat', 'Scazut'],
				calculable: false,
				inRange: {
					color: [countyLowestColor, countyHighestColor]
				}
			},
			series: [
				{
					name: 'Cazuri',
					type: 'map',
					mapType: 'RO',
					roam: false,
					itemStyle: {
						areaColor: curedColor
					},
					label: {
						normal: {
							show: true,
							formatter: (item) => ( item.data.county )
						},
						emphasis: {
							show: false
						},
					},
					emphasis: {
						label: {
							show: true
						}
					},
					data: data
				}
			]
		};
	};

	const isToday = moment().format("YYYY-MM-DD") === today.date

	return (
		<Grid divided stackable className='dashboard'>
			<Grid.Column width={12}>
				<Header as="h2">
					{ isToday ? 'Azi, ' : 'Cea mai recentă actualizare: ' }
					<Moment format="DD MMM YYYY">{today.date}</Moment>
				</Header>
				<Grid stackable className='stats' columns={4}>
					<Stat name={'Cazuri noi'} today={ today.day.cases } prevDay={ prevDay.day.cases } inversed={ true } background={'bg-red'} />
					<Stat name={'Vindecați'} today={ today.day.recovered } prevDay={ prevDay.day.recovered } background={'bg-green'} />
					<Stat name={'Decedați'} today={ today.day.deceased } prevDay={ prevDay.day.deceased } inversed={ true } background={'bg-black'} />
					<Stat name={'Testați total'} today={ today.day.tests.total } prevDay={ prevDay.day.tests.total } background={'bg-grey'} />
				</Grid>
				<Header as="h3">Teste</Header>
				<Grid stackable className='stats' columns={3}>
					<Stat name={'Total azi'} today={ today.day.tests.total } prevDay={ prevDay.day.tests.total } />
					<Stat name={'Instituțional'} today={ today.day.tests.institutional } prevDay={ prevDay.day.tests.institutional } inversed={true}/>
					<Stat name={'La cerere'} today={ today.day.tests.onRequest } prevDay={ prevDay.day.tests.onRequest } inversed={true}/>
					<Stat name={'Cazuri noi din testări %'} today={ today.day.averageInfectedOfTested } prevDay={ prevDay.day.averageInfectedOfTested } inversed={true} pctg={true}/>
					<Stat name={'Retestări pozitive'} today={ today.day.tests.retestsPositive } prevDay={ prevDay.day.tests.retestsPositive } inversed={true}/>
					<Stat name={'Neraportate anterior'} today={ today.day.tests.prevUnreported } prevDay={ prevDay.day.tests.prevUnreported }/>
				</Grid>
				<Header as="h3">Spitalizare / Izolare / Carantină</Header>
				<Grid stackable className='stats'>
					<Grid.Row columns={2}>
						<Stat name={'Persoane spitalizate'} today={ today.day.commited } prevDay={ prevDay.day.commited } inversed={true}/>
						<Stat name={'Terapie Intensivă'} today={ today.pending.icu } prevDay={ prevDay.pending.icu } inversed={true}/>
					</Grid.Row>
					<Grid.Row columns={3}>
						<Stat name={'Total în carantină'} today={ today.day.quarantined } prevDay={ prevDay.day.quarantined } inversed={true}/>
						<Stat name={'Carantină instituțională'} today={ today.pending.quarantinedInstitutional } prevDay={ prevDay.pending.quarantinedInstitutional } inversed={true}/>
						<Stat name={'Carantină la domiciliu'} today={ today.pending.quarantinedHome } prevDay={ prevDay.pending.quarantinedHome } inversed={true}/>
					</Grid.Row>
					<Grid.Row columns={3}>
						<Stat name={'Total în izolare'} today={ today.day.isolated } prevDay={ prevDay.day.isolated } inversed={true}/>
						<Stat name={'Izolare instituțională'} today={ today.pending.isolatedInstitutional } prevDay={ prevDay.pending.isolatedInstitutional } inversed={true}/>
						<Stat name={'Izolare la domiciliu'} today={ today.pending.isolatedHome } prevDay={ prevDay.pending.isolatedHome } inversed={true}/>
					</Grid.Row>
				</Grid>
				<Header as="h3">Altele</Header>
				<Grid stackable className='stats' columns={3}>
					<Stat name={'Apeluri 112'} today={ today.day.callsEmergency } prevDay={ prevDay.day.callsEmergency } inversed={true}/>
					<Stat name={'Apeluri infoline'} today={ today.day.callsInfo } prevDay={ prevDay.day.callsInfo } />
				</Grid>
			</Grid.Column>
			<Grid.Column width={4} className='summary-side'>
				<Header as="h2">
					Total
				</Header>
				<Grid stackable className='stats'>
					<Stat name={'Cazuri'} today={ today.total.cases } prevDay={ prevDay.total.cases } size={16} inversed={ true } background={'bg-red'} />
					<Stat name={'Vindecați'} today={ today.total.recovered } prevDay={ prevDay.total.recovered } size={16} background={'bg-green'} />
					<Stat name={'Decedați'} today={ today.total.deceased } prevDay={ prevDay.total.deceased } size={16} inversed={ true } background={'bg-black'} />
					<Stat name={'Testați'} today={ today.total.tests } prevDay={ prevDay.total.tests } size={16} background={'bg-grey'} />
				</Grid>
			</Grid.Column>
			<Grid.Row>
				<ReactEcharts
					option={ getChartOptions(counties) }
					style={{ width: '100%', minHeight: '400px' }}
					className="react_for_echarts"
					opts={{renderer: 'svg'}}
				/>
			</Grid.Row>
		</Grid>
	);
};

export default Summary;
