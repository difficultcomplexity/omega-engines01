Vue.component("endgame-tab", {
    computed: {
        timeSpent: function() {
            time = game.timeSpent;
            formattedTime = functions.formatTime(time)
            return formattedTime
        },
    },
    methods: {
        hardResetGame: () => functions.hardResetGame(),
    },
    template: `<div id="endgame">
    <h2><span class="omega">Are you</span> tired?</h2>
    <p>The game is a success based on <span class="omega">{{timeSpent}}</span><br>
    <button onclick="game.settings.tab = 'Layers'">Follow up</button> <button @click="hardResetGame()">dead match</button></p>
</div>`
})