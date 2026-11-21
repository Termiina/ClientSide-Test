
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

d3.csv("movie_metadata.csv").then((data) => {

    console.log(data);

    const filteredData = data.filter(d => {
        if (!d.genres || d.genres.trim() === "") return false;
        if (!d.content_rating || d.content_rating.trim() === "") return false;
        return true;
    });


    const mapData = filteredData.map(d => ({
        title: d.movie_title,
        genre: d.genres,
        rating: d.content_rating
    }));

   
    const splitGenres = mapData.map(d => ({
        title: d.title,
        genres: d.genre.split("|"),
        rating: d.rating
    }));

    
    const movieGenres = splitGenres.flatMap(d =>
        d.genres.map(genre => ({
            title: d.title,
            genre: genre
        }))
    );

   
    const genreGroups = d3.group(movieGenres, d => d.genre);

    for (const [genre, movies] of genreGroups) {
        console.log(genre, movies.slice(0, 3));
        console.log("Movie Number:", movies.length);
        console.log("First movie:", movies[0].title);
        break;
    }

    const genreCounts = d3.rollup(
        movieGenres,
        group => group.length,
        d => d.genre
    );

    const genreArray = Array.from(
        genreCounts,
        ([genre, count]) => ({ genre, count })
    );

    console.table(genreArray);

    const width = 400, height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#piechart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.count);
    const arcs = pie(genreArray);

    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    svg.selectAll("path")
        .data(arcs)
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.genre))
        .attr("stroke", "white")
        .attr("stroke-width", 1);

}).catch(error => {
    console.error("Error loading movie data:", error);
});
