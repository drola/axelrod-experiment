define(function() {
    var PayoffMatrix = function(name, mutualC, mutualD, sucker, temptation) {
        this.name = name;
        this.mutualC = mutualC;
        this.mutualD = mutualD;
        this.sucker = sucker;
        this.temptation = temptation;
    };

    PayoffMatrix.prototype.getPayoff = function(myMove, oppMove) {
        if(myMove) {
            if(oppMove) {
                return this.mutualC;
            } else {
                return this.sucker;
            }
        } else {
            if(oppMove) {
                return this.temptation;
            } else {
                return this.mutualD;
            }
        }
    };

    PayoffMatrix.Presets = {};

    PayoffMatrix.Presets.PrisonersDilemma = new PayoffMatrix('Prisoner\'s dilemma', -1, -2, -3, 0);

    return PayoffMatrix;
});