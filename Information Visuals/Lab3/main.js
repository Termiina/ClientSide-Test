import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.csv("cars.csv")
    .then((data) => {
        console.log(data)
    }).catch((error) => {
        console.error(error)
    })


d3.selectAll(".myCircles")
    .attr("fill", "blue");
d3.selectAll("circle")
    .attr("r", function (d, i) {
        return 10 + (i * 10);
    });
d3.selectAll("circle")
    .attr("cx", 100)
    .attr("cy", function (d, i) {
        return 50 + (i * 50);
    });
d3.selectAll("circle")
    .attr("cx", function (d, i) {
        return 50 + (i * 50);
    })
    .attr("cy", 100);