define(["jquery", "app/agents", "app/payoffMatrix", "app/tournament", "app/graph", "bootstrap", "bootstrap-select"], function($, Agents, PayoffMatrix, Tournament, Graph) {
    var graph;

    var initGraph = function() {
        graph = new Graph("#graph1Container", 100);
    };

    var initInputRangeRefreshing = function() {
        var update = function() {
            $(this).closest('.range-group').find('.range-value').text($(this).val());
        };

        $(".range-group input[type=range]").change(update).each(update);
    };

    var initAgentsTable = function() {
        for (var i in Agents) {
            if (!Agents.hasOwnProperty(i)) {
                continue;
            }

            var html = "<tr><td>" + i + "</td><td><input id=\"popspec-" + i + "\" type=\"range\" min=\"0\" value=\"0\" max=\"100\"></td><td></td></tr>";
            $(".agents-table tbody").append(html);
        }
    };

    var initPayoffPresets = function() {
        $("#payoff-preset").append('<option value="">Custom</option>');
        for (var i in PayoffMatrix.Presets) {
            if (!PayoffMatrix.Presets.hasOwnProperty(i)) {
                continue;
            }

            var html = '<option value="' + i + '">' + PayoffMatrix.Presets[i].name + '</option>';
            $("#payoff-preset").append(html);
        }

        $("#payoff-preset").selectpicker({width: '100%'}).change(function() {
            var val = $(this).val();
            if (PayoffMatrix.Presets[val] !== undefined) {
                var preset = PayoffMatrix.Presets[val];
                $("#payoff-bothC").val(preset.mutualC);
                $("#payoff-bothD").val(preset.mutualD);
                $("#payoff-sucker").val(preset.sucker);
                $("#payoff-temptation").val(preset.temptation);
            }
        });
    };

    var initTournament = function() {
        var payoffMatrix, tournament, populationSpec;
        var first = true;

        $("#go-button").click(function() {
            if (first) {
                payoffMatrix = new PayoffMatrix("noname", Number($("#payoff-bothC").val()), Number($("#payoff-bothD").val()), Number($("#payoff-sucker").val()), Number($("#payoff-temptation").val()));
                tournament = new Tournament(payoffMatrix, Number($("#input-populationSize").val()), Number($("#input-roundsPerGeneration").val()), Number($("#input-generationCount").val()));
                populationSpec = {};
                for (var i in Agents) {
                    if (!Agents.hasOwnProperty(i)) {
                        continue;
                    }

                    populationSpec[i] = Number($("#popspec-" + i).val());
                }
                tournament.initPopulationFromSpec(populationSpec);
                first = false;
            }

            graph.addGenerationData(tournament.getPopulationPercentages());
            tournament.runGeneration();
            tournament.constructNextGenerationPopulation();
        });
    };

    $(function() {
        initInputRangeRefreshing();
        initAgentsTable();
        initPayoffPresets();
        initTournament();
        initGraph();
    });
});
