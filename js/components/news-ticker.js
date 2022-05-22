Vue.component("news-ticker", {
    data: function()
    {
        return {
            messages: [
                "Nerfed mods causes a NG-.",
                "Man, what is a game about normal things but its 3x? This maybe is NG+!",
                "How many layer names i can generate? Probably any of them.",
                "This message is interrupted by a news ticker message. Please tell to the other people to play this game otherwise your not gonna like it. Just kidding!",
                "Pokemon: Gonna catch 'em all! Sorry... where was i?",
                "Infinity",
                "Incrementality necromancer. Eternal meta.",
                "Mega Layers is a Omega Layers rip-off.",
                "Are you gonna mod this game on the Omega Engine?",
                "Wanna mod Omega Layers? Try modding Omega Engine! It's FREE!",
                ":( Your PC ran into a pro",
                "Radians raids radius.",
                "the",
                "Rayquaza.",
                "Kyogre.",
                "Groudon.",
                "Is it possible that Arceus could eat the entire universe with 1000 arms? Or is it creating the universe? I forgot.",
                "Arceus used JUDGEMENT!",
                "This is hell. I can't grind it for so long...",
                "Im'ma tire!",
                "The news ticker made by type the enter key, twice...",
                "Leaf Blower Revolution, Idle Spiral, Idle Pins, Undertale, Cell to Singularity, Doki Doki Literature Club.",
                "The default news ticker has a 'when impostor is sus' being cut because this is a dead meme.",
                "Introducing Eternity! It will eternally make you stuck. - Eternatus",
                "Eternamax Eternatus has the most base so far. Just why!!",
                "My GameCube got expaaaaaaand!!",
                "I broke Wii Music.",
                "Killysunt just broke Wii Sports.",
                "Taeleviisyion raemoet.",
                "What's 3+1? You guessed it! Thirty four, or 3 4 for short.",
                "My Mii is playing trumpet of high sine waves by being corrupted.",
                "-9122025100167521628 skips",
                "If the english subtitles were here and the japanese words was here after english subtitles were done it's gonna be weird.",
                "PlXas selec t3e car+cte>r! - SMB2 Corrupted.",
                "SpongeBob: Alright, let's see here...         Go to work, go to work, go to work, go to work, etc...",
                "Those default news ticker messages... why?!",
                "You have reached your final destination.",
                "Achievement unlocked! Click the news ticker 'here'.",
                "T-Pose You.",
                "I am coding at midnight, which is... uh... i dunno?",
                "At layers 110, you will get tons of restack. Perhaps doing some you will get e100, which means you will get e25 Restack Upgrade, it's so nice to reach it.",
                "The end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never...",
                "I do the mods like TMT Mods, like Research Tree (which is on hiatus) and some mods i can do easily! Just give me some.",
                "Mountain Everest is a MME.",
                "please bro ignor the news please bu",
                "x78yf8eujwnewuoiwqnkifmiasjas;fjrk4 nsewsdjmo - njUIIF,meFJ",
                "[He failed portal]",
                "console.log();",
                "I am funy ant ai like to give ,e some love. I don know. - Urbun299",
                "this.currentMessage = typeof element === 'string'?",
                "Error at line 65 on news-ticker.js: cannot find javaScript.png [-3022]",
                "Hey, game here. I would like to say that you have a nice room here! Also your face is neutral to me.",
                "Hey guys! SuperSpruce here! Today we are gonna to reach Meta in Omega^2 Layers.",
                "I AM ERROR.",
                "if this.newsTicker(shown, 1) { showMessage [ 'you Found this news ticker as a secret!' ] } return null",
                "Pika! -Pikachu",
                "hiuw9iKMKV0Uij3iotl4potk3.;''dsfl;se;fl,gsles,gle4 -Mernil34",
                "Definition of mentions: one: candy, one: candy, restaurant.",
                "This word is randomly generated: " + Utils.createRandomWord(4) +". If the real word is formed in random, consider yourself lucky.",
                Utils.createRandomWord(100) + ", sorry guys my cat just went into my keyboard.",
                "Introducing Monologue Generator 2000! Here's a example: " + Utils.createRandomWord(8) + ", " + Utils.createRandomWord(6) + " " + Utils.createRandomWord(5) + "! - " + Utils.createRandomWord(10),
                "This mod was sponsored by " + Utils.createRandomWord(15) + ". It gives you free access to Aleph as a headstart and with a secret achievement. Just put the code: " + Utils.createRandomWord(25) + ", and you will get the following reward! Only 3 days left!",
                "Super " + Utils.createRandomWord(6) + "Maker!",
                "There are total of 65 news messages in total.",
                "This theory is misspelled and does not work correctly. Thank you for understanding the correct word.",
            ],
            currentMessage: "",
            messageIndex: -1
        }
    },
    computed: {
        animationDuration: function()
        {
            return 10 + 0.1 * this.currentMessage.replace(/<.*?>/g, "").length;
        }
    },
    methods: {
        getMessage: function()
        {
            const arr = Array.from(this.messages);
            if(this.messageIndex !== -1)
            {
                arr.splice(this.messageIndex, 1);
            }
            const index = Math.floor(Math.random() * arr.length);
            this.messageIndex = index;
            const element = arr[index];
            this.currentMessage = typeof element === "string" ? element : element();
        }
    },
    mounted: function()
    {
        this.getMessage();
        this.$refs.message.onanimationiteration = e =>
        {
            const anim = this.$refs.message.style.animation.slice();
            this.getMessage();
            this.$refs.message.style.animation = "none";
            void this.$refs.message.offsetWidth; //very black magic
            this.$refs.message.style.animation = anim;
            Vue.nextTick(() =>
            {
                if(this.$refs.message.style.animationDuration === "")
                {
                    this.$refs.message.style.animationDuration = this.animationDuration + "s";
                }
            });
        };
    },
    template: `<div class="news-ticker">
    <span ref="message" :style="{'animation-duration': animationDuration + 's'}" v-html="currentMessage"></span>
</div>`
})