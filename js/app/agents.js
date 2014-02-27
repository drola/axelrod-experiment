define(function() {
	var Agent = function(payoffMatrix) {
		this.agentValue = 0;
		this.payoffMatrix = payoffMatrix;
	};

	var Agent.prototype.addToHistory = function(oppId, myMove, oppMove) {

	};

	var Agents = {};

	/**
	 * Tit for tat
	 * 
	 * @param {[type]} agentCount   [description]
	 * @param {[type]} payoffMatrix [description]
	 */
	Agents.TitForTat = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = true;
		}
	};

	Agents.TitForTat.prototype = Object.create(Agent);
	Agents.TitForTat.prototype.constructor = Agents.TitForTat;

	Agents.TitForTat.prototype.play = function(oppId) {
		return this.history[oppId];
	};

	Agents.TitForTat.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] = oppMove;
	};

	/**
	 * Always cooperates
	 * 
	 * @param {[type]} agentCount   [description]
	 * @param {[type]} payoffMatrix [description]
	 */
	Agents.AllC = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
	};

	Agents.AllC.prototype = Object.create(Agent);
	Agents.AllC.prototype.constructor = Agents.AllC;

	Agents.AllC.prototype.play = function(oppId) {
		return true;
	};

	/**
	 * Always defects
	 * 
	 * @param {[type]} agentCount   [description]
	 * @param {[type]} payoffMatrix [description]
	 */
	Agents.AllD = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
	};

	Agents.AllD.prototype = Object.create(Agent);
	Agents.AllD.prototype.constructor = Agents.AllD;

	Agents.AllD.prototype.play = function(oppId) {
		return false;
	};

	Agents.TitForTwoTats = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history1 = new Array(agentCount);
		this.history2 = new Array(agentCount);
		for(var i = 0; i < this.history1.length; i++) {
			this.history1[i] = true;
			this.history2[i] = true;
		}
	};

	Agents.TitForTwoTats.prototype = Object.create(Agent);
	Agents.TitForTwoTats.prototype.constructor = Agents.TitForTwoTats;

	Agents.TitForTwoTats.prototype.play = function(oppId) {
		return this.history1[oppId] || this.history2[oppId];
	};

	Agents.TitForTwoTats.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history1[oppId] = this.history2[oppId];
		this.history2[oppId] = oppMove;
	};

	Agents.PerCD = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = false;
		}
	};

	Agents.PerCD.prototype = Object.create(Agent);
	Agents.PerCD.prototype.constructor = Agents.PerCD;

	Agents.PerCD.prototype.play = function(oppId) {
		return !this.history[oppId];
	};

	Agents.PerCD.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] = myMove;
	};

	Agents.PerCCD = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = 0;
		}
	};

	Agents.PerCCD.prototype = Object.create(Agent);
	Agents.PerCCD.prototype.constructor = Agents.PerCCD;

	Agents.PerCCD.prototype.play = function(oppId) {
		return this.history[oppId] != 2;
	};

	Agents.PerCCD.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId]++;
		if(this.history[oppId] == 3) {
			this.history[oppId] = 0;
		}
	};

	Agents.PerDDC = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = 0;
		}
	};

	Agents.PerDDC.prototype = Object.create(Agent);
	Agents.PerDDC.prototype.constructor = Agents.PerDDC;

	Agents.PerDDC.prototype.play = function(oppId) {
		return this.history[oppId] == 2;
	};

	Agents.PerDDC.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId]++;
		if(this.history[oppId] == 3) {
			this.history[oppId] = 0;
		}
	};

	Agents.Spiteful = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = true;
		}
	};

	Agents.Spiteful.prototype = Object.create(Agent);
	Agents.Spiteful.prototype.constructor = Agents.Spiteful;

	Agents.Spiteful.prototype.play = function(oppId) {
		return this.history[oppId];
	};

	Agents.Spiteful.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] = this.history[oppId] && oppMove;
	};

	Agents.Joss = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = true;
		}
	};

	Agents.Joss.prototype = Object.create(Agent);
	Agents.Joss.prototype.constructor = Agents.Joss;

	Agents.Joss.prototype.play = function(oppId) {
		if(!this.history[oppId]) {
			return false;
		}

		return Math.floor(Math.random() * 10) < 9;
	};

	Agents.Joss.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] = oppMove;
	};

	Agents.Random = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
	};

	Agents.Random.prototype = Object.create(Agent);
	Agents.Random.prototype.constructor = Agents.Joss;

	Agents.Random.prototype.play = function(oppId) {
		return Math.random() < 0.5;
	};


	Agents.Tester = function(agentCount, payoffMatrix) {
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

	Agents.Tester.prototype = Object.create(Agent);
	Agents.Tester.prototype.constructor = Agents.Tester;

	Agents.Tester.prototype.play = function(oppId) {
		return this.history0[oppId];
	};

	Agents.Tester.prototype.addToHistory = function(oppId, myMove, oppMove) {
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
	Agents.SoftMajo = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = 0;
		}
	};

	Agents.SoftMajo.prototype = Object.create(Agent);
	Agents.SoftMajo.prototype.constructor = Agents.SoftMajo;

	Agents.SoftMajo.prototype.play = function(oppId) {
		return this.history[oppId] >= 0;
	};

	Agents.SoftMajo.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] += oppMove ? 1 : -1;
	};

	/**
	 * Hard majo
	 * 
	 * @param {[type]} agentCount   [description]
	 * @param {[type]} payoffMatrix [description]
	 */
	Agents.HardMajo = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = 0;
		}
	};

	Agents.HardMajo.prototype = Object.create(Agent);
	Agents.HardMajo.prototype.constructor = Agents.HardMajo;

	Agents.HardMajo.prototype.play = function(oppId) {
		return this.history[oppId] > 0;
	};

	Agents.HardMajo.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] += oppMove ? 1 : -1;
	};

	/**
	 * Pavlov agent
	 * 
	 * @param {[type]} agentCount   [description]
	 * @param {[type]} payoffMatrix [description]
	 */
	Agents.Pavlov = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = true;
		}
	};

	Agents.Pavlov.prototype = Object.create(Agent);
	Agents.Pavlov.prototype.constructor = Agents.Pavlov;

	Agents.Pavlov.prototype.play = function(oppId) {
		return this.history[oppId];
	};

	Agents.Pavlov.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] = oppMove == myMove;
	};

	/**
	 * Mistrust agent
	 * 
	 * @param {[type]} agentCount   [description]
	 * @param {[type]} payoffMatrix [description]
	 */
	Agents.Mistrust = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = false;
		}
	};

	Agents.Mistrust.prototype = Object.create(Agent);
	Agents.Mistrust.prototype.constructor = Agents.Mistrust;

	Agents.Mistrust.prototype.play = function(oppId) {
		return this.history[oppId];
	};

	Agents.Mistrust.prototype.addToHistory = function(oppId, myMove, oppMove) {
		this.history[oppId] = oppMove;
	};

	/**
	 * Prober
	 * 
	 * @param {[type]} agentCount   [description]
	 * @param {[type]} payoffMatrix [description]
	 */
	Agents.Prober = function(agentCount, payoffMatrix) {
		Agent.call(this, payoffMatrix);
		this.history = new Array(agentCount);
		for(var i = 0; i < this.history.length; i++) {
			this.history[i] = 0;
		}
	};

	Agents.Prober.prototype = Object.create(Agent);
	Agents.Prober.prototype.constructor = Agents.Prober;

	Agents.Prober.prototype.play = function(oppId) {
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

	Agents.Prober.prototype.addToHistory = function(oppId, myMove, oppMove) {
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

	return Agents;
});
