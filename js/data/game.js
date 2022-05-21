const game = {
    version: "1.1",
    timeSaved: Date.now(),
    layers: [],
    highestLayer: 0,
    highestUpdatedLayer: 0,
    automators: {
        autoMaxAll: new Automator("Auto Max All", "Automatically buys max on all Layers", () =>
        {
            for(let i = Math.max(0, game.volatility.autoMaxAll.apply().toNumber()); i < game.layers.length; i++)
            {
                game.layers[i].maxAll();
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 2.5) + 1, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.toNumber()) * [0.2, 0.5, 0.8][level.toNumber() % 3]),
            level => level.gt(0) ? Math.pow(0.85, level.toNumber() - 1) * 10 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoPrestige: new Automator("Auto Prestige", "Automatically prestiges all Layers", () =>
        {
            for(let i = 0; i < game.layers.length - 1; i++)
            {
                if(game.layers[game.layers.length - 2].canPrestige() && !game.settings.autoPrestigeHighestLayer)
                {
                    break;
                }
                if(game.layers[i].canPrestige() && !game.layers[i].isNonVolatile())
                {
                    game.layers[i].prestige();
                }
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 1.75) + 2, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * (level.toNumber() % 2 === 0 ? 0.25 : 0.75)),
            level => level.gt(0) ? Math.pow(0.65, level.toNumber() - 1) * 30 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAleph: new Automator("Auto Aleph", "Automatically Max All Aleph Upgrades", () =>
        {
            game.alephLayer.maxAll();
        }, new DynamicLayerUpgrade(level => level + 3, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(3).toNumber()) * 0.7),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 60 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAuto: new Automator("Auto Automators", "Automatically Max All Automators (except this)", () =>
        {
            for(let i = 0; i < game.automators.length - 2; i++)
            {
                game.automators[i].upgrade.buyMax()
            }
        }, new DynamicLayerUpgrade(level => level + 7.5, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(10).toNumber()) * 10),
            level => level.gt(0) ? Math.pow(0.7, level.toNumber() - 1) * 500 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
    },
    volatility: {
        layerVolatility: new DynamicLayerUpgrade(level => level + 1, level => level,
            function()
            {
                return "Make the next Layer non-volatile";
            }, level => Decimal.pow(10.1, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(1).toNumber())), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
        prestigePerSecond: new DynamicLayerUpgrade(level => Math.round(level * 1.3) + 3, level => null,
            () => "Boost the Prestige Reward you get per second",
            function(level)
            {
                const max = PrestigeLayer.getPrestigeCarryOverForLayer(Math.round(level.toNumber() * 1.3) + 3);
                return Decimal.pow(10, new Random(level.toNumber() * 10 + 10).nextDouble() * max).round();
            }, level => new Decimal(0.5 + 0.075 * level), null, {
                getEffectDisplay: effectDisplayTemplates.percentStandard(0)
            }),
        autoMaxAll: new DynamicLayerUpgrade(level => level + 2, level => level,
            function()
            {
                return "The next Layer is maxed automatically each tick";
            }, level => Decimal.pow(10.25, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * 0.125), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
    },
    achievements: [
        new Achievement("Omega Player!", "Start a omega game.", "+1", () => true),
        new Achievement("A exchange for Speed", "Start gaining tokens", "⋙", () => game.alephLayer.isUnlocked()),
        new Achievement("Token HundrOoM", "Have 1e100 speed tokens", "⋙<sub>10</sub>", () => game.alephLayer.aleph.gte("1e100")),
        new Achievement("Not a Omega", "Have 1e303 speed tokens", "⋙<sub>∞</sub>", () => game.alephLayer.aleph.gte("1e303")),
        new Achievement("Upper Tokens", "Have e603 speed tokens. At that point, you would like to go meta.", "⋙<sub>&aleph;</sub>", () => game.alephLayer.aleph.gte("1e603")),
        new Achievement("Stacking up", "Do a restack and restart your progress", "&omega;", () => game.restackLayer.timesReset > 0),
        new Achievement("Reupgrader", "Max all the restacked non-meta upgrades", "↑<sub>↑<sub>↑</sub></sub>", () => (Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(0)).length + Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(1)).length) == 12),
        new Achievement("Idling for Idle Games to Idle Gains", "Buy the meta upgrade", "↑<sub>2<sub>", () => game.restackLayer.metaUpgrade.level.gte(1)),
        new Achievement("The 4th Wall", "Go meta and be reborn", "Δ", () => game.metaLayer.active),
        new Achievement("Restackfinity", "Get 1e308 restacks.", "Re-∞", () => game.restackLayer.layerCoins.gte(1e308)), // Not Implemented
        new Achievement("Meta-Speed", "Advance 1 Layer per second", "»", () => game.metaLayer.getLayersPS().gte(1)),
        new Achievement("Meta-FPS", "Advance 60 Layers per second", "F=L", () => game.metaLayer.getLayersPS().gte(60)),
        new Achievement("That Text is Crazy", "Advance 11111 Layers per second", "TXT", () => game.metaLayer.getLayersPS().gte(11111)),
        new Achievement("Tetra-Speed", "Advance 10 of sequentially, tetrated by 2, Layers per second.", "»»", () => game.metaLayer.getLayersPS().gte(1e10)),
        new Achievement("Layer of Layers", "Reach Layer 2.4e24", "&Omega;<sub>OoML</sub>", () => game.metaLayer.layer.gte("2.4e24")),
        new Achievement("Googologists", "Reach Layer e100", "Ggly", () => game.metaLayer.layer.gte("e100")),
        new Achievement("Endgame", "Reach layer 1.8e308 and finish "+mod.primaryName+mod.secondaryName, "∞", () => game.metaLayer.layer.gte(Infinities[0])),
        new Achievement("Possible?", "Reach layer 1e1000 and truly finish "+mod.primaryName+mod.secondaryName, "&Omega;", () => game.metaLayer.layer.gte("1e1000")),
    ],
    secretAchievements: [
        new Achievement("A very long wait...", "Have a game with over 3 months of time", "...", () => game.timeSpent > 50803200),
        new Achievement("Speed of Pi", "Have πe314 tokens", "⋙<sub>π</sub>", () => game.alephLayer.aleph.gte("3.141e341")),
        new Achievement("Meta sucks!", "Get &Omega; without meta", "&Omega;&Omega;&Omega;&Omega;&Omega;", () => game.highestLayer >= 47 && !game.metaLayer.active),
        new Achievement("Volatility sucks!", "Get &epsilon; without layer volatility upgrade", "&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;", () => game.highestLayer >= 5 && game.volatility.layerVolatility.level.eq(0)),
    ],
    alephLayer: new AlephLayer(),
    restackLayer: new ReStackLayer(),
    metaLayer: new MetaLayer(),
    currentLayer: null,
    currentChallenge: null,
    notifications: [],
    timeSpent: 0,
    settings: {
        tab: "Layers",
        showAllLayers: true,
        showMinLayers: 5,
        showMaxLayers: 5,
        showLayerOrdinals: true,
        layerTickSpeed: 1,
        buyMaxAlways10: true,
        disableBuyMaxOnHighestLayer: false,
        resourceColors: true,
        resourceGlow: true,
        newsTicker: true,
        autoMaxAll: true,
        autoPrestigeHighestLayer: true,
        notifications: true,
        saveNotifications: true,
        confirmations: true,
        offlineProgress: true,
        titleStyle: 2,
        theme: mod.themes[0][1],
        layerNames: mod.layerNames[0][1],
        font: mod.fonts[0][1],
        saveInfo: "i have no idea"
    },
};
const initialGame = functions.getSaveString();
