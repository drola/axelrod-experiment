define(['app/agents'], function(Agents) {
    var Tournament = function(payoffMatrix, populationSize, roundsPerGeneration, generationCount) {
        this.payoffMatrix = payoffMatrix;
        this.populationSize = populationSize;
        this.roundsPerGeneration = roundsPerGeneration;
        this.generationCount = generationCount;
    };

    Tournament.prototype.initPopulationFromSpec = function(spec) {
        this.population = [];
        this.agentTypes = {};
        this.actualPopulationSize = 0; //May differ because of rounding

        var totalCountFromSpec = 0;
        for (var i in spec) {
            if (!spec.hasOwnProperty(i)) {
                continue;
            }

            totalCountFromSpec += spec[i];
        }

        var populationSpecRatio = this.populationSize / totalCountFromSpec;
        
        for (var i in spec) {
            if (!spec.hasOwnProperty(i)) {
                continue;
            }

            var count = Math.round(spec[i] * populationSpecRatio);

            this.agentTypes[i] = {
                count: count,
                startIndex: this.actualPopulationSize,
                endIndex: this.actualPopulationSize + count - 1,
                score: 0
            };

            this.actualPopulationSize += count;
        }

        for (var i in spec) {
            if (!spec.hasOwnProperty(i)) {
                continue;
            }

            for (var j = 0; j < this.agentTypes[i].count; j++) {
                this.population.push(new (Agents[i])(this.actualPopulationSize, this.payoffMatrix));
            }
        }
    };

    Tournament.prototype.runGeneration = function() {
        for (var k = 0; k < this.roundsPerGeneration; k++) {
            for (var i = 0; i < this.actualPopulationSize; i++) {
                for (var j = i + 1; j < this.actualPopulationSize; j++ ) {
                    var oppA = this.population[i];
                    var oppB = this.population[j];
                    var moveA = oppA.play(j);
                    var moveB = oppB.play(i);
                    oppA.addToHistory(j, moveA, moveB);
                    oppB.addToHistory(i, moveB, moveA);
                    oppA.agentValue += this.payoffMatrix.getPayoff(moveA, moveB);
                    oppB.agentValue += this.payoffMatrix.getPayoff(moveB, moveA);
                }
            }
        }
    };

    Tournament.prototype.acquireStatistics = function() {
        for (var i in this.agentTypes) {
            if (!this.agentTypes.hasOwnProperty(i)) {
                continue;
            }

            var agentType = this.agentTypes[i];
            agentType.score = 0;
            for (var j = agentType.startIndex; j <= agentType.endIndex; j++) {
                agentType.score += this.population[j].agentValue;
            }
            console.log(i, agentType.score);
        }
    };

    return Tournament;
});