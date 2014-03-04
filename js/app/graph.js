define(['d3'], function(d3){
    var Graph = function(targetSelector, n) {
        var margin = {top: 20, right: 20, bottom: 20, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        this.x = d3.scale.linear()
            .domain([0, n - 1])
            .range([0, width]);
        this.y = d3.scale.linear()
            .domain([0, 1])
            .range([height, 0]);
        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("bottom");
        this.yAxis = d3.svg.axis()
            .scale(this.y)
            .orient("left");

        this.color = d3.scale.category20();
        this.agentTypeIndex = d3.scale.ordinal().rangePoints(1);

        this.data = d3.map();

        var $this = this;

        this.line = d3.svg.line()
            .x(function(d, i) { return $this.x(i); })
            .y(this.y);

        this.svg = d3.select(targetSelector).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
           .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.y(0) + ")")
            .call(d3.svg.axis().scale(this.x).orient("bottom"));
        this.svg.append("g")
            .attr("class", "y axis")
            .call(d3.svg.axis().scale(this.y).orient("left"));
        var agent = this.svg.selectAll(".agent")
            .data(this.data)
            .enter().append("g")
            .attr("class", "agent");
        agent.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return $this.line(d.values); })
            .style("stroke", function(d) { return $this.color(d.name); });

    };

    Graph.prototype.addGenerationData = function(data) {
        for(var i in data) {
            if(!data.hasOwnProperty(i)) {
                continue;
            }

            if(!this.data.has(i)) {
                this.data.set(i, {name: i, values: []});
            }

            this.data.get(i).values.push(data[i]);
        }

        var $this = this;

        var agent = this.svg.selectAll(".agent")
            .data(this.data.values(), function(d) { return d.name; });

        agent.select("path.line")
            .attr("d", function(d) { return $this.line(d.values); });

        agent.enter().append("g")
            .attr("class", "agent")
          .append("path")
            .attr("class", "line")
            .attr("d", function(d) { return $this.line(d.values); })
            .style("stroke", function(d) { return $this.color(d.name); })
            .style("fill", "none");
    };

    return Graph;
});
