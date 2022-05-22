Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v1.0.2</template>
    <template v-slot:text>
    Changes to names, 50+ new news tickers! 
    Switched names from ω2Engine to ω2 Layers. 
    Loss of savefiles are certain. If you are currently having loss on data, the save was invalid because it had ω2Engine in it.
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.1</template>
    <template v-slot:text>
    Added 10+ new achievements!
    Added Radians and Pokemon REA Notation.
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.0</template>
    <template v-slot:text>
    Initial Release.
    </template>
    </guide-item>
</div>`
})