<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>London vs Top10 Destinations </title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0px;
            width: 100%;
        }

        h3 {
            color: #333;
            /* 设置字体颜色为深灰色 */
            font-size: 14px;
            /* 设置字体大小 */
            font-weight: bold;
            /* 设置字体粗细 */
            margin: 2px 0;
            /* 设置上下边距为10px，左右边距为0 */
        }

        .popup {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            color: rgb(0, 0, 0);
            padding: 10px;
            border-radius: 5px;
            width: 275px;

            top: 10px;
            left: 10px;
            display: flex;
            flex-direction: column;
        }

        .popup h4 {
            margin: 10px 0 0 0;
            font-size: 18px;
        }

        .popup h5 {
            margin: 20px 0 7px 0;
            font-size: 14px;
            color: #000;
        }

        .popup ul {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 0px;
        }

        .popup li {
            cursor: pointer;
            transition: background-color 0.3s ease;
            padding: 0px 5px;
            border-radius: 3px;
            flex: 0 0 40%;
            white-space: nowrap;
            font-size: 12px;
        }

        .popup li:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        .marker {
            background-color: #FF0000;
            border-radius: 50%;
            border: 4px solid rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transform: translate(-50%, -50%);
            position: absolute;
            
            width: 20px;
           
            height: 20px;
          
        }

        .marker:hover {
            border-width: 10px;
        }

        .marker::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 50%;
            animation: pulse 2s infinite;
            box-shadow: 0 0 0 0 rgba(244, 241, 241, 0.7);
        }



        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(244, 241, 241, 0.7);
            }

            70% {
                box-shadow: 0 0 0 20px rgba(244, 241, 241, 0);
            }

            100% {
                box-shadow: 0 0 0 0 rgba(244, 241, 241, 0);
            }
        }

        #sidebar {
            position: absolute;
            top: 0;
            right: 0;
            width: 19.5%;
            height: 100vh;
            background-color: rgba(81, 74, 74, 0.5);
            color: white;
            overflow-y: auto;
            padding: 0 19px;
        }

        #sidebar h2 {
            border-bottom: 1px solid #ffffff;
            padding-bottom: 8px;
            margin-bottom: 8px;
            margin-top: 32px;
            font-size: 23px;
         
        }

        #sidebar p {
            border-bottom: 1px solid #FFFFFF;
            padding-bottom: 8px;
            margin-bottom: 8px;
            font-size: 13px;
          
        }

        .indicator-container {
            padding-bottom: 4px;
            margin-top: 2px;
        }

        .indicator-container strong {
            font-size: 14px;
            font-weight: bold;
            color: #ffffff;
        }


        .progress-container {
            position: relative;
            width: 80%;
            margin: 0 auto;
            height: 16px;
            background-color: #eeeeee;
            border-radius: 8px;
        }

        .progress-bar {
            height: 100%;
            border-radius: 5px;
            background-color: #6c618b;
        }

        .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            font-size: 12px;
        }



        .mapboxgl-popup-content {
            background-color: rgba(255, 255, 255, 0.8);
            width: 85%;
            height: auto;
            padding: 5px;

        }

        .mapboxgl-popup img {
            margin: 2px;

        }
    </style>



</head>

