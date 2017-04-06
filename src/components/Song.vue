<template>
  <div>
    <div class="song">
      <h1>Song</h1>
      <h3>Current Key: {{currentSongKey}}</h3>
      <br>

      <div v-for="section in currentSongSections">
        {{section.name}}:<br>
        <div v-for="line in section.chords">
          <span v-for="chord in line" v-html="displayChord(chord)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Song', 
    data (){
      return {
        chordMap: {
          'steps': ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'Ais', 'H'],
          'add': ['', '7', '7+', 'sus2', 'sus4'],
        },
      }
    },
    methods: {
      getStepByKey(key){
        return this.chordMap['steps'].indexOf(key);
      },
      getKeyByStep(step){
        if(step > 11) step = step - 12;
        return this.chordMap['steps'][step];
      },
      displayChord(chord){
        let step = chord[0]
        let type = chord[1]
        let add = chord[2]

        let stepInKey = step + this.currentSongKeyStep
        let chordNotation = this.getKeyByStep(stepInKey)

        switch(type){
          case 1:
            chordNotation = chordNotation.toLowerCase();
          break;
        }

        if(add > 0){
          chordNotation += '<sup>' + this.chordMap['add'][add] + '</sup>';
        }

        return chordNotation
      },
    },
    computed: {
      currentSongData(){
        let songSlug = this.$route.params.slug;
        return this.$store.getters.getSongChordsBySongSlug(songSlug)
      },
      currentSongKey(){
        return this.currentSongData[0].defaultKey;
      },
      currentSongKeyStep(){
        return this.getStepByKey(this.currentSongKey);
      },
      currentSongSections(){
        return this.currentSongData[0].sections;
      },
    },
  }
</script>

<style lang="scss" scoped> 
  @import './src/assets/scss/_common.scss';
  
  .song{
  }
</style>
