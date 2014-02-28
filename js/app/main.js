define(["jquery", "app/agents", "app/payoffMatrix", "app/tournament", "bootstrap", "bootstrap-select"], function($, Agents, PayoffMatrix, Tournament) {
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

            var html = "<tr><td>" + i + "</td><td><input id=\"popspec-" + i + "\" type=\"range\" min=\"0\" max=\"100\"></td><td></td></tr>";
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
        $("#go-button").click(function() {
            var payoffMatrix = new PayoffMatrix("noname", Number($("#payoff-bothC").val()), Number($("#payoff-bothD").val()), Number($("#payoff-sucker").val()), Number($("#payoff-temptation").val()));
            var tournament = new Tournament(payoffMatrix, Number($("#input-populationSize").val()), Number($("#input-roundsPerGeneration").val()), Number($("#input-generationCount").val()));
            var populationSpec = {};
            for (var i in Agents) {
                if (!Agents.hasOwnProperty(i)) {
                    continue;
                }

                populationSpec[i] = Number($("#popspec-" + i).val());
            }
            console.log(tournament);

            tournament.initPopulationFromSpec(populationSpec);
            tournament.runGeneration();
            tournament.acquireStatistics();
        });
    };

    $(function() {
        initInputRangeRefreshing();
        initAgentsTable();
        initPayoffPresets();
        initTournament();
    });
});