<body>
    <div id="map"></div>
    <div id="sidebar"></div>
    <div id="echartsBarChart"
        style="position: absolute; bottom: 0; left: 0; width: 76.5%; height: 31%; background: rgba(128, 128, 128, 0.1);">
    </div>
    <div class="popup">
        <h4>London vs Top10 Destinations</h4>
        <h5>Zoom to: </h5>
        <ul>
            <li onclick="flyToCity(100.5018, 13.7563,'Bangkok')">1-Bangkok</li>
            <li onclick="flyToCity(139.6917, 35.6895,'Tokyo')">2-Tokyo</li>
            <li onclick="flyToCity(-58.3816, -34.6037,'Buenos Aires')">3-Buenos Aires</li>
            <li onclick="flyToCity(114.0579, 22.5431,'Hong Kong')">4-Hong Kong</li>
            <li onclick="flyToCity(126.978, 37.5665,'Seoul')">5-Seoul</li>
            <li onclick="flyToCity(100.3288, 5.4141,'Penang')">6-Penang</li>
            <li onclick="flyToCity(-99.1332, 19.4326,'Mexico City')">7-Mexico City</li>
            <li onclick="flyToCity(98.9853, 18.7883,'Chiang Mai')">8-Chiang Mai</li>
            <li onclick="flyToCity(18.4241, -33.9249,'Cape Town')">9-Cape Town</li>
            <li onclick="flyToCity(19.945, 50.0647,'Krakow')">10-Kraków</li>
            <li onclick="flyToCity(0.1278, 51.5074,'London')">108-London</li>
            <li onclick="flyToFull()">Global</li>
        </ul>

    </div>
    <script>
        const chart = echarts.init(document.getElementById('map'));
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJyb3NhbiIsImEiOiJjbHJocDd0d3YwMWdqMmlxcXVicG1kdGszIn0.cTAgK7zfa8hMgU84zEX0vQ';


        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [35.0, 8.0],
            zoom: 1,

            scrollZoom: true,
            dragRotate: false,
            doubleClickZoom: true
        });
        map.dragPan.inertia = 0.1;
        // 模拟点数据
        const cities = [
            { name: 'No.1 Bangkok', coord: [100.5018, 13.7563], intro: 'Bangkok is the capital, largest city, and economic hub of Thailand, as well as one of the major international centers in Southeast Asia.<br><br> It boasts numerous tourist attractions, well-developed transportation, delicious Thai cuisine, and a vibrant nightlife.', img: "./img/Bangkok.jpg", index: [{ name: 'Total Score', value: 97.4, text: "97.4" }, { name: 'Cost', value: 100, text: "$1,321/month- affordable" }, { name: 'Internet', value: 86, text: "86Mbps (avg)- very fast" }, { name: 'Liked', value: 67, text: "67%" }, { name: 'Safety', value: 80, text: "80%" }, { name: 'Lifestyle and entertainment', value: 100, text: "100%- Rich" }, { name: 'Environmental Quality', value: 62.5, text: "62.5%" }] },
            { name: 'No.2 Tokyo', coord: [139.6917, 35.6895], intro: 'Tokyo is the capital and largest city of Japan, serving as a major international center for finance and culture.<br><br>It features unique architectural styles, well-developed transportation, delicious Japanese cuisine, vibrant nightlife, and a hub for fashion trends.', img: "./img/Tokyo.jpg", index: [{ name: 'Total Score', value: 89.6, text: "89.6" }, { name: 'Cost', value: 70, text: "$3,015/month- okay" }, { name: 'Internet', value: 64, text: "64Mbps (avg)- fast" }, { name: 'Liked', value: 100, text: "100%" }, { name: 'Safety', value: 100, text: "100%" }, { name: 'Lifestyle and entertainment', value: 100, text: "100%- Rich" }, { name: 'Environmental Quality', value: 60.8, text: "60.8%" }] },
            { name: 'No.3 Buenos Aires', coord: [-58.3816, -34.6037], intro: 'Buenos Aires is the capital and largest city of Argentina. It perfectly blends the elegance of European architecture with the vibrant culture of Latin America, often referred to as the Paris of South America.<br><br>The city is culturally rich, famous for its delicious Argentine barbecue, and has a vibrant nightlife.', img: "./img/Buenos Aires.jpg", index: [{ name: 'Total Score', value: 89.6, text: "89.6" }, { name: 'Cost', value: 100, text: "$1,549/month- affordable" }, { name: 'Internet', value: 78, text: "78Mbps (avg)- fast" }, { name: 'Liked', value: 56, text: "56%" }, { name: 'Safety', value: 65, text: "65%" }, { name: 'Lifestyle and entertainment', value: 100, text: "100%- Rich" }, { name: 'Environmental Quality', value: 72, text: "72%" }] },
            { name: 'No.4 Hong Kong', coord: [114.0579, 22.5431], intro: 'Hong Kong is a vibrant city located on the southern coast of China and one of the world\'s important financial centers. <br><br>It displays a unique blend of Eastern and Western cultures. The entertainment industry is thriving, there is an abundance of local street food, and the transportation system is well-developed.', img: "./img/Hong Kong.jpg", index: [{ name: 'Total Score', value: 83.8, text: "83.8" }, { name: 'Cost', value: 78, text: "$2,694/month- okay" }, { name: 'Internet', value: 87, text: "87Mbps (avg)- very fast" }, { name: 'Liked', value: 100, text: "100%" }, { name: 'Safety', value: 100, text: "100%" }, { name: 'Lifestyle and entertainment', value: 100, text: "100%- Rich" }, { name: 'Environmental Quality', value: 61, text: "61%" }] },
            { name: 'No.5 Seoul', coord: [126.978, 37.5665], intro: 'Seoul is the capital and largest city of South Korea, a dynamic metropolis where ancient traditions meet cutting-edge technology.<br><br>The entertainment industry is thriving, the transportation system is well-developed, Korean cuisine is delicious, and the nightlife is vibrant.', img: "./img/Seoul.jpg", index: [{ name: 'Total Score', value: 83, text: "83" }, { name: 'Cost', value: 82, text: "$2,357/month- affordable" }, { name: 'Internet', value: 87, text: "87Mbps (avg)- very fast" }, { name: 'Liked', value: 92, text: "92%" }, { name: 'Safety', value: 100, text: "100%" }, { name: 'Lifestyle and entertainment', value: 100, text: "100%- Rich" }, { name: 'Environmental Quality', value: 56.75, text: "56.75%" }] },
            { name: 'No.6 Penang', coord: [100.3288, 5.4141], intro: '6Penang is a vibrant state located on the northwest coast of Peninsular Malaysia, famous for its cultural diversity and its capital, George Town. <br><br>It is renowned as the food capital of Malaysia, with street food that showcases its cultural variety. It features a blend of architectural cultures and beautiful natural landscapes.', img: "./img/Penang.jpg", index: [{ name: 'Total Score', value: 83, text: "83" }, { name: 'Cost', value: 100, text: "$960/month- cheap" }, { name: 'Internet', value: 32, text: "32Mbps (avg)- not good" }, { name: 'Liked', value: 100, text: "100%" }, { name: 'Safety', value: 83, text: "83%" }, { name: 'Lifestyle and entertainment', value: 80, text: "80%- good" }, { name: 'Environmental Quality', value: 57, text: "57%" }] },
            { name: 'No.7 Mexico City', coord: [-99.1332, 19.4326], intro: 'Mexico City is the capital and largest city of Mexico, serving as a cultural hub with world-renowned museums, World Heritage sites, and landmarks (Independence Monument, the Metropolitan Cathedral).<br><br>It offers delicious Mexican cuisine and a vibrant nightlife that attracts visitors from all over the world.', img: "./img/Mexico City.jpg", index: [{ name: 'Total Score', value: 82.4, text: "82.4" }, { name: 'Cost', value: 100, text: "$2,104/month- affordable" }, { name: 'Internet', value: 65, text: "65Mbps (avg)- fast" }, { name: 'Liked', value: 85, text: "85%" }, { name: 'Safety', value: 30, text: "30%" }, { name: 'Lifestyle and entertainment', value: 83, text: "83%- good" }, { name: 'Environmental Quality', value: 60, text: "60%" }] },
            { name: 'No.8 Chiang Mai', coord: [98.9853, 18.7883], intro: 'Chiang Mai is a major city in northern Thailand, once the capital of the Lanna Kingdom. It is known for its ancient temples, cultural festivals, and traditional handicrafts. <br><br>Night markets and walking streets offer a rich shopping and dining experience. The surrounding mountains and countryside make it a hotspot for nature and adventure activities.', img: "./img/Chiang Mai.jpg", index: [{ name: 'Total Score', value: 82.2, text: "82.2" }, { name: 'Cost', value: 100, text: "$964/month- cheap" }, { name: 'Internet', value: 64, text: "64Mbps (avg)- fast" }, { name: 'Liked', value: 90, text: "90%" }, { name: 'Safety', value: 84, text: "84%" }, { name: 'Lifestyle and entertainment', value: 40, text: "40%- not bad" }, { name: 'Environmental Quality', value: 45, text: "45%" }] },
            { name: 'No.9 Cape Town', coord: [18.4241, -33.9249], intro: 'Cape Town is the legislative capital of South Africa, famous for its natural beauty like Table Mountain and Cape Point, as well as cultural landmarks such as Robben Island.<br><br>The city is culturally vibrant, with a rich arts scene and renowned wine regions. Its unique geography also makes it ideal for outdoor activities like hiking and surfing.', img: "./img/Cape Town.jpg", index: [{ name: 'Total Score', value: 81.6, text: "81.6" }, { name: 'Cost', value: 100, text: "$2,161/month- affordable" }, { name: 'Internet', value: 90, text: "90Mbps (avg)- very fast" }, { name: 'Liked', value: 89, text: "89%" }, { name: 'Safety', value: 18, text: "18%" }, { name: 'Lifestyle and entertainment', value: 82, text: "82%- good" }, { name: 'Environmental Quality', value: 57.5, text: "57.5%" }] },
            { name: 'No.10 Krakow', coord: [19.945, 50.0647], intro: 'Krakow, located in southern Poland, is the country\'s second-largest city.<br><br>With a millennium-long history and a UNESCO-listed Old Town, it boasts significant Jewish heritage sites. Jagiellonian University attracts scholars and tourists alike to explore its rich history and culture. ', img: "./img/Krakow.jpg", index: [{ name: 'Total Score', value: 81.6, text: "81.6" }, { name: 'Cost', value: 83, text: "$2,446/month- affordable" }, { name: 'Internet', value: 42, text: "42Mbps (avg)- not bad" }, { name: 'Liked', value: 100, text: "100%" }, { name: 'Safety', value: 100, text: "100%" }, { name: 'Lifestyle and entertainment', value: 64, text: "64%- not bad" }, { name: 'Environmental Quality', value: 63.5, text: "63.5%" }] },
            { name: 'No.108 London', coord: [-0.1278, 51.5074], intro: 'London, the capital of the United Kingdom, stands as a global economic and cultural hub, boasting a rich history and iconic architecture. <br><br>Its multiculturalism, diverse cuisine, and convenient transportation attract millions of tourists. From West End theaters to the British Museum, London offers a rich array of arts and entertainment venues.', img: "./img/London.jpg", index: [{ name: 'Total Score', value: 58.6, text: "58.6" }, { name: 'Cost', value: 15, text: "$5,686/month-too high" }, { name: 'Internet', value: 30, text: "30Mbps (avg)- not good" }, { name: 'Liked', value: 67, text: "67%" }, { name: 'Safety', value: 80, text: "80%" }, { name: 'Lifestyle and entertainment', value: 100, text: "100%- Rich" }, { name: 'Environmental Quality', value: 61.5, text: "61.5%" }] },];
        map.on('load', function () {
            updateSidebar(cities[10]);
            var popup = new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
                closeOnClick: false
            });
            cities.forEach(function (marker, index) {
                // 创建DOM元素作为标记
                var el = document.createElement('div');
                el.className = 'marker';
                el.style.width = 5 + (cities.length - index) * 2.5 + 'px';
                el.style.height = 5 + (cities.length - index) * 2.5 + 'px';
                // 悬浮显示弹窗
                el.addEventListener('mouseenter', () => {
                    popup.setHTML('<h3>' + marker.name + '</h3><img src="' + marker.img + '" alt="Location Image" style="width:100%; height: auto;">')
                        .setLngLat(marker.coord)
                        .addTo(map);
                });

                // 鼠标离开隐藏弹窗
                el.addEventListener('mouseleave', () => {
                    popup.remove();
                });

                el.addEventListener('mouseenter', function () {
                    updateSidebar(marker);
                    // map.flyTo({
                    //     center: marker.coord,
                    //     zoom: 8
                    // });
                });
                new mapboxgl.Marker(el)
                    .setLngLat([marker.coord[0], marker.coord[1]])
                    .setPopup(popup) // 设置弹窗
                    .addTo(map);


            });
        });

        function updateSidebar(city) {
            var sidebar = document.getElementById('sidebar');
            var introText = city.intro || 'No description available';
            sidebar.innerHTML = '<h2>' + city.name + '</h2><p>' + introText + '</p>';

            city.index.forEach(function (indicator) {
                var textOverlay = indicator.text || '';
                var progressBar = `
            <div class="progress-container">
                <div class="progress-bar" style="width: ${indicator.value}%;"></div>
                <span class="progress-text">${textOverlay}</span> <!-- 移动到progress-container内 -->
            </div>
        `;
                sidebar.innerHTML += '<div class="indicator-container"><strong>' + indicator.name + ':</strong>' + progressBar + '</div>';
            });
        }



        function flyToCity(longitude, latitude, cityName) {
            var city = cities.find(c => c.name === cityName);
            if (city) {
                updateSidebar(city);
            }
            map.flyTo({
                center: [longitude, latitude],
                zoom: 8,
                // pitch: 45,
                speed: 0.7,
                curve: 1,
                easing: function (t) {
                    return t;
                }
            });
        }
        function flyToFull() {
            map.flyTo({
                center: [90.1278, 35.5074],
                zoom: 2,
                curve: 1,
                easing: function (t) {
                    return t;
                }
            });

        }

        var dom = document.getElementById('echartsBarChart');
        var myChart = echarts.init(dom, {
            renderer: 'canvas',
            useDirtyRect: false,
            backgroundColor: 'rgba(81, 74, 74, 0.5)' // 设置背景色为灰色半透明
        });
        var option;

        const cities1 = ["Bangkok", "Tokyo", "Buenos Aires", "Hong Kong", "Seoul", "Penang", "Mexico City", "Chiang Mai", "Cape Town", "Kraków", "London"];
        const indicators = ["Total Score", "Cost", "Internet", "Liked by members", "Safety", "Lifestyle and entertainment", "Environmental Quality"];
        const data = [
            [97.4, 100, 86, 67, 80, 100, 62.5],
            [89.6, 70, 64, 100, 100, 100, 60.8],
            [89.6, 100, 78, 56, 65, 100, 72],
            [83.8, 78, 87, 100, 100, 100, 61],
            [83, 82, 87, 92, 100, 100, 56.75],
            [83, 100, 32, 100, 83, 80, 57],
            [82.4, 100, 65, 85, 30, 83, 60],
            [82.2, 100, 64, 90, 84, 40, 45],
            [81.6, 100, 90, 89, 18, 82, 57.5],
            [81.6, 83, 42, 100, 100, 64, 63.5],
            [58.6, 15, 30, 67, 80, 100, 61.5]
        ];

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: indicators,
                top: 30,
                textStyle: {
                    color: '#FFFFFF'  // 设置字体颜色为白色
                }
            },
            dataZoom: [
                { type: 'slider', start: 0, end: 100 },
                { type: 'inside', start: 0, end: 100 }
            ],
            xAxis: {
                type: 'category',
                data: cities1,
                axisLabel: {
                    interval: 0, // 显示所有标签
                    rotate: -15, // 标签倾斜角度
                    textStyle: {
                        fontSize: 10,
                        color: 'rgba(255, 255, 255, 0.4)'
                    }
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 120
            },
            series: indicators.map(function (indicator, idx) {
                return {
                    name: indicator,
                    type: 'bar',
                    data: data.map(function (item) {
                        return item[idx];
                    })
                };
            })
        };

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);
    </script>
</body>

</html>