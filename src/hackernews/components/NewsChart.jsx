import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

import _ from './Utils';

import styles from './NewsChart.module.scss';

function NewsChart(props) {
    const { data, xAxesKey, yAxesKey } = props;
    const canvasRef = useRef();
    const chartRef = useRef();

    const dataSet = data.map(d => _.get(d, yAxesKey));
    const labels = data.map(d => _.get(d, xAxesKey));

    // initialize the chart
    useEffect(() => {
        if (canvasRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        backgroundColor: '#2196f3',
                        borderColor: "#2196f3",
                        data: dataSet,
                        fill: false,
                        lineTension: 0,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    animation: {
                        duration: 0
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: xAxesKey
                            },
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                padding: 10,
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 90
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: yAxesKey
                            },
                            gridLines: {
                                display: true,
                                drawTicks: false,
                            },
                            ticks: {
                                padding: 10,
                                maxTicksLimit: 5,
                                // stepSize: 250,
                            }
                        }],
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [canvasRef, data]);


    return (
        <div className={styles.chart}>
            <canvas
                ref={canvasRef}
            />
        </div>
    );
}

NewsChart.propTypes = {
    data: PropTypes.array,
    xAxesKey: PropTypes.string.isRequired,
    yAxesKey: PropTypes.string.isRequired,
};

NewsChart.defaultProps = {
    data: [],
};

export default NewsChart;
