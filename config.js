/* 		Trimps
		Copyright (C) 2015 Zach Hood

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program (if you are reading this on the original
		author's website, you can find a copy at
		<https://googledrive.com/host/0BwflTm9l-5_0fnFvVzI2TW1hU3J6TGc2NEt6VFc4N0hzaWpGX082LWY2aDJTSV85aVRxYVU/license.txt>). If not, see
		<http://www.gnu.org/licenses/>. */
function newGame () {
var toReturn = {
	global: {
		version: 1.07,
		killSavesBelow: 0.13,
		playerGathering: "",
		playerModifier: 1,
		buildingsQueue: [],
		timeLeftOnCraft: 0,
		crafting: "",
		timeLeftOnTrap: -1,
		world: 1,
		gridArray: [],
		mapGridArray: [],
		mapsOwnedArray: [],
		currentMapId: "",
		lastClearedCell: -1,
		lastClearedMapCell: -1,
		pauseFight: true,
		soldierHealth: 0,
		soldierHealthMax: 0,
		soldierHealthRemaining: 0,
		soldierCurrentAttack: 0,
		soldierCurrentBlock: 0,
		fighting: false,
		health: 40,
		attack: 7,
		block: 0,
		autoBattle: false,
		autoCraftModifier: 0,
		autoSave: true,
		start: new Date().getTime(),
		time: 0,
		lastFightUpdate: "",
		battleCounter: 0,
		firing: false,
		mapsActive: false,
		preMapsActive: false,
		switchToMaps: false,
		switchToWorld: false,
		lookingAtMap: "",
		mapsOwned: 0,
		totalMapsEarned: 0,
		freshFight: false,
		tab: "All",
		repeatMap: false,
		buyAmt: 1,
		numTab: 1,
		spreadsheetMode: false,
		lockTooltip: false,
		standardNotation: true,
		portalActive: false,
		mapsUnlocked: false,
		lastOnline: 0,
		buyTab: "all",
		nextQueueId: 0,
		kongBonusMode: false,
		canRespecPerks: true,
		respecActive: false,
		heliumLeftover: 0,
		viewingUpgrades: false,
		totalPortals: 0,
		lastCustomAmt: 0,
		trapBuildAllowed: false,
		trapBuildToggled: false,
		pp: [],
		b: 0,
		menu: {
			buildings: true,
			jobs: false,
			upgrades: false
		},
		messages: {
			Story: true,
			Loot: true,
			Unlocks: true,
			Combat: true,
			Notices: true
		},
		prestige: {
			attack: 13,
			health: 14,
			cost: 57,
			block: 10,
		},
		getEnemyAttack: function (level, name) {
			var world = getCurrentMapObject();
			var amt = 0;
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var adjWorld = ((world - 1) * 100) + level;
			amt += 50 * Math.sqrt(world * Math.pow(3.27, world));
			amt -= 10;
			if (world == 1){
				amt *= .35;
				amt = (amt * .20) + ((amt * .75) * (level / 100));			
			}
			else if (world == 2){
				amt *= .5;
				amt = (amt * .32) + ((amt * .68) * (level / 100));
			}
			else
			amt = (amt * .375) + ((amt * .7) * (level / 100));
			
			if (world > 6 && game.global.mapsActive) amt *= 1.1;
			
			amt *= game.badGuys[name].attack;
			
			return Math.floor(amt);
		},
		getEnemyHealth: function (level, name) {
			var world = getCurrentMapObject();
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var amt = 0;
			amt += 130 * Math.sqrt(world * Math.pow(3.265, world));
			amt -= 110;
			if (world == 1 || world == 2 && level < 10){
				amt *= .6;
			amt = (amt * .25) + ((amt * .72) * (level / 100));
			}
			else
			amt = (amt * .4) + ((amt * .4) * (level / 110));
			
			if (world > 5 && game.global.mapsActive) amt *= 1.1;
			
			amt *= game.badGuys[name].health;
			
			return Math.floor(amt);
		}
	},
	//portal
	portal: {
		Agility: {
			level: 0, 
			modifier: .05,
			priceBase: 4,
			heliumSpent: 0,
			tooltip: "Mit Stuff füllen! verschnellert um 5% <b>vom jetztigen Speed </b>. Maximum von 20 levels.",
			max: 20,
		},
		Bait: {
			level: 0,
			modifier: 1,
			priceBase: 4,
			heliumSpent: 0,
			tooltip: "+1 Trimp pro Falle",
		},
		

		
		Trumps: {
		//fiveTrimpMax worldUnlock
			locked: 0,
			level: 0,
			modifier: 1,
			priceBase: 3,
			heliumSpent: 0,
			tooltip: "Gibt dir mehr Platz pro gefundenen Platz auf der Map (+ $modifier$ )",
		},

		//breed main
		Pheromones: {
			level: 0,
			modifier: 0.1,
			priceBase: 3,
			heliumSpent: 0,
			tooltip: "Lässt die Trimps mehr Poppen. Nimmt ihnen die Kondome weg. Macht mehr sterbenswillige Kinder",
		},
		//trapThings main
		Packrat: {
			modifier: 0.05,
			heliumSpent: 0,
			tooltip: "Mehr Platz für Ressourcen. Erhöht um 5%.",
			priceBase: 3,
			level: 0,
		},
		//updatePs updates
		//gather main
		Motivation: {
			modifier: 0.05,
			heliumSpent: 0,
			tooltip: "Lässt die Trimps mehr arbeiten um 5%.",
			priceBase: 2,
			level: 0,
		},
		

		//startFight main
		Power: {
			level: 0,
			modifier: .05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Trimps machen 5% mehr Schaden",
		},
		//startFight main
		Toughness: {
			modifier: .05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Bringe deine Trimps dazu mehr Schmerzen zu ertragen. 5% mehr Leben, bevor sie sterben.",
			level: 0,
		},
		//These are gonna be harder than I thought. There's a lot of checks to prices.
/* 		Cheapskate: {
			modifier: .05,
			tooltip: "Discuss negotiation tactics with your leading scientists. Permanently reduces the cost of all jobs by 5%",
		},
		Resourcefulness: {
			modifier: .05,
			tooltip: "Talk to your scientists about more efficient building designs. Each level reduces the cost of all buildings by 5%",
		}, */

		//rewardResources main
		Looting: {
			modifier: .05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "DU erhällst im Kampf 5% mehr Loot.",
			level: 0,
		},
	},
	
	
	
	worldText: {
		w2: "Your Trimps killed a lot of bad guys back there. It seems like you're getting the hang of this. However the world is large, and there are many more zones to explore. Chop chop.",
		w3: "By your orders, your scientists have begun to try and figure out how large this planet is.",
		w5: "Do you see that thing at the end of this zone? It's huge! It's terrifying! You've never seen anything like it before, but you know that it is a Blimp. How did you know that? Stop knowing things and go kill it.",
		w6: "You step over the corpse of the Blimp as it rapidly deflates, and one of your Trimps chuckles at the sound produced. You all cross the sulfuric river to the next zone, and can feel the presence of an ancient knowledge. Better explore.",
		w7: "Slow and steady wins the race. Unless you're racing someone who is actually trying.",
		w8: "Your settlement is getting crowded, there's Trimps in the streets and you're taking heat. You feel a sudden strong desire to create a map, though you're not quite sure how that would help.",
		w9: "You can't shake the feeling that you've been here before. Deja Vu?",
		w10: "Looks like another Blimp up ahead. Hard to tell from far away, but it looks like it has more heads than the last one.",
		w11: "You're unstoppable as long as nothing stops you. Unfortunately, it seems like something really wants to stop you.",
		w12: "Did you see that green light flash by? Weird. Oh well.",
		w13: "Your scientists have finally concluded their report on the analysis of the size of the world. According to the report, they're pretty sure it's infinitely large, but you're pretty sure they just got bored of checking.",
		w15: "Another day, another Blimp at the end of the zone",
		w16: "Seriously? Another Blimp so soon?",
		w17: "You climb a large cliff and look out over the new zone. Red dirt, scorched ground, and devastation. Is that a Dragimp flying around out there?!",
		w18: "There seems to be a strange force urging you to keep going. The atmosphere is becoming... angrier. Part of you wants to turn around and go back, but most of you wants to keep going.",
		w19: "You look behind and see your kingdom. You have gems, a colony, and territory. You wonder if enough Trimps have already fallen in battle. After contemplation, one word falls out of your mouth as you begin to move forward. 'Nah'",
		w20: "You can sense that you're close to your goal.",
		w23: "You're a rebel. The universe pointed you into that portal, but you kept pushing forward. You feel... less like you've been here before.",
		w25: "It seems like the further you press on, the less you know. You still feel an urge to use the portal, though the urge has begun to dwindle.",
		
		
	},
	
	trimpDeathTexts: ["wurde ausradiert", "Füge mehr coole Todestexte ein", "hat in das gras gebissen", "nimmt einen dreckigen schlaff", "liegt unter der erde", "expired", "sieht den rasen von unten"],
	badGuyDeathTexts: ["gekillt", "getötet", "gekillt", "gekillt", "gekillt", "geschlagen", "geschlagen", "geschlagen", "geschändet", "zerstört", "zerstört"],
	
	settings: {
		speed: 10,
		speedTemp: 0,
		slowdown: false,
		barAnimation: true
	},
	
	resources: {
		food: {
			owned: 0,
			max: 500
		},
		wood: {
			owned: 0,
			max: 500
		},
		metal: {
			owned: 0,
			max: 500
		},
		trimps: {
			owned: 0,
			max: 10,
			working: 0,
			speed: 5,
			employed: 0,
			soldiers: 0,
			maxSoldiers: 1,
			potency: 0.0085
		},
		science: {
			owned: 0,
			max: -1
		},
		gems: {
			owned: 0,
			max: -1,
		},
		fragments: {
			owned: 0,
			max: -1,
		},
 		helium: {
			owned: 0,
			max: -1,
		} 
	},
	
	equipment: {
		Shield: {
			locked: 1,
			tooltip: "Ein grosses Holzschild. Fügt $healthCalculated$ HP pro Trimp hinzu.",
			blocktip: "Ein grosses Holzschild. Fügt $blockCalculated$ BLOCK pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				wood: [40, 1.2]
			},
			oc: 40,
			health: 4,
			healthCalculated: 4,
			blockNow: false,
			block: 1.5,
			blockCalculated: 1.5,
			prestige: 1
		},
		Dagger: {
			locked: 1,
			tooltip: "Besser als nichts. Fügt $attackCalculated$ Angriff pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [40, 1.2]
			},
			oc: 40,
			attack: 2,
			attackCalculated: 2,
			prestige: 1
		},
		Boots: {
			locked: 1,
			tooltip: "Jetzt sind wenigstens ihre Füsse sicher. Fügt $healthCalculated$ HP pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [55, 1.2]
			},
			oc: 55,
			health: 6,
			healthCalculated: 6,
			prestige: 1
		},
		//2
		Mace: {
			locked: 1,
			tooltip: "Es ist ein wenig schwer für Trimps, aber ich denke sie werden es schaffen. Fügt $attackCalculated$ Angriff pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [80, 1.2]
			},
			oc: 80,
			attack: 3,
			attackCalculated: 3,
			prestige: 1
		},
		Helmet: {
			locked: 1,
			tooltip: "Warum auch immer man den Kopf eines Trimps schützen will. Fügt $healthCalculated$ HP pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [100, 1.2]
			},
			oc: 100,
			health: 10,
			healthCalculated: 10,
			prestige: 1
		},
		//3
		Polearm: {
			locked: 1,
			tooltip: "Das ist gross und nützlich. $attackCalculated$ Angriff pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [140, 1.2]
			},
			oc: 140,
			attack: 4,
			attackCalculated: 4,
			prestige: 1
		},
		Pants: {
			locked: 1,
			tooltip: "Hosen, extra für Trimps! Fügt $healthCalculated$ Angriff pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [160, 1.2]
			},
			oc: 160,
			health: 14,
			healthCalculated: 14,
			prestige: 1
		},
		//4
		Battleaxe: {
			locked: 1,
			tooltip: "Diese Waffe ist zu schwer für Trimps, aber sie denken sie nützlich gebrauchen zu können. Fügt $attackCalculated$ Angriff pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [230, 1.2]
			},
			oc: 230,
			attack: 7,
			attackCalculated: 7,
			prestige: 1
		},
		Shoulderguards: {
			locked: 1,
			tooltip: "Das sieht vorallem mal Cool aus, bringen tut es nur wenig. Fügt $healthCalculated$ HP pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [275, 1.2]
			},
			oc: 275,
			health: 23,
			healthCalculated: 23,
			prestige: 1
		},
		//5
		Greatsword: {
			locked: 1,
			tooltip: "Dieses Schwert sieht bei Trimps süss aus. Wenn du es nur sehen könntest. Es sieht wirklich zu süss aus. Bis es Blutig ist. Fügt $attackCalculated$ Angriff pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [375, 1.2]
			},
			oc: 375,
			attack: 9,
			attackCalculated: 9,
			prestige: 1
		},
		Breastplate: {
			locked: 1,
			tooltip: " Das sieht Mönströs aus. Fügt $healthCalculated$ HP pro Trimp hinzu.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [415, 1.2]
			},
			oc: 415,
			health: 35,
			healthCalculated: 35,
			prestige: 1
		}
	},

	badGuys: {
		
		Squimp: {
			location: "All",
			attack: .8,
			health: .7,
			fast: true
		},
		Elephimp: {
			location: "All",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Turtlimp: {
			location: "All",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Penguimp: {
			location: "All",
			attack: 1.1,
			health: 0.7,
			fast: false
		},
		Snimp: {
			location: "All",
			attack: 1.05,
			health: 0.8,
			fast: true
		},
		Gorillimp: {
			location: "All",
			attack: 0.9,
			health: 1.1,
			fast: true
		},
		Shrimp: {
			location: "Sea",
			attack: 0.8,
			health: 0.9,
			fast: true
		},
		Mountimp: {
			location: "Mountain",
			attack: 0.5,
			health: 2,
			fast: false
		},
		Frimp: {
			location: "Forest",
			attack: 0.75,
			health: 1.2,
			fast: true
		},
		Chickimp: {
			location: "Sea",
			attack: 0.8,
			health: 1.1,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("food", .5, level, true);
				message("<span class='glyphicon glyphicon-apple'></span>Dieses Chickimp hinterlässt " + prettify(amt) + " food!", "Loot");
			}
		},
		Onoudidimp: {
			location: "Mountain",
			attack: 0.8,
			health: 1.4,
			fast: false
		},
		Grimp: {
			location: "Forest",
			attack: 1.1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("wood", .5, level, true);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>Der Grimp hinerlässt " + prettify(amt) + " wood!", "Loot");
			}
		},
		Seirimp: {
			location: "Mountain",
			attack: 1.15,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .5, level, true);
				message("<span class='glyphicon glyphicon-fire'></span>Die Seirimp hinterlässt " + prettify(amt) + " metal! Neat-O.", "Loot");
			}
		},
		Blimp: {
			location: "World",
			last: true,
			world: 5,
			attack: 1.2,
			health: 2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 2, level);
				rewardResource("wood", 2, level);
				rewardResource("metal", 2, level);
				message("<span class='glyphicon glyphicon-piggy-bank'></span>That Blimp dropped " + prettify(amt) + " Food, Wood and Metal! That should be useful.", "Loot");
				if (game.global.portalActive){
					amt = rewardResource("helium", 1, level);
					message("<span class='glyphicon glyphicon-oil'></span>Wir können " + prettify(amt) + " Helium Kanisters aus diesem Blimp gewinnen!", "Story"); 
				}
			}
		},
		Megablimp: {
			location: "Hell",
			last: true,
			world: 20,
			attack: 1.1,
			health: 4,
			fast: false,
		},
		Dragimp: {
			location: "World",
			world: 17,
			attack: 1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("gems", .05, level, false);
				message("<span class='glyphicon glyphicon-certificate'></span>That Dragimp dropped " + prettify(amt) + " gems!", "Loot");
			}
		},
		Mitschimp: {
			location: "Block",
			last: true,
			world: 10,
			attack: 1.2,
			health: 2.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("wood", 2, level, true);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>Mitschimp dropped " + prettify(amt) + " wood!", "Loot");
			}
		},
	},
	
	mapConfig: {
		names: {
			prefix: ["Whispering", "Sandy", "Little", "Big", "Rancid", "Tired", "Laughing", "Weeping", "Windy", "Terrible", "Nasty", "Dirty", 
			"Red", "Black", "Singing", "Fiery", "Rocky", "Haunted", "Forgotten", "Miserable", "Cursed", "Tainted", "Blessed", "Sacred", 
			"Abandoned", "Natural", "Enchanted", "Magical", "Calm", "Rugged", "Violent", "Weird", "Secret", "Forbidden", "Bewitched", 
			"Dark", "Light", "Magnificent", "Evil", "Holy", "Hallowed", "Desecrated", "Silent", "Eternal", "Underground", "Temperate", "Chilly", 
			"Muddy", "Dank", "Steamy", "Humid", "Dry", "Putrid", "Foul", "Dangerous", "Marred", "Blighted", "Crystal", "Frozen", "Simple", "Timeless"],
			
			suffix: ["Creek.Sea", "Coast.Sea", "Swamp.Sea", "Forest.Forest", "Mountain.Mountain", "Pass", "Way", "Plains", "Beach.Sea", "Hill.Mountain", "Gorge", "Valley", "Road", "Turn", 
			"Lift", "Peak.Mountain", "Canyon", "Plateau.Mountain", "Crag", "Crater", "Flats", "Oaks.Forest",  "Pit", "Volcano.Mountain", "Glacier.Sea",  "Cavern.Sea", "Cave",  "Nest", "Fork", "Tundra", 
			"Sea.Sea", "Ocean.Sea", "Lake.Sea", "Jungle.Forest", "Island.Sea", "Ruins", "Temple", "Bog.Sea", "Path", "Clearing", "Grove.Forest", "Jungle.Forest", "Thicket.Forest", "Woods.Forest",
			"Oasis.Forest"]
		},
		locations: {
			Sea: {
				resourceType: "Food",
			},
			Mountain: {
				resourceType: "Metal",
			},
			Forest: {
				resourceType: "Wood",
			},
			Hell: {
				resourceType: "Metal",
				upgrade: "Portal",
			},
			Block: {
				resourceType: "Wood",
				upgrade: "Shieldblock",
			},
			Wall: {
				resourceType: "Food",
				upgrade: "Bounty",
			},
			All: {
				resourceType: "Metal",
			},
		
		},
		sizeBase: 50,
		sizeRange: 25,
		difficultyBase: 1.2,
		difficultyRange: 0.45,
		lootBase: 1.3,
		lootRange: 0.3
	},
	
	mapUnlocks: {
	 	Portal: {
			world: 20,
			level: "last",
			icon: "repeat",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				message("Du hast grad das Megaviech gekillt. Erzähl da jar keinem. Als er in die unendlichkeit zerschmeltzt, bemerkst du eine grüne, seltsame Box auf dem Boden. Auf der Box stehen in kleinen Buchstaben etwas geschrieben. Als du näher kommst erkennst du die Worte TIME MASCHINE, THIS SIDE UP'", "Story");
				game.global.portalActive = true;
				fadeIn("helium", 10);
				game.resources.helium.owned += 30;
				message("<span class='glyphicon glyphicon-oil'></span>Wir haben 30 Helium aus dem Blimp extrahieren können und wissen nun wie das geht.", "Story"); 
				fadeIn("portalBtn", 10);
			}
		},
		Shieldblock: {
			world: 10,
			message: "Das Ding hat ein Buch hinterlassen. Sieht nach einem gewöndlichen Buch aus. Aber irgendwie Blockig",
			level: "last",
			icon: "book",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Shieldblock");
			}
		},
		Bounty: {
			world: 15,
			message: "Golden Verziehrt. Nie gesehen.",
			level: "last",
			icon: "book",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Bounty");
			}
		
		},
		Supershield: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 1,
			fire: function () {
				unlockUpgrade("Supershield");
			}
		},
		Dagadder: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 1,
			fire: function () {
				unlockUpgrade("Dagadder");
			}
		},
		Bootboost: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 1,
			fire: function () {
				unlockUpgrade("Bootboost");
			}
		},
		Megamace: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 2,
			fire: function () {
				unlockUpgrade("Megamace");
			}
		},
		Hellishmet: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 2,
			fire: function () {
				unlockUpgrade("Hellishmet");
			}
		},		
		Polierarm: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 3,
			fire: function () {
				unlockUpgrade("Polierarm");
			}
		},
		Pantastic: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 3,
			fire: function () {
				unlockUpgrade("Pantastic");
			}
		},
		Axeidic: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 4,
			fire: function () {
				unlockUpgrade("Axeidic");
			}
		},
		Smoldershoulder: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 4,
			fire: function () {
				unlockUpgrade("Smoldershoulder");
			}
		},
		Greatersword: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 5,
			fire: function () {
				unlockUpgrade("Greatersword");
			}
		},
		Bestplate: {
			world: -1,
			message: "Ich denke, dieses Buch wird mir sagen, wie ich Dinge Upgraden kann",
			level: "last",
			icon: "book",
			last: 5,
			fire: function () {
				unlockUpgrade("Bestplate");
			}
		},
		TheBlock: {
			world: -1,
			message: "Holy Cowimp! Eine einzigartige Map",
			level: [10, 20],
			icon: "th-large",
			startAt: 10,
			canRunOnce: true,
			specialFilter: function () {
				return (game.equipment.Shield.prestige >= 3) ? true : false;
			},
			fire: function () {
				game.global.mapsOwned++;
				game.global.totalMapsEarned++;
				game.global.mapsOwnedArray.push({
					id: "map" + game.global.totalMapsEarned,
					name: "The Block",
					location: "Block",
					clears: 0,
					level: 10,
					difficulty: 1.5,
					size: 100,
					loot: 2,
					noRecycle: true,
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("Du hast den Block geschafft", "Notices");
			}
		},
		TheWall: {
			world: -1,
			message: "Eine andere Map",
			level: [10, 20],
			icon: "th-large",
			startAt: 15,
			canRunOnce: true,
			fire: function () {
				game.global.mapsOwned++;
				game.global.totalMapsEarned++;
				game.global.mapsOwnedArray.push({
					id: "map" + game.global.totalMapsEarned,
					name: "The Wall",
					location: "Wall",
					clears: 0,
					level: 15,
					difficulty: 1.5,
					size: 100,
					loot: 1.5,
					noRecycle: true,
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("Du hast die Wall geschafft", "Loot", "th-large");
			}
		},
		
		Mansion: {
			world: -1,
			startAt: 8,
			message: "Du hast Pläne für ein Haus gefunden. Die Trimps werden glücklich sein",
			level: [10, 20],
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Mansion");
			}
		},
		Hotel: {
			world: -1,
			startAt: 14,
			message: "Du hast beim Plan für das Haus auf der Rückseite einen Plan für ein Hotel gefunden",
			level: [10, 20],
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Hotel");
			}
		},
 		UberHotel: {
			world: -1,
			startAt: 40,
			message: "Du hast ein Plan für ein noch grösseres Hotel gefunden",
			level: [5, 10],
			icon: "book",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHotel");
			}
		}, 
		Resort: {
			world: -1,
			startAt: 25,
			message: "Lass uns ein Resort gründen",
			level: [10, 20],
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Resort");
			}
		},
		Gateway: {
			world: -1,
			startAt: 30,
			message: "Du hast den Schlüssel für die Misteriöse Tür gefunden. Dahinter verbirgt sich Dimension ZZZ!",
			level: [10, 20],
			icon: "cog",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Gateway");
			}
		},
		
		Wormhole: {
			world: -1,
			startAt: 35,
			message: "Du hast überreste von Cern gefunden. Lass uns wurmlöcher kreiren",
			level: [10, 20],
			icon: "link",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Wormhole");
			}
		},
		
		Trapstorm: {
			world: -1,
			startAt: 10,
			message: "Ein Buch, was irgendwas macht. Bücher sind cool.",
			level: [5, 15],
			icon: "book",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Trapstorm");
			}	
		},
