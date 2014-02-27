var PayoffMatrix = function(name, mutualC, mutualD, sucker, temptation) {
    this.name = name;
    this.mutualC = mutualC;
    this.mutualD = mutualD;
    this.sucker = sucker;
    this.temptation = temptation;
};

var PayoffMatrix.prototype.getPayoff = function(myMove, oppMove) {
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
