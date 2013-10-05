var Agent = function(payoffMatrix) {
	this.agentValue = 0;
	this.payoffMatrix = payoffMatrix;
};

var Agent.prototype.addToHistory = function(oppId, myMove, oppMove) {

};

/**
 * Tit for tat
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var TitForTatAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = true;
	}
};

TitForTatAgent.prototype = Object.create(Agent);
TitForTatAgent.prototype.constructor = TitForTatAgent;

TitForTatAgent.prototype.play = function(oppId) {
	return this.history[oppId];
};

TitForTatAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] = oppMove;
};

/**
 * Always cooperates
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var AllCAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
};

AllCAgent.prototype = Object.create(Agent);
AllCAgent.prototype.constructor = AllCAgent;

AllCAgent.prototype.play = function(oppId) {
	return true;
};

/**
 * Always defects
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var AllDAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
};

AllDAgent.prototype = Object.create(Agent);
AllDAgent.prototype.constructor = AllDAgent;

AllDAgent.prototype.play = function(oppId) {
	return false;
};

var TitForTwoTatsAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history1 = new Array(agentCount);
	this.history2 = new Array(agentCount);
	for(var i = 0; i < this.history1.length; i++) {
		this.history1[i] = true;
		this.history2[i] = true;
	}
};

TitForTwoTatsAgent.prototype = Object.create(Agent);
TitForTwoTatsAgent.prototype.constructor = TitForTwoTatsAgent;

TitForTwoTatsAgent.prototype.play = function(oppId) {
	return this.history1[oppId] || this.history2[oppId];
};

TitForTwoTatsAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history1[oppId] = this.history2[oppId];
	this.history2[oppId] = oppMove;
};

var PerCDAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = false;
	}
};

PerCDAgent.prototype = Object.create(Agent);
PerCDAgent.prototype.constructor = PerCDAgent;

PerCDAgent.prototype.play = function(oppId) {
	return !this.history[oppId];
};

PerCDAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] = myMove;
};

var PerCCDAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = 0;
	}
};

PerCCDAgent.prototype = Object.create(Agent);
PerCCDAgent.prototype.constructor = PerCCDAgent;

PerCCDAgent.prototype.play = function(oppId) {
	return this.history[oppId] != 2;
};

PerCCDAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId]++;
	if(this.history[oppId] == 3) {
		this.history[oppId] = 0;
	}
};

var PerDDCAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = 0;
	}
};

PerDDCAgent.prototype = Object.create(Agent);
PerDDCAgent.prototype.constructor = PerDDCAgent;

PerDDCAgent.prototype.play = function(oppId) {
	return this.history[oppId] == 2;
};

PerDDCAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId]++;
	if(this.history[oppId] == 3) {
		this.history[oppId] = 0;
	}
};

var SpitefulAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = true;
	}
};

SpitefulAgent.prototype = Object.create(Agent);
SpitefulAgent.prototype.constructor = SpitefulAgent;

SpitefulAgent.prototype.play = function(oppId) {
	return this.history[oppId];
};

SpitefulAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] = this.history[oppId] && oppMove;
};

var JossAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = true;
	}
};

JossAgent.prototype = Object.create(Agent);
JossAgent.prototype.constructor = JossAgent;

JossAgent.prototype.play = function(oppId) {
	if(!this.history[oppId]) {
		return false;
	}

	return Math.floor(Math.random() * 10) < 9;
};

JossAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] = oppMove;
};

var RandomAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
};

RandomAgent.prototype = Object.create(Agent);
RandomAgent.prototype.constructor = JossAgent;

RandomAgent.prototype.play = function(oppId) {
	return Math.random() < 0.5;
};


var TesterAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history0 = new Array(agentCount);
	this.history1 = new Array(agentCount);
	this.history2 = new Array(agentCount);
	for(var i = 0; i < this.history0.length; i++) {
		this.history0[i] = false;
		this.history1[i] = true;
		this.history2[i] = true;
	}
};

TesterAgent.prototype = Object.create(Agent);
TesterAgent.prototype.constructor = TesterAgent;

TesterAgent.prototype.play = function(oppId) {
	return this.history0[oppId];
};

TesterAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	if(this.history2[oppId]) {
		this.history1[oppId] = oppMove;
		this.history2[oppId] = false;
	}

	if(this.history1[oppId]) { //PerCD
		this.history0[oppId] = !myMove;
	} else { //TFT
		this.history0[oppId] = oppMove;
	}
};

/**
 * Soft majo
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var SoftMajo = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = 0;
	}
};

SoftMajo.prototype = Object.create(Agent);
SoftMajo.prototype.constructor = SoftMajo;

SoftMajo.prototype.play = function(oppId) {
	return this.history[oppId] >= 0;
};

SoftMajo.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] += oppMove ? 1 : -1;
};

/**
 * Hard majo
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var HardMajo = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = 0;
	}
};

HardMajo.prototype = Object.create(Agent);
HardMajo.prototype.constructor = HardMajo;

HardMajo.prototype.play = function(oppId) {
	return this.history[oppId] > 0;
};

HardMajo.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] += oppMove ? 1 : -1;
};

/**
 * Pavlov agent
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var PavlovAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = true;
	}
};

PavlovAgent.prototype = Object.create(Agent);
PavlovAgent.prototype.constructor = PavlovAgent;

PavlovAgent.prototype.play = function(oppId) {
	return this.history[oppId];
};

PavlovAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] = oppMove == myMove;
};

/**
 * Mistrust agent
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var MistrustAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = false;
	}
};

MistrustAgent.prototype = Object.create(Agent);
MistrustAgent.prototype.constructor = MistrustAgent;

MistrustAgent.prototype.play = function(oppId) {
	return this.history[oppId];
};

MistrustAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	this.history[oppId] = oppMove;
};

/**
 * Prober
 * 
 * @param {[type]} agentCount   [description]
 * @param {[type]} payoffMatrix [description]
 */
var ProberAgent = function(agentCount, payoffMatrix) {
	Agent.call(this, payoffMatrix);
	this.history = new Array(agentCount);
	for(var i = 0; i < this.history.length; i++) {
		this.history[i] = 0;
	}
};

ProberAgent.prototype = Object.create(Agent);
ProberAgent.prototype.constructor = ProberAgent;

ProberAgent.prototype.play = function(oppId) {
	var hist = this.history[oppId];
	if(hist == 0) {
		return true;
	} else if(hist == 1) {
		return false;
	} else if(hist == 2) {
		return false;
	} else if(hist == 3) {
		return false;
	} else if(hist == 4) {
		return false;
	} else if(hist == 10) {
		return true;
	} else if(hist == 11) {
		return false;
	}

	return true;
};

ProberAgent.prototype.addToHistory = function(oppId, myMove, oppMove) {
	var hist = this.history[oppId];
	if(hist == 0) {
		this.history[oppId] = 1;
	} else if(hist == 1 && oppMove) {
		this.history[oppId] = 2;
	} else if(hist == 1 && !oppMove) {
		this.history[oppId] = 3;
	} else if(hist == 2 && oppMove) {
		this.history[oppId] = 4;
	} else if(hist == 2 && !oppMove) {
		this.history[oppId] = 10;
	} else if(hist == 3) {
		this.history[oppId] = 10;
	} else if(hist == 10 && !oppMove) {
		this.history[oppId] = 11;
	} else if(hist == 11 && oppMove) {
		this.history[oppId] = 10;
	}
};