/* 		UberResort: {
			world: 40,
			message: "You found a book that will teach you how to improve your resorts!",
			level: "last",
			icon: "book",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberResort");
			}
		}, */
		gems: {
			world: -1,
			level: [0, 7],
			icon: "certificate",
			repeat: 5,
			fire: function (level) {
				var amt = rewardResource("gems", .15, level, true);
				message("<span class='glyphicon glyphicon-certificate'></span>You found " + prettify(amt) + " gems! Terrific!", "Loot");
			}
		},
		Metal: {
			world: -1,
			level: [0, 2],
			icon: "fire",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("metal", .5, level, true);
				message("<span class='glyphicon glyphicon-fire'></span>You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot");
			},
		},
		Food: {
			world: -1,
			level: [0, 2],
			icon: "apple",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("food", .5, level, true);
				message("<span class='glyphicon glyphicon-apple'></span>That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot");
			}
		},
		Wood: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("wood", .5, level, true);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot");
			}
		},

	},

	//if you put a function in here as fire, you won't have anything unlocked, the name is just for funsies
	//-1 is all worlds, -2 is even world numbers, -3 is odd world numbers, -5 is every 5th world
	//min is inclusive, max is exclusive. too lazy to fix
	//More important stuff should be towards the top in case of bailouts
	worldUnlocks: {
		Shield: {
			message: "Lass uns ein Schild machen aus Holz. Besser als nichts.",
			world: 1,
			title: "New Armor",
			level: 4,
			icon: "question-sign"		
		},
		Boots: {
			message: "Du hast Pläne gefunden",
			world: 1,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Dagger: {
			message: "Du hast Pläne gefunden",
			world: 1,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Mace: {
			message: "Du hast Pläne gefunden",
			world: 2,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Helmet: {
			message: "Du hast Pläne gefunden",
			world: 2,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Polearm: {
			message: "Du hast Pläne gefunden",
			world: 3,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Pants: {
			message: "Du hast Pläne gefunden",
			world: 3,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Battleaxe: {
			message: "Du hast Pläne gefunden",
			world: 4,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Shoulderguards: {
			message: "Du hast Pläne gefunden",
			world: 4,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Greatsword: {
			message: "Du hast Pläne gefunden",
			world: 5,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Breastplate: {
			message: "Du hast Pläne gefunden",
			world: 5,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		//Non Equipment
		Bloodlust: {
			message: "Du hast Pläne gefunden",
			world: 1,
			level: 9,
			icon: "book",
			title: "Bloodlust",
			fire: function() {
				unlockUpgrade("Bloodlust");
			}
		},
		Efficiency: {
			message: "Du hast Pläne gefunden",
			world: -2,
			level: 9,
			icon: "book",
			title: "Efficiency",
			fire: function() {
				unlockUpgrade("Efficiency");
			}
		},
		Gym: {
			message: "Du hast Pläne gefunden",
			world: 2,
			level: 4,
			icon: "home",
			title: "New Building",
			fire: function() {
				unlockBuilding("Gym");
				document.getElementById("blockDiv").style.visibility = "visible";
			}
		},
		TrainTacular: {
			message: "Trainerpläne? WTF",
			world: -5,
			level: 9,
			icon: "book",
			title: "TrainTacular",
			fire: function () {
				unlockUpgrade("TrainTacular");
			}
		},
 		Potency: {
			message: "Bekannt als Trimpma Sutra wird dieses Buch helfen mehr Trimps zu Generieren",
			world: -5,
			level: 29,
			icon: "book",
			fire: function () {
				unlockUpgrade("Potency");
			}
		}, 
		//19 is for Armor
		Miner: {
			message: "Ein Miningbuch",
			world: 1,
			level: 29,
			icon: "book",
			title: "Miner",
			fire: function () {
				unlockUpgrade("Miners");
			}
		},
		Trainer: {
			message: "Muskeln überall",
			world: 3,
			level: 3, 
			icon: "book",
			title: "Lass uns Trainieren",
			fire: function () {
				unlockUpgrade("Trainers");
			}		
		},
		Scientist: {
			message: "Ein Buch über Einstrimp!",
			world: 1,
			level: 39,
			icon: "book",
			title: "Forscher",
			fire: function () {
				unlockUpgrade("Scientists");
			}
		},
		Speedscience: {
			message: "Schnellwissenschaft?!",
			world: -2,
			level: 39,
			icon: "book",
			title: "Schnellwissenschaft",
			fire: function () {
				unlockUpgrade("Speedscience");
			}
		},
		Explorer: {
			message: "Ein Buch welches den Trimps sagt immer der Nase nachzulaufen. Warum bin ich nicht schon früher drauf gekommen?",
			world: 15,
			level: 39,
			icon: "book",
			title: "Entdecker",
			fire: function () {
				if (game.upgrades.Explorers.allowed === 0) unlockUpgrade("Explorers");
			}
		},
		//49 is for weapon
		Speedfarming:{
			message: "Ein Buch über schnelleren Anbau, direckt aus China",
			world: -1,
			level: 79,
			icon: "book",
			title: "Schnellanbau",
			fire: function () {
				unlockUpgrade("Speedfarming");
			}
		},
		Speedlumber: {
			message: "Ein Buch über Angst und deren Motivation",
			world: -1,
			level: 69,
			icon: "book",
			title: "Schnellhacker",
			fire: function () {
				unlockUpgrade("Speedlumber");
			}
		},
		Speedminer: {
			message: "Cool text hier einfügen",
			world: -1,
			level: 59,
			icon: "book",
			title: "Schnellminer",
			fire: function() {
				unlockUpgrade("Speedminer");
			}
		},
		Foreman: {
			message: "Du hast einen begabteren Trimp gefunden der bauen kann.",
			world: -1,
			level: 89,
			icon: "user",
			title: "Foreman",
			fire: function () {
				game.global.autoCraftModifier += 0.25;
				document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
			}
		},
/* 		Producer: {
			message: "You found a crazy rare book about how to get the absolute most out of your trimps.",
			world: 6,
			level: 19,
			icon: "book",
			title: "Producer",
			fire: function () {
				unlockUpgrade('Producer');
			}
		}, */
		Anger: {
			world: 20,
			level: 99,
			icon: "eye-open",
			title: "The End Of The Road",
			fire: function () {
				message(	"Du findest einen grünnen Diamant", "Story");
				unlockUpgrade("Anger");
			}
		},
		Coordination: {
			message: "Sei stark",
			world: -1,
			level: 99,
			icon: "book",
			title: "Fitness",
			fire: function() {
				unlockUpgrade("Coordination");
			}
		},
		Blockmaster: {
			message: "Du findest ein Buch über besseres Blocken",
			world: 4,
			level: 29,
			icon: "book",
			title: "Blockmaster",
			fire: function () {
				unlockUpgrade("Blockmaster");
			}
		},
		Egg: {
			message: "Ein seltsames Ei. Was soll ich damit bloss anfangen",
			world: 17,
			level: 55,
			icon: "record",
			title: "Egg",
			fire: function () {
				if (game.upgrades.Egg.allowed === 0) unlockUpgrade("Egg");
			}
		},
		FirstMap: {
			world: 6,
			level: [1, 5],
			icon: "th-large",
			fire: function () {
				game.global.mapsUnlocked = true;
				unlockMapStuff();
				createMap();
				message("Eine Map, mal schauen.", "Story");
			}
		},
		//Multiples
		Map: {
			world: -1,
			startAt: 6,
			level: [0, 20],
			repeat: 10,
			icon: "th",
			fire: function() {
				var amt = rewardResource("fragments");
				message("<span class='glyphicon glyphicon-th'></span>Du findest " + prettify(amt) + " map Fragmente!", "Loot");
			}
		},
		//portal Trumps
		fiveTrimpMax: {
			world: -1,
			level: [10, 20],
			icon: "gift",
			repeat: 45,
			fire: function () {
				var amt = 5 + (game.portal.Trumps.modifier * game.portal.Trumps.level);
				game.resources.trimps.max += amt;
				message("<span class='glyphicon glyphicon-gift'></span>Du hast genug LAnd für " + amt + " mehr Trimps!", "Loot");
			}
		},
		fruit: {
			world: -1,
			level: [0, 4],
			icon: "apple",
			repeat: 9,
			fire: function (level) {
				var amt = rewardResource("food", .5, level);
				message("<span class='glyphicon glyphicon-apple'></span>Der Typ lässt " + prettify(amt) + " Essen auf dem Boden. Sweet!", "Loot");
			}
		},
		groundLumber: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			repeat: 8,
			fire: function (level) {
				var amt = rewardResource("wood", .5, level);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>DU findest " + prettify(amt) + " Holz! Cool!", "Loot");
			}
		},
		freeMetals: {
			world: -1,
			level: [3, 5],
			icon: "fire",
			repeat: 6,
			fire: function (level) {
				var amt = rewardResource("metal", 0.5, level);
				message("<span class='glyphicon glyphicon-fire'></span>Es hat " + prettify(amt) + " Metallbaren auf dem Boden! Woher das bloss kommt!", "Loot");
			}
		}
	},
	//buildings with percent = true cannot have multiple purchases at a time
	buildings: {
		Trap: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 5,
			tooltip: "Jede Falle erlaubt dir etwas zu fangen",
			cost: {
				food: 10,
				wood: 10
			},
			first: function () {
				if (document.getElementById("trimps").style.visibility == "hidden") fadeIn("trimps", 10);
			}
		},
		Hut: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Es hat Raum für $incby$ mehr Trimps. Männer (50%) arbeiten, der Rest produziert nachschub fürs Schlachtfeld.",
			cost: {
				food: [125, 1.24],
				wood: [75, 1.24],
			},
			increase: {
				what: "trimps.max",
				by: 3
			}
		},
		Barn: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "100% mehr Platz für Essen",
			percent: true,
			cost: {
				food: function () {
					return calculatePercentageBuildingCost("Barn", "food", .25);
				},
			},
			increase: {
				what: "food.max.mult",
				by: 2
			}
		},
		Shed: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "100% mehr Platz für Holz",
			cost: {
				wood: function () {
					return calculatePercentageBuildingCost("Shed", "wood", .25);
				}
			},
			increase: {
				what: "wood.max.mult",
				by: 2
			}
		},
		Forge: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "100% mehr Platz für Metall",
			cost: {
				metal: function () {
					return calculatePercentageBuildingCost("Forge", "metal", .25);
				}
			},
			increase: {
				what: "metal.max.mult",
				by: 2
			}
		},
		Gym: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			tooltip: "Ein Gebäude um zu trainieren. Trimps können nachher $incby$ Schaden mehr Blocken.",
			cost: {
				wood: [400, 1.185]
			},
			increase: {
			what: "global.block",
			by: 4
			}
		},
		House: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			tooltip: "EIn Haus für Trimps. Es hat Platz für $incby$ mehr Trimps.",
			cost: {
				food: [1500, 1.22],
				wood: [750, 1.22],
				metal: [150, 1.22]
			},
			increase: {
				what: "trimps.max",
				by: 5
			}
		},
		Mansion: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 60,
			tooltip: "Ein Haus, welches es erlaubt $incby$ mehr Trimps zu haben.",
			cost: {
				gems: [100, 1.2],
				wood: [2000, 1.2],
				metal: [500, 1.2],
				food: [3000, 1.2],
			},
			increase: {
				what: "trimps.max",
				by: 10
			}
		},
		Hotel: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			tooltip: "Ein Hotel, welches Platz für $incby$ Trimps hat.",
			cost: {
				gems: [2000, 1.18],
				wood: [12000, 1.18],
				metal: [5000, 1.18],
				food: [10000, 1.18],
			},
			increase: {
				what: "trimps.max",
				by: 20
			}
		},
		Resort: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 240,
			tooltip: "EIn Resort mit Platz für $incby$ Trimps.",
			cost: {
				gems: [20000, 1.16],
				wood: [120000, 1.16],
				metal: [50000, 1.16],
				food: [100000, 1.16],
			},
			increase: {
				what: "trimps.max",
				by: 40
			}
		},
		Gateway: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 480,
			tooltip: "Wer weiss schon wo sie genau sind, aber sie scheinen sich da wohl zu fühlen. Platz für $incby$ mehr Trimps.",
			cost: {
				fragments: [3000, 1.14],
				gems: [20000, 1.14],
				metal: [75000, 1.14]
			},
			increase: {
				what: "trimps.max",
				by: 100
			}
		},
		Wormhole: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 600,
			tooltip: "Schickenwir sie ins Wurmloch, hat sicher genug Platz für $incby$ Trimps.",
			cost: {
				helium: [13, 1.075],
				metal: [100000, 1.1]
			},
			increase:{
				what: "trimps.max",
				by: 500
			}
		},		
		Tribute: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			tooltip: "Bessere Werkzeuge zum abbauen von Diamanten. Verschnellert um 5%.",
			cost: {
				food: [10000, 1.05]
			},
			increase: {
				what: "Dragimp.modifier.mult",
				by: 1.05,
			}
		},
	},

	jobs: {
		Farmer: {
			locked: 1,
			owned: 0,
			tooltip: "Trainiere die Farmer, giebt $modifier$ Essen pro sekunde",
			cost: {
				food: [5, 1.0]
			},
			increase: "food",
			modifier: 0.5
		},
		Lumberjack: {
			locked: 1,
			owned: 0,
			tooltip: "Zeige den Trimps wie man Bäume hackt. Sie produzieren nachher $modifier$ Holz pro Sekunde.",
			cost: {
				food: [5, 1.0]
			},
			increase: "wood",
			modifier: 0.5
		},
		Miner: {
			locked: 1,
			owned: 0,
			tooltip: "Sende den Trimps ein Foto vom Schlachtefeld. Wer nicht mehr Arbeitet wird da hin geschickt. Die Trumps produzieren $modifier$ Metallbaren pro Sekunde",
			cost: {
				food: [20, 1.0],
			},
			increase: "metal",
			modifier: 0.5
		},
		Scientist: {
			locked: 1,
			owned: 0,
			tooltip: "Es hat einige Versuche gebraucht, doch nun forschen die Forscher $modifier$ Einheiten rheine FOrschung für dich.",
			cost: {
				food: [100, 1.0]
			},
			increase: "science",
			modifier: 0.5
		},
		Trainer: {
			locked: 1,
			owned: 0,
			tooltip: "Jeder Trainer hillft um $modifier$% mehr zu Blocken",
			cost: {
				food: [750, 1.1]
			},
			increase: "custom",
			modifier: 20
		},
		Explorer: {
			locked: 1,
			owned: 0,
			tooltip: "Jeder Entdecker findet $modifier$ Fragmente pro sekunde.",
			cost: {
				food: [15000, 1.1]
			},
			increase: "fragments",
			modifier: .1
		},
		Dragimp: {
			locked: 1,
			owned: 0,
			increase: "gems",
			modifier: .5,
		}
	},
	
	upgrades: {
		Battle: {
			locked: 1,
			tooltip: "Herausfinden, wie die Trumps kämpfen können",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 10
				}
			},
			fire: function () {
				fadeIn("equipmentTitleDiv", 10);
				fadeIn("equipmentTab", 10);
				fadeIn("battleContainer", 10);
				buildGrid();
				drawGrid();
				game.global.BattleClock = -1;
				fadeIn("metal", 10);
			}
		},
		Bloodlust: {
			locked: 1,
			tooltip: "Dieses Buch lernt die Trimps selbstständig zu Kämpfen",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 60,
					food: 150
				}
			},
			fire: function () {
				game.global.autoBattle = true;
				document.getElementById("pauseFight").style.visibility = "visible";
			}
		},
		Bounty: {
			locked: 1,
			tooltip: "Alles sind nun doppelt so Produktiv",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [40000, 2],
					food: [100000, 2],
					wood: [100000, 2],
					metal: [100000, 2]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier *= 2;
				game.jobs.Lumberjack.modifier *= 2;
				game.jobs.Miner.modifier *= 2;
				game.jobs.Scientist.modifier *= 2;
				game.jobs.Explorer.modifier *= 2;
				
			}
		},
		Coordination: {
			locked: 1,
			tooltip: "Dieses Buch hilft dir zu erklären, wie man Trimps beibringt mit anderen zusammen zu kämpfen, ohne sich gegenseitig abzumurksen. Truppenstärke erhöht sich um 25%",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [250, 1.3],
					food: [600, 1.3],
					wood: [600, 1.3],
					metal: [300, 1.3]
				}
			},
			fire: function () {
				game.resources.trimps.maxSoldiers = Math.ceil(1.25 * game.resources.trimps.maxSoldiers);
			}
		},
		Blockmaster: {
			locked: 1,
			allowed: 0,
			tooltip: "Gym's sind jetzt um 50% härter.",
			done: 0,
			cost: {
				resources: {
					science: [750, 1.17],
					food: [2000, 1.17],
					metal: [1000, 1.17]
				}
			},
			fire: function () {
				game.global.block = Math.ceil(1.5 * game.global.block);
				game.buildings.Gym.increase.by = Math.ceil(1.5 * game.buildings.Gym.increase.by);
			}
		},
		Blockbetter: {
			locked: 1,
			allowed: 0,
			tooltip: "Gym's sind jetzt um 50% härter.",
			done: 0,
			cost: {
				resources: {
					science: [750, 1.1],
					food: [2000, 1.1],
					metal: [1000, 1.1]
				}
			},
			fire: function () {
				game.global.block = Math.ceil(2 * game.global.block);
				game.buildings.Gym.increase.by = Math.ceil(2 * game.buildings.Gym.increase.by);
			}
		},
		Miners: {
			locked: 1,
			tooltip: "Du magst keine Bücher, aber noch viel weniger willst du selber Minen",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 60,
					wood: 300,
					metal: 100
				}
			},
			fire: function () {
				unlockJob("Miner");
			}
		},
		Trainers: {
			locked: 1,
			tooltip: "Warum nicht den Trimps zeigen wie man Trimps trainiert?",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 500,
					food: 1000
				}
			},
			fire: function () {
				unlockJob("Trainer");
			}
		},
		Scientists: {
			locked: 1,
			tooltip: "Trimps als forscher? NIemals, oder doch?",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 100,
					food: 350
				}
			},
			fire: function () {
				unlockJob("Scientist");
			}			
		},
		Explorers: {
			locked: 1,
			tooltip: "Immer der Nase nach. Wenn ihr ein Fragment findest, umkehren um 180 Grad und dann immer der Nase nach.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 50000,
					fragments: 5,
				}
			},
			fire: function () {
				unlockJob("Explorer");
				fadeIn("fragmentsPs", 10);
			}
		},
		Speedlumber: {
			locked: 1,
			allowed: 0,
			tooltip: "DIeses Buch wird den Trimps helfen Bäume schneller zu hacken",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					wood: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Lumberjack.modifier = (game.jobs.Lumberjack.modifier * 1.25).toFixed(2);
			}			
		},
		Speedfarming: {
			locked: 1,
			allowed: 0,
			tooltip: "Dieses Buch hilft mehr zu Farmen",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					food: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier = (game.jobs.Farmer.modifier * 1.25).toFixed(2);
			}			
		},
		Speedminer: {
			locked: 1,
			allowed: 0,
			tooltip: "Dieses Buch hilft beim Minen",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					metal: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Miner.modifier = (game.jobs.Miner.modifier * 1.25).toFixed(2);
			}			
		},
		Speedscience: {
			locked: 1,
			allowed: 0,
			tooltip: "Dieses Buch hilft schneller zu Forschen",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.4]
				}
			},
			fire: function () {
				game.jobs.Scientist.modifier = (game.jobs.Scientist.modifier * 1.25).toFixed(2);
			}			
		},
		Efficiency: {
			locked: 1,
			allowed: 0,
			tooltip: "Dieses Buch hilft <b>dir</b> Produktiver zu sein",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.25],
					food: [400, 1.2],
					wood: [400, 1.2],
					metal: [400, 1.2]
				}
			},
			fire: function () {
				game.global.playerModifier *= 2;
			}			
		},
		Potency: {
			locked: 1,
			allowed: 0,
			tooltip: "Dieses Buch verbietet Kondome, somit wird es 10% mehr Babys geben",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.4],
					wood: [4000, 1.4],
				}
			},
			fire: function () {
				game.resources.trimps.potency *= 1.1;
			}
		},
	UberHotel: {
			locked: 1,
			allowed: 0,
			tooltip: "Doppelter Platz in Hottels durch stapeln? Klingt interessant",
			done: 0,
			cost: {
				resources: {
					science: [300000, 1.15],
					food: [20000000, 1.1],
					metal: [10000000, 1.1]
				}
			},
			fire: function () {
				game.resources.trimps.max += ((game.buildings.Hotel.owned) * game.buildings.Hotel.increase.by);
				game.buildings.Hotel.increase.by *= 2;
			}
		},/* 	
		UberResort: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the space gained from each Resort by 2x",
			done: 0,
			cost: {
				resources: {
					science: [30000, 1.15],
					food: [2000000, 1.1],
					metal: [1000000, 1.1]
				}
			},
			fire: function () {
				game.resources.trimps.max += ((game.buildings.Resort.owned * 2) * game.buildings.Resort.increase.by);
				game.buildings.Resort.increase.by *= 2;
			}
		}, */
		Anger: {
			locked: 1,
			allowed: 0,
			tooltip: "Hier fehlt noch text sevi",
			done: 0,
			cost: {
				resources: {
					science: 100000,
					fragments: 15
				}
			},
			fire: function () {
				game.global.mapsOwned++;
				game.global.totalMapsEarned++;
				game.global.mapsOwnedArray.push({
					id: "map" + game.global.totalMapsEarned,
					name: "Dimension of Anger",
					location: "Hell",
					clears: 0,
					level: 20,
					difficulty: 2.5,
					size: 100,
					loot: 3,
					noRecycle: true,
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("Hier fehlt noch text sevi", "Notices");
			}
		},
		Egg: {
			locked: 1,
			allowed: 0,
			tooltip: "Hier fehlt noch text sevi, mach hier irgendwas mit dias rein",
			done: 0,
			cost: {
				resources: {
					gems: 10000,
				}
			},
			fire: function () {
				game.jobs.Dragimp.owned = 1;
				fadeIn("gemsPs", 10);
				unlockBuilding("Tribute");
			}
		},
/* 		Producer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book explains some low-stress methods for getting your Trimps to work harder. Low-stress for you, of course. Doubles the rate at which Farmers, Lumberjacks and Miners gather resources.",
			done: 0,
			cost: {
				resources: {
					science: [1500, 1.2],
					food: [5000, 1.2],
					wood: [5000, 1.2],
					metal: [5000, 1.2]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier *= 2;
				game.jobs.Miner.modifier *= 2;
				game.jobs.Lumberjack.modifier *= 2;
			}
		}, */
		Shieldblock: {
			locked: 1,
			allowed: 0,
			tooltip: "Schildblock bla bla bla",
			done: 0,
			cost: {
				resources: {
					science: 3000,
					wood: 10000,
				}
			},
			fire: function () {
			var equipment = game.equipment.Shield;
				prestigeEquipment("Shield", false, true);
				
				equipment.blockNow = true;
				equipment.tooltip = game.equipment.Shield.blocktip;
			    equipment.blockCalculated = Math.round(equipment.block * Math.pow(1.19, ((equipment.prestige - 1) * game.global.prestige.block) + 1));
/* 				cost[0] = Math.round(equipment.oc * Math.pow(1.069, ((equipment.prestige - 1) * game.global.prestige.cost) + 1));
				cost.lastCheckAmount = null;
				cost.lastCheckCount = null;
				cost.lastCheckOwned = null; */
				
			}
		},
		Trapstorm: {
			locked: 1,
			allowed: 0,
			tooltip: "Dieses Buch lernt wie man nicht nur Blöd herumsitzt, sondern Produktiv ist. Sie bauen automatisch Fallen",
			done: 0,
			cost: {
				resources: {
					science: 10000,
					wood: 100000,
					food: 100000,
				}
			},
			fire: function () {
				game.global.trapBuildAllowed = true;
				fadeIn("autoTrapBtn", 10);
			}
		},
		
		
		
		
		
		//Equipment upgrades

		TrainTacular: {
			locked: 1,
			allowed: 0,
			tooltip: "Erhöht den Block von Trainern um 5%!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.7],
					food: [2000, 1.7],
					wood: [3000, 1.7],
					metal: [2000, 1.7]
				}
			},
			fire: function () {
				game.jobs.Trainer.modifier = Math.ceil(game.jobs.Trainer.modifier += 5);
			}
		},
		Supershield: {
			locked: 1,
			allowed: 0,
			tooltip: "Zerstöre alle Schilde und mache bessere, neuere. @",
			done: 0,
			cost: {
				resources: {
					science: [1200, 1.7],
					gems: [40, 3]
				}
			},
			prestiges: "Shield",
			fire: function () {
				prestigeEquipment("Shield");
			}
		},
		Dagadder: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1250, 1.7],
					gems: [60, 3]
				}
			},
			prestiges: "Dagger",
			fire: function () {
				prestigeEquipment("Dagger");
			}
		},
		Bootboost: {
			locked: 1,
			allowed: 0,
			tooltip: "RAlles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1300, 1.7],
					gems: [70, 3]
				}
			},
			prestiges: "Boots",
			fire: function () {
				prestigeEquipment("Boots");
			}
		},
		Megamace: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1400, 1.7],
					gems: [100, 3]
				}
			},
			prestiges: "Mace",
			fire: function () {
				prestigeEquipment("Mace");
			}
		},
		Hellishmet: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1450, 1.7],
					gems: [150, 3]
				}
			},
			prestiges: "Helmet",
			fire: function () {
				prestigeEquipment("Helmet");
			}
		},
		Polierarm: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1550, 1.7],
					gems: [225, 3]
				}
			},
			prestiges: "Polearm",
			fire: function () {
				prestigeEquipment("Polearm");
			}
		},
		Pantastic: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1600, 1.7],
					gems: [275, 3]
				}
			},
			prestiges: "Pants",
			fire: function () {
				prestigeEquipment("Pants");
			}
		},
		Axeidic: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1700, 1.7],
					gems: [400, 3]
				}
			},
			prestiges: "Battleaxe",
			fire: function () {
				prestigeEquipment("Battleaxe");
			}
		},
		Smoldershoulder: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1750, 1.7],
					gems: [525, 3]
				}
			},
			prestiges: "Shoulderguards",
			fire: function () {
				prestigeEquipment("Shoulderguards");
			}
		},
		Greatersword: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen @",
			done: 0,
			cost: {
				resources: {
					science: [1850, 1.7],
					gems: [650, 3]
				}
			},
			prestiges: "Greatsword",
			fire: function () {
				prestigeEquipment("Greatsword");
			}
		},
		Bestplate: {
			locked: 1,
			allowed: 0,
			tooltip: "Alles Zerstören und neue, bessere machen" @",
			done: 0,
			cost: {
				resources: {
					science: [1900, 1.7],
					gems: [800, 3]
				}
			},
			prestiges: "Breastplate",
			fire: function () {
				prestigeEquipment("Breastplate");
			}
		}
	},

	triggers: {
		Trap: {
			done: 0,
			message: "Alles Zerstören und neue, bessere machen",
			cost: {
				resources: {
					food: 5,
					wood: 5
				}
			},
			fire: function () {
				fadeIn("buyCol", 10);
				unlockBuilding("Trap");
			}
		},
		wood: {
			done: 0,
			message: "Du wirst Holz brauchen um Dinge zu bauen",
			cost: {
				resources: {
					food: 5
				}
			},
			fire: function () {
				fadeIn("wood", 10);
				
			}
		},
		Barn: {
			done: 0,
			message: "Das Essenslager ist voll, wir sollten über eine Vergrösserung von (Du-weisst-schon-was) nachdenken",
			cost: {
				resources: {
					food: 350
				}
			},
			fire: function () {
				unlockBuilding("Barn");
			}
		},
		Shed: {
			done: 0,
			message: "Das Holzlager ist voll, wir sollten über eine Vergrösserung von (Du-weisst-schon-was) nachdenken",
			cost: {
				resources: {
					wood: 350
				}
			},
			fire: function () {
				unlockBuilding("Shed");
			}
		},
		Forge: {
			done: 0,
			message: "Das Metalllager ist voll, wir sollten über eine Vergrösserung von (Du-weisst-schon-was) nachdenken",
			cost: {
				resources: {
					metal: 350
				}
			},
			fire: function () {
				unlockBuilding("Forge");
			}
		},
		jobs: {
			done: 0,
			message: "Es ist ein Komisches wesen in der Falle. Ich nenne es Trimp. Es hat sicher noch mehr.",
			cost: {
				resources: {
					trimps: 1
				}
			},
			fire: function () {
				fadeIn("jobsTab", 10);
				document.getElementById("trimpTitle").innerHTML = "Trimps";
				document.getElementById("empHide").style.visibility = "visible";
				unlockJob("Farmer");
				document.getElementById("jobsTitleDiv").style.display = "block";
				game.global.menu.jobs = true;
			}
		},
		Lumberjack: {
			done: 0,
			cost: {
				jobs: {
					Farmer: 1
				}
			},
			fire: function () {
				unlockJob("Lumberjack");
			}
		},
		upgrades: {
			done: 0,
			message: "Dieser Planet sieht gemütlich aus. Vielleicht sollte ich ihn erforschen.",
			cost: {
				resources: {
					trimps: 2,
					food: 15
				}
			},
			fire: function () {
				fadeIn("upgradesTab", 10);
				fadeIn("science", 10);
				document.getElementById("upgradesTitleDiv").style.display = "block";
				game.global.menu.upgrades = true;
			}
		},
		Battle: {
			done: 0,
			once: function() {document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";},
			message: "Krieg? Für was ist das gut? Kann man das Essen? Vielleicht brauche ich es zum Erkunden",
			cost: {
				resources: {
					science: 1
				}
			},
			fire: function () {
				unlockUpgrade('Battle');
				document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";
			}
		},
		Hut: {
			done: 0,
			message: "Sieht nicht so aus als hätte jeder Platz. Ich denke wir brauchen mehr Platz",
			cost: {
				resources: {
					trimps: 8
				}
			},
			fire: function () {
				unlockBuilding('Hut');
			}
		},
		House: {
			done: 0,
			message: "Es wird bewölkt, wir sollten uns besser Häuser bauen.",
			cost: {
				resources: {
					trimps: 65
				}
			},
			fire: function () {
				unlockBuilding('House');
			}
		},
		breeding: {
			done: 0,
			message: "Was soll ich sonst mit den weiblichen Trimps machen?",
			cost: {
				special: function () {
					return (game.resources.trimps.owned - game.resources.trimps.employed >= 2) ? true : false;
				}
			},
			fire: function () {
				document.getElementById("unempHide").style.visibility = "visible";
			}
		},
	}
};
return toReturn;
}
var game = newGame();
