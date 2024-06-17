import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const BuildingsChart = ({aggregations = ['min', 'avg', 'max']}) => {
    const svgRef = useRef();

    const aggregateData = (buildings, aggregations) => {
        const groupedData = d3.group(buildings, d => d.year_create);

        const aggregatedData = Array.from(groupedData, ([year, values]) => {
            const result = {year: year};
            if (aggregations.includes('min')) result.min = d3.min(values, d => d.height);
            if (aggregations.includes('max')) result.max = d3.max(values, d => d.height);
            if (aggregations.includes('avg')) result.avg = d3.mean(values, d => d.height);
            return result;
        });

        return aggregatedData.sort((a, b) => a.year - b.year);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/chart');
                const rawData = response.data;
                const data = aggregateData(rawData, aggregations);

                const svg = d3.select(svgRef.current);
                svg.selectAll("*").remove();

                const width = 960;
                const height = 500;
                const margin = {top: 20, right: 20, bottom: 50, left: 70};
                const innerWidth = width - margin.left - margin.right;
                const innerHeight = height - margin.top - margin.bottom;

                const x = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.year))
                    .range([0, innerWidth]);

                const y = d3.scaleLinear()
                    .domain([300, d3.max(data, d => Math.max(d.min || 0, d.max || 0, d.avg || 0))])
                    .range([innerHeight, 0]);

                const chartGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                const lineGenerator = d3.line()
                    .curve(d3.curveBumpX) // Добавляем сглаживание
                    .x(d => x(d.year))
                    .y(d => y(d.value));

                const createPath = (className, data, color, key) => {
                    const path = chartGroup.append("path")
                        .datum(data)
                        .attr("class", className)
                        .attr("fill", "none")
                        .attr("stroke", color)
                        .attr("stroke-width", 2)
                        .attr("d", lineGenerator.y(d => y(d[key])));

                    const totalLength = path.node().getTotalLength();
                    path.attr("stroke-dasharray", `${totalLength * 3} ${totalLength * 3}`)
                        .attr("stroke-dashoffset", totalLength * 3)
                        .transition()
                        .duration(6000)
                        .ease(d3.easeLinear)
                        .attr("stroke-dashoffset", 0)
                        .attr("d", lineGenerator.y(d => y(d[key])));
                };

                if (aggregations.includes('min')) {
                    createPath("line-min", data, "green", "min");
                }

                if (aggregations.includes('avg')) {
                    createPath("line-avg", data, "blue", "avg");
                }

                if (aggregations.includes('max')) {
                    createPath("line-max", data, "red", "max");
                }

                const xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
                const yAxis = d3.axisLeft(y);

                chartGroup.append("g")
                    .attr("class", "x axis")
                    .attr("transform", `translate(0,${innerHeight})`)
                    .call(xAxis);

                chartGroup.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                svg.append("text")
                    .attr("class", "x axis-label")
                    .attr("text-anchor", "middle")
                    .attr("x", margin.left + innerWidth / 2)
                    .attr("y", height - 10)
                    .text("Год создания");

                svg.append("text")
                    .attr("class", "y axis-label")
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -margin.top - innerHeight / 2)
                    .attr("y", 20)
                    .text("Высота (м)");

            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, [aggregations]);

    return (
        <svg ref={svgRef} width="960" height="500"></svg>
    );
};

export default BuildingsChart;
