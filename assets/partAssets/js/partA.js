$(function () {
	let loading = {
		show: function () {
			$("body").append("<div class='main-loading'></div>");
		},
		hide: function () {
			$(".main-loading").remove();
		}
	}

	// Iterating over all elements that have a data-bg attribute and applies CSS styles for background images dynamically
	$("[data-bg]").each(function () {
		let $this = $(this),
			$bg = $this.attr("data-bg");

		$this.css({
			backgroundImage: 'url(' + $bg + ')',
			backgroundPosition: 'center',
			backgroundAttachment: 'fixed',
			backgroundSize: 'center'
		});
		$this.prepend("<div class='overlay'></div>");
	});

	// Smooth Scrolling for Anchor Links
	$(".smooth-link").click(function () {
		let $this = $(this),
			$target = $($this.attr("href"));
		$("html, body").animate({
			scrollTop: $target.offset().top - ($(".main-navbar").outerHeight() - 1)
		});

		return false;
	});

	// Video Playback Control
	const video = document.getElementById('bgVideo');
	video.addEventListener('loadedmetadata', function () {
		video.play();
	});


	// PartA-Charts of DIGITAL NOMADS WORLDWIDE IN 2024
	// ECharts 

	// Converts a dataset by appending geographical coordinates (from geoMap.js) to each data point for use in geospatial visualizations
	let convertData = function (data) {
		let res = [];
		for (let i = 0; i < data.length; i++) {
			let geoCoord = geoCoordMap[data[i].name];
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value),
				});
			}
		}
		return res;
	};


	function chartOne() {
		let data = [
			{ "name": 2015, "value": 7 },
			{ "name": 2016, "value": 8 },
			{ "name": 2017, "value": 9 },
			{ "name": 2018, "value": 9 },
			{ "name": 2019, "value": 10 },
			{ "name": 2020, "value": 13 },
			{ "name": 2021, "value": 20 },
			{ "name": 2022, "value": 27 },
			{ "name": 2023, "value": 28 },

		]
		let geoData = [
			{ "name": "United States", "value": 46 },
			{ "name": "United Kingdom", "value": 7 },
			{ "name": "Russia", "value": 5 },
			{ "name": "Canada", "value": 5 },
			{ "name": "Germany", "value": 4 },
			{ "name": "France", "value": 3 },
			{ "name": "Brazil", "value": 2 },
			{ "name": "Australia", "value": 2 },
			{ "name": "Netherlands", "value": 2 },
			{ "name": "Spain", "value": 2 },
			{ "name": "India", "value": 1 },
			{ "name": "Ukraine", "value": 1 },
			{ "name": "Italy", "value": 1 },
			{ "name": "Poland", "value": 1 },
			{ "name": "Switzerland", "value": 1 },
			{ "name": "Austria", "value": 1 },
			{ "name": "Sweden", "value": 1 },
			{ "name": "Ireland", "value": 1 },
			{ "name": "Turkey", "value": 1 },
			{ "name": "Japan", "value": 1 },
			{ "name": "Israel", "value": 1 },
			{ "name": "Belgium", "value": 1 },
			{ "name": "Czechia", "value": 1 },
			{ "name": "South Korea", "value": 1 },
			{ "name": "South Africa", "value": 1 },


		]
		// Initializes and configures an ECharts chart
		let chartOne = echarts.init(document.getElementById('line'));
		let data_val = data.map(i => i.value),
			xAxis_val = data.map(i => i.name);
		let data_val1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		let option = {
			textStyle:{
				fontFamily:'苹方',
			},	
			geo: {
				map: 'world',
				silent: true,
				label: {
					emphasis: {
						show: false,
						areaColor: '#eee'
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 0.2,
						borderColor: '#404a59'
					}
				},
				left: '6%',
				top: 40,
				bottom: '54%',
				right: '14%',
				roam: false
			},
			grid: [{
				show: true,
				left: '8%',
				right: '14%',
				top: '56%',
				bottom: '5%',
				borderColor: 'transparent',
				z: 99
			}, {
				show: true,
				left: 0,
				right: 0,
				top: 0,
				height: 28,
				borderColor: 'transparent',
				z: 10
			}],
			tooltip: {
				show: true,
				backgroundColor: '#384157',
				borderColor: '#384157',
				borderWidth: 1,
				textStyle: {
					color: '#fff'
				},
				trigger: 'item',
				extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
			},
			title: {
				text: 'EMPLOYEES WHO PRIMARILY WORK REMOTELY FROM 2015 TO 2023',
				x: '5%',
				top: '50%',
				textStyle: {
					color: '#5c6076',
					fontFamily:"initial",
					
				}
			},
			legend: {
				right: '4%',
				top: '52%',
				data: ['percent'],
				textStyle: {
					color: '#5c6076',
					fontSize:24,
					fontWeight:"400"
					
				}
			},
			xAxis: {
				data: xAxis_val,
				boundaryGap: false,
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#5c6076',
						fontFamily:"inherit",
						fontSize: 25,
						fontWeight: '600'
					}
				},
				axisTick: {
					show: false
				}
			},
			yAxis: {
				ayisLine: {
					show: true
				},
				axisLabel: {
					textStyle: {
						color: '#5c6076',
						fontSize: 15,
						fontWeight: '600'
					}
				},
				splitLine: {
					show: 0,
					lineStyle: {
						color: '#2e3547'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#384157'
					}
				}
			},

			series: [
				{
					name: '',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbolSize: 8,
					data: convertData(geoData),
					activeOpacity: 1,
					label: {
						normal: {

							position: 'right',
							show: false
						},
						emphasis: {
							show: 0
						}
					},
					tooltip: {
						show: 1,
						formatter: (p) => {
							return `${p.name}<br>${p.marker} ${p.value[2]}%`
						},
					},
					symbolSize: function (data) {
						return data[2] * 2 < 10 ? 10 : data[2] * 2;
					},
					itemStyle: {
						normal: {
							borderColor: '#fff',
							color: '#577ceb',
						}
					}
				},
				{
					type: 'bar',
					name: 'linedemo',
					tooltip: {
						show: false
					},
					animation: false,
					barWidth: 1.4,
					hoverAnimation: false,
					data: data_val,
					itemStyle: {
						normal: {
							color: '#f17a52',
							opacity: 0.6,
							label: {
								show: false
							}
						}
					}
				},
				{
					type: 'line',
					name: 'linedemo',
					animation: false,
					symbol: 'circle',
					tooltip: {
						show: false,
					},
					hoverAnimation: false,
					data: data_val1,

					itemStyle: {
						normal: {
							color: '#f17a52',
							opacity: 0,
						}
					},
					lineStyle: {
						normal: {
							width: 1,
							color: '#384157',
							opacity: 1
						}
					}
				},
				{
					type: 'line',
					name: 'percent',
					smooth: true,
					symbolSize: 10,
					animation: false,
					lineWidth: 1.2,
					hoverAnimation: false,
					tooltip: {
						formatter: `{b} : {c}%`,
					},
					data: data_val,
					symbol: 'circle',
					itemStyle: {
						normal: {
							color: '#f17a52',
							shadowBlur: 40,
							label: {
								show: true,
								position: 'top',
								formatter: "{c}%",
								textStyle: {
									color: '#f17a52',

								}
							}
						}
					},
					areaStyle: {
						normal: {
							color: '#f17a52',
							opacity: 0.08
						}
					}

				}
			]
		};
		chartOne.setOption(option);


	}

	chartOne()


	function chartTwo() {
		let allData = [
			[
				{ "name": "Men", "value": 61 },
				{ "name": "Women", "value": 39 }
			],
			[
				{ "name": "18 to 29 years", "value": 22.40 },
				{ "name": "30 to 39 years", "value": 52.60 },
				{ "name": "40 to 49 years", "value": 19.70 },
				{ "name": "50 to 59 years", "value": 4.40 },
				{ "name": "60 years and older", "value": 0.90 },
			],
			[
				{ "name": "White", "value": 59 },
				{ "name": "Asian", "value": 14 },
				{ "name": "Latin", "value": 12 },
				{ "name": "Black", "value": 7 },
				{ "name": "Indian", "value": 5 },
				{ "name": "Middle Eastern", "value": 3 },
				{ "name": "Pacific", "value": 1 },
			],
			[
				{ "name": "Less than 25,000 U.S. dollars", "value": 6 },
				{ "name": "25,000 - 50,000 U.S. dollars", "value": 15 },
				{ "name": "50,000 - 100,000 U.S. dollars", "value": 34 },
				{ "name": "100,000 - 250,000 U.S. dollars", "value": 35 },
				{ "name": "250,000 - 1,000,000 U.S. dollars", "value": 8 },
				{ "name": "Over 1,000,000 U.S. dollars", "value": 2 },
			]
		]
		let eduData = [
			{ "name": "Higher education", "value": 91 },
			{ "name": "Bachelor", "value": 54 },
			{ "name": "Master", "value": 34 },
			{ "name": "PhD", "value": 3 },
			{ "name": "High school", "value": 9 },
		]
		let colorMap = [
			['#2ca1ff', '#0adbfa', '#febe13'],
			['#65e5dd', '#f071ff', '#7b2cff', '#fd5151', '#85f67a'],
			['#fd5151', '#7b2cff', '#85f67a', '#f071ff', '#65e5dd'],
			['#f071ff', '#65e5dd', '#fd5151', '#85f67a', '#7b2cff'],
			['#7b2cff', '#fd5151', '#f071ff', '#65e5dd', '#85f67a'],

		]
		let titleArr = ['Gender', 'Age', 'Race and Ethnicity', 'Income']
		let chartMap = {}
		allData.forEach((i, j) => {
			chartMap['pie' + (j + 1)] = echarts.init(document.getElementById('pie' + (j + 1)))

			let option = twoOptions(i, rightPieCenter_data[j], colorMap[j], titleArr[j])
			// console.log(option)
			chartMap['pie' + (j + 1)].setOption(option)
		})

		let barOption = {
			textStyle:{
				fontFamily:'苹方',
			},	
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				},
				formatter: "{b}  <br> {c}%",
			},
			title: {
				text: 'Education Level',
				textStyle: {
					color: '#fff',
					fontSize: 18
				}
			},
			grid: {
				top: '20%',
				right: '3%',
				left: '5%',
				bottom: '25%'
			},
			xAxis: [{
				type: 'category',
				data: eduData.map(i => i.name),
				axisLine: {
					lineStyle: {
						color: 'rgba(255,255,255,0.12)'
					}
				},

				axisLabel: {
					margin: 10,
					color: '#e2e9ff',
					interval: 0,
					textStyle: {
						fontSize: 14
					},
				},
			}],
			yAxis: [{
				axisLabel: {
					formatter: '{value}',
					color: '#e2e9ff',

				},
				axisLine: {
					show: false
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(255,255,255,0.12)'
					}
				}
			}],
			series: [{
				type: 'bar',
				data: eduData.map(i => i.value),
				barWidth: '20px',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0,244,255,1)' // color at 0% 
						}, {
							offset: 1,
							color: 'rgba(0,77,167,1)' // color at 100% 
						}], false),
						barBorderRadius: [30, 30, 30, 30],
						shadowColor: 'rgba(0,160,221,1)',
						shadowBlur: 4,
					}
				},
				label: {
					normal: {
						show: true,
						lineHeight: 30,
						width: 80,
						height: 30,
						backgroundColor: 'rgba(0,160,221,0.1)',
						borderRadius: 200,
						position: ['-8', '-60'],
						distance: 1,
						formatter: [
							'    {d|●}',
							' {a|{c}%}     \n',
							'    {b|}'
						].join(','),
						rich: {
							d: {
								color: '#3CDDCF',
							},
							a: {
								color: '#fff',
								align: 'center',
							},
							b: {
								width: 1,
								height: 30,
								borderWidth: 1,
								borderColor: '#234e6c',
								align: 'left'
							},
						}
					}
				}
			}]
		};
		chartMap['bar1'] = echarts.init(document.getElementById('bar1'))
		chartMap['bar1'].setOption(barOption)
	}

	function twoOptions(datas, icon, colors, pTitle = '') {
		const trafficWay = datas
		const rightPieCenter = icon
		const leftLenged = []
		const rightLenged = []
		for (let i = 0; i < trafficWay.length; i++) {
			if (i < trafficWay.length / 2) {
				leftLenged.push(trafficWay[i].name)
			} else {
				rightLenged.push(trafficWay[i].name)
			}
		}

		let nameArray = trafficWay.map(item => {
			return item.name
		})


		const data = [];
		const color = colors
		for (let i = 0; i < trafficWay.length; i++) {
			data.push({
				value: trafficWay[i].value,
				name: trafficWay[i].name,
				itemStyle: {
					normal: {
						borderWidth: 8,
						shadowBlur: 20,
						borderRadius: 20,
						borderColor: color[i],
						shadowColor: color[i]
					}
				}
			}, {
				value: 8,
				name: '',
				itemStyle: {
					normal: {
						label: {
							show: false
						},
						labelLine: {
							show: false
						},
						color: 'rgba(0, 0, 0, 0)',
						borderColor: 'rgba(0, 0, 0, 0)',
						borderWidth: 0
					}
				}
			});
		}
		let seriesOption = [{
			name: '',
			type: 'pie',
			clockWise: false,
			radius: [105, 109],
			width: 280,
			height: 252,
			hoverAnimation: false,
			center: ['50%', '55%'],
			left: "center",
			top: 'center',
			itemStyle: {
				normal: {
					label: {
						show: false
					}
				}
			},
			data: data
		}];
		let option = {
			textStyle:{
				fontFamily:'苹方',
			},	
			
			title: {
				text: pTitle,
				textStyle: {
					color: '#fff',
					fontSize: 20
				}
			},
			color: color,
			tooltip: {
				show: true,
				formatter: function (param) {

					let html = `<div>${param.marker}<span style="color:#919CA7 ">${param.name}：</span><span style="color:#fff">${(param.value.toFixed(0))}%</span></div>`;
					return html;
				},
				borderRadius: 3,
				backgroundColor: 'rgba(9,29,46,0.35)',
				borderColor: '#1B3C58',
				backdropFilter: 'blur(6px)',
				textStyle: {
					fontSize: 18,
				},
			},
			graphic: {
				elements: [
					{
						type: 'image',
						style: {
							image: rightPieCenter,
							width: 46,
							height: 60,
							zIndex: 2,
							top: "center"
						},
						left: 'center',
						top: 'center',

					},
					{
						type: 'circle',
						style: {
							width: 200,
							height: 200,
							zIndex: 1,
							fill: 'rgba(30,79,219,.15)',
							top: "center"
						},
						shape: {
							r: 90
						},
						left: 'center',
						top: '28%',
						originX: 100,
						originY: 100,
					},
				],
			},
			legend: [
				{
					textStyle: {
						rich: {
							name: {
								color: '#A6B7C2',
								fontSize: 14,
								lineHeight: 14,
							},
							percent: {
								color: '#fff',
								fontSize: 14,
								lineHeight: 14,
							},
						},
					},
					type: "scroll",
					data: [...leftLenged, ...rightLenged],
					icon: 'circle',
					top: '12%',
					itemGap: 30,
					itemHeight: 10,
					itemWidth: 10,
					formatter: function (name) {
						let total = 0;
						let target;
						for (let i = 0, l = data.length; i < l; i++) {
							total += data[i].value ?? 0;
							if (data[i].name === name) {
								target = data[i].value;
							}
						}
						let html = `  {name|${name.split('').length < 10 ? name : name.split('').slice(0, 10).join('') + '...'}：}{percent|${Math.floor((target / total).toFixed(2) * 100)}%}`;
						let arr = [
							html,
						];
						return arr.join('\n');
					},
				}
			],
			toolbox: {
				show: false,
			},
			series: seriesOption,
		};
		return option
	}

	chartTwo()

	let femaleData = [
		{ "name": "Marketing", "value": 15 },
		{ "name": "Creative", "value": 15 },
		{ "name": "Startup Founder", "value": 11 },
		{ "name": "Software Dev", "value": 10 },
		{ "name": "UI/UX Design", "value": 8 },
		{ "name": "Web Dev", "value": 8 },
		{ "name": "Blogging", "value": 8 },
		{ "name": "Community", "value": 7 },
		{ "name": "Education", "value": 7 },
		{ "name": "Coach", "value": 7 },
		{ "name": "Product Manager", "value": 6 },
		{ "name": "Data", "value": 5 },
		{ "name": "SaaS", "value": 4 },
		{ "name": "Ecommerce", "value": 4 },
		{ "name": "Finance", "value": 4 },
	]
	let maleData = [
		{ "name": "Software Dev", "value": 34 },
		{ "name": "Web Dev", "value": 28 },
		{ "name": "Startup Founder", "value": 27 },
		{ "name": "Marketing", "value": 15 },
		{ "name": "SaaS", "value": 13 },
		{ "name": "Creative", "value": 12 },
		{ "name": "UI/UX Design", "value": 11 },
		{ "name": "Product Manager", "value": 11 },
		{ "name": "Crypto", "value": 11 },
		{ "name": "Data", "value": 11 },
		{ "name": "Mobile Dev", "value": 11 },
		{ "name": "Finance", "value": 10 },
		{ "name": "Ecommerce", "value": 9 },
		{ "name": "Sales", "value": 7 },
		{ "name": "Education", "value": 6 },
	]
	let chartPlant = {}


	function ThreeOptions(dataList = [], id = 'Female', weighting = 5) {
		chartPlant[id] = echarts.init(document.getElementById(id))

		let option = {
			textStyle:{
				fontFamily:'inherit',
			},	
			title: {
				text: id,
				textStyle: {
					fontSize: 30,
					color: '#5c6076'
				},
			},
			tooltip: {
				show: true,
				borderColor: '#fe9a8bb3',
				borderWidth: 1,
				padding: [10, 15, 10, 15],
				formatter: '{b}: {c}%',
				confine: true,
				backgroundColor: 'rgba(255, 255, 255, .9)',
				textStyle: {
					color: 'hotpink',
					lineHeight: 22,
				},
				extraCssText: 'box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;'
			},
			series: [
				{
					type: 'wordCloud',
					shape: 'pentagon',
					width: '90%',
					height: '90%',
					sizeRange: [14, 50],
					rotationRange: [-45, 0],
					textStyle: {
						fontFamily: 'PingFangSC-Semibold',
						fontWeight: 600,
						color: function () {
							return (
								'rgb(' +
								[
									Math.round(Math.random() * 160),
									Math.round(Math.random() * 160),
									Math.round(Math.random() * 160),
								].join(',') +
								')'
							);
						}
					},
					 emphasis: {
					 	focus: 'none',
					 },
					data: dataList
				},


			],
		};
		chartPlant[id].setOption(option);
	}
	ThreeOptions(femaleData, 'Female', 6.5)
	ThreeOptions(maleData, 'Male', 4)


	function threeOtherOptions() {
		let chartPlant1 = echarts.init(document.getElementById('plant1'))

		let plantCap = [
			{ "name": "Freelancer", "value": 35.00 },
			{ "name": "Full-time employed", "value": 31.50 },
			{ "name": "Enterpreneur/business owner", "value": 13.60 },
			{ "name": "Self-employed", "value": 6.80 },
			{ "name": "Multiple revenue streams", "value": 6.70 },
			{ "name": "Other", "value": 6.40 },
		]
		option = {
			textStyle:{
				fontFamily:'inherit',
			},	
			color: ['#EAEA26', '#906BF9', '#FE5656', '#01E17E', '#3DD1F9', '#FFAD05'],
			title: {
				text: 'Share of digital nomads worldwide 2023,\nby employment',
				textStyle: {
					fontSize: 20,
					color: '#5c6076'
				},
			},
			tooltip: {
				trigger: 'item',
			},

			series: [
				{
					name: '',
					type: 'pie',
					radius: [30, 140],
					center: ['50%', '50%'],
					roseType: 'area',
					data: plantCap,
					label: {
						overflow:'breakAll',
						show: true,
						position: 'outside',
						formatter: '{b}\n{d}%',
						lineStyle: {
							length: 5, 
						},

					},

					labelLine: {
						length: 5,
						length2: 5,
					}
				},
			],
		}
		

		chartPlant1.setOption(option)
	}
	threeOtherOptions()

	let cityMapData = [
		{ "name": "London (United Kingdom)", "value": 2.3 },
		{ "name": "Bangkok (Thailand)", "value": 2.01 },
		{ "name": "New York City (United States)", "value": 1.56 },
		{ "name": "Berlin (Germany)", "value": 1.52 },
		{ "name": "Lisbon (Portugal)", "value": 1.51 },
		{ "name": "Paris (France)", "value": 1.5 },
		{ "name": "Barcelona (Spain)", "value": 1.47 },
		{ "name": "Amsterdam (Netherlands)", "value": 1.27 },
		{ "name": "San Francisco (United States)", "value": 1.19 },
		{ "name": "Chiang Mai (Thailand)", "value": 1.09 },
		{ "name": "Mexico City (Mexico)", "value": 1 },
		{ "name": "Singapore (Singapore)", "value": 0.91 },
		{ "name": "Canggu (Indonesia)", "value": 0.9 },
		{ "name": "Los Angeles (United States)", "value": 0.88 },
		{ "name": "Istanbul (Turkey)", "value": 0.84 },
		{ "name": "Tokyo (Japan)", "value": 0.82 },
		{ "name": "Budapest (Hungary)", "value": 0.82 },
		{ "name": "Madrid (Spain)", "value": 0.8 },
		{ "name": "Kuala Lumpur (Malaysia)", "value": 0.75 },
		{ "name": "Prague (Czechia)", "value": 0.73 },
		{ "name": "Dubai (UAE)", "value": 0.69 },
		{ "name": "Buenos Aires (Argentina)", "value": 0.66 },
		{ "name": "Medellín (Colombia)", "value": 0.64 },
		{ "name": "Moscow (Russia)", "value": 0.63 },
		{ "name": "Rome (Italy)", "value": 0.59 },
		{ "name": "Vienna (Austria)", "value": 0.59 },
	]
	let countryMapData = [
		{ "name": "United States", "value": 14 },
		{ "name": "Spain", "value": 5 },
		{ "name": "Thailand", "value": 5 },
		{ "name": "United Kingdom", "value": 4 },
		{ "name": "Germany", "value": 4 },
		{ "name": "Mexico", "value": 4 },
		{ "name": "France", "value": 3 },
		{ "name": "Italy", "value": 3 },
		{ "name": "Portugal", "value": 3 },
		{ "name": "Indonesia", "value": 2 },
		{ "name": "Brazil", "value": 2 },
		{ "name": "Canada", "value": 2 },
		{ "name": "Netherlands", "value": 2 },
		{ "name": "Japan", "value": 2 },
		{ "name": "Vietnam", "value": 2 },
		{ "name": "Russia", "value": 2 },
		{ "name": "Colombia", "value": 1 },
		{ "name": "Turkey", "value": 1 },
		{ "name": "Australia", "value": 1 },
		{ "name": "Poland", "value": 1 },
		{ "name": "India", "value": 1 },
		{ "name": "Greece", "value": 1 },
		{ "name": "Malaysia", "value": 1 },
		{ "name": "Argentina", "value": 1 },
		{ "name": "Switzerland", "value": 1 },
		{ "name": "Austria", "value": 1 },
		{ "name": "Croatia", "value": 1 },
		{ "name": "Singapore", "value": 1 },
		{ "name": "Hungary", "value": 1 },
	]

	let timeMapData = [
		{ "name": "Two to three weeks", "value": 10.9 },
		{ "name": "One to two months", "value": 29.1 },
		{ "name": "Three to four months", "value": 26 },
		{ "name": "Five to seven months", "value": 16.6 },
		{ "name": "Eight to 12 months", "value": 5.5 },
		{ "name": "Over a year", "value": 4.5 },
		{ "name": "Other", "value": 7.4 },

	].sort((a, b) => a.value - b.value)

	function mapOptions() {
		let mapName = 'world';
		let toolTipData = countryMapData
		let mapChart = echarts.init(document.getElementById('map'))
		let option = {
			textStyle:{
				fontFamily:'inherit',
			},	
			title: {
				right: '4%',
				fontSize: 20,
				top: '0%',
				text: 'Time spent in each visited destination\nby digital nomads worldwide in 2023',
				textStyle: {
					color: '#999',
					fontSize: 40,
					lineHeight: 24
				}
			},
			legend: {
				show: 1,
				data: ['country', 'city'],
				bottom: '2%',
				textStyle: {
					color: '#fff'
				}
			},
			grid: {
				right: '2%',
				top: '10%',
				bottom: '0%',
				width: '8%'
			},
			xAxis: {
				type: 'value',
				scale: true,
				position: 'top',
				splitNumber: 1,
				boundaryGap: false,
				splitLine: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					margin: 2,
					show: 0,
					textStyle: {
						color: '#aaa'
					}
				}
			},
			yAxis: {
				type: 'category',
				nameGap: 16,
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ddd'
					}
				},
				axisTick: {
					show: false,
					lineStyle: {
						color: '#ddd'
					}
				},
				axisLabel: {

					interval: 0,
					textStyle: {
						color: '#999'
					}
				},
				data: timeMapData.map(i => i.name)
			},
			tooltip: {
				show: 1
			},
			geo: {
				left: 'left',
				right: '300',
				layoutSize: '160%',
				layoutCenter: ["40%", "52%"],
				show: true,
				map: mapName,
				roam: false,
				zoom: 1.05,
				aspectScale: 0.75,
				itemStyle: {
					normal: {
						borderColor: 'rgb(147, 235, 248)',
						borderWidth: 0.1,
						areaColor: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.8,
							colorStops: [{
								offset: 0,
								color: 'rgb(210,246,253)' 
							}, {
								offset: 1,
								color: 'rgb(154,210,244)' 
							}],
							globalCoord: true 
						},
					},
					emphasis: {
						label: {
							color: '#fff',
						},
						areaColor: 'rgb(46,229,206)',
						borderWidth: 0.1
					}
				},
				label: {
					normal: {
						show: false,
						textStyle: {
							color: '#fff'
						}
					},
					emphasis: {
						show: true,
						textStyle: {
							color: '#fff'
						}
					}
				},
			},
			series: [
				{
					tooltip: {
						show: 1,
						formatter: (p) => {
							return `${p.name}<br>${p.marker} ${p.value[2]}%`
						},
					},
					type: "effectScatter",
					coordinateSystem: "geo",
					zlevel: 2,
					name: 'city',

					rippleEffect: {
						period: 15, 
						brushType: "stroke", 
						scale: 4 
					},
					label: {
						normal: {
							show: false,
							position: "right", 
							offset: [5, 0], 
							formatter: "{b}", 
							textStyle: {
								color: "rgb(214,206,143)"
							}
						},

					},
					emphasis: {
						show: 0,
						scale: !0,
						label: {
							show: 0,
							backgroundColor: '#000',
							padding: 5,
							borderRadius: 8,
							color: "#fff"
						}
					},
					symbol: "circle",
					symbolSize: function (val) {
						return val[2] * 8; 
					},
					itemStyle: {
						normal: {
							show: false,
							color: '#1DE9B6',
						}
					},
					data: convertData(cityMapData),

				},
				{
					name: 'time spent',
					type: 'bar',

					zlevel: 2,
					barMaxWidth: 20,
					barBorderRadius: [0, 15, 15, 0],
					itemStyle: {
						normal: {
							color: '#E9BEFB'
						},
						emphasis: {
							color: "#AF82C2"
						}
					},
					label: {
						normal: {
							show: 1,
							position: 'right',
							offset: [10, 0],
							textStyle: {
								color: '#fff'
							},
							formatter: '{c}%'
						},
						emphasis: {
							show: true,
							position: 'right',
							offset: [10, 0]
						}
					},
					data: timeMapData
				}
			],
			animationDuration: 800,
			animationEasing: 'cubicInOut'
		};
		mapChart.setOption(option);

		var currentIndex = -1;
		var lastSeriesIndex = 1;
		var lastDataIndex = -1;
		var seriesIndex = 1;  

		function autoHighlight() {
			var dataLen = option.series[seriesIndex].data.length;
			if (lastDataIndex !== -1) {
				mapChart.dispatchAction({
					type: 'downplay',
					seriesIndex: lastSeriesIndex,
					dataIndex: lastDataIndex
				});
			}
			currentIndex = (currentIndex + 1) % dataLen;
			mapChart.dispatchAction({
				type: 'highlight',
				seriesIndex: seriesIndex,
				dataIndex: currentIndex
			});
			lastSeriesIndex = seriesIndex;
			lastDataIndex = currentIndex;
			if (currentIndex === dataLen - 1) {
				seriesIndex = seriesIndex === 1 ? 2 : 1;
			}
		}
	}

	mapOptions()
	function barCityOptions() {
		let barChart = echarts.init(document.getElementById('barCity'));

		let option = {
			textStyle:{
				fontFamily:'inherit',
			},	
			tooltip: {
				formatter: '{b}<br>{c}%',
				trigger: 'axis',
				axisPointer: { type: 'shadow' }
			},
			xAxis: [
				{
					splitLine: {
						show: false,
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: 'rgba(0,0,0,0.5)',
						},
					},
					axisLabel: {
						color: '#979797',
						fontSize: 25
					},
					type: 'category',
					data: cityMapData.map(i => i.name),

				},
			],
			yAxis: {
				name: '',
				nameTextStyle: {
					color: 'rgba(0,0,0,0.5)',
				},
				type: 'value',
				min: 0,
				axisLine: {
					show: false,
				},
				axisLabel: {
					color: '#979797',
					fontSize: 25
				},
				splitLine: {
					show: 0,
					lineStyle: {
						type: 'dashed',
					}
				},
				axisTick: {
					show: false
				},
			},
			grid: {
				top: '2%',
				left: '5%',
				right: '2%',
				bottom: '5%',
				containLabel: true,
			},
			series: [
				{
					name: '',
					type: 'bar',
					barWidth: 20,
					barGap: 0,
					color: '#247FFF',
					data: cityMapData.map(i => i.value),
					itemStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: '#1DE9B6' },
							{ offset: 1, color: '#448EFF33' },
						])
					},
				},
			]
		};
		barChart.setOption(option);


	}
	barCityOptions()
});
