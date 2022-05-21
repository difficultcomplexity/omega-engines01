Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
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