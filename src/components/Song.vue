<template>
  <div>
    <div class="song">

      <div class="page__header">
        <div class="top">
          <div class="top__left">
            <h1 v-if="!editMode">{{currentSongData.name}}</h1>
            <input type="text" class="song__title-field" v-model="currentSongData.name" v-if="editMode">
          </div>
          <div class="top__nav">
            <router-link :to="{ name: 'song', params: {slug: currentSlug, mode: 'view'}}" v-if="editMode">View</router-link>
            <router-link :to="{ name: 'song', params: {slug: currentSlug, mode: 'edit'}}" v-if="!editMode">Edit</router-link>
            <select v-model="currentSongKeyStep">
              <option v-for="(step, index) in chordMap.steps" :value="index">{{step}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="song__section" v-for="section in currentSongSections">
        <span class="song__section__name">{{section.name}}:</span>
        <div class="song__section__line" v-for="(line, index) in section.chords">
          <span class="song__section__chord" v-for="chord in line" v-html="displayChord(chord)"></span>

          <span v-if="editMode" @click="chooseNewChord(section.slug, index)">+ Add new chord</span>
          

        </div>

        <div v-if="editMode" @click="addNewLine(section.slug)">+ Add new line</div>


      </div>

      <div v-if="editMode" @click="showNewSectionField()">+ Add new section</div>
      <div class="" v-if="newSectionField">
        <form v-on:submit.prevent="newSectionFormSubmit">
          <input type="text" v-model="newSectionName">
          <button type="submit">Add</button>
        </form>
      </div>


      <div class="chord-creator" v-if="chordCreator">
        <select name="step" v-model="currentCreatedChord[0]">
          <option v-for="(step, index) in chordMap.steps" :value="index">{{step}}</option>
        </select>        
        <select name="type" v-model="currentCreatedChord[1]">
          <option v-for="(type, index) in chordMap.type" :value="index">{{type}}</option>
        </select>  
        <select name="add" v-model="currentCreatedChord[2]">
          <option v-for="(add, index) in chordMap.add" :value="index">{{add}}</option>
        </select>
        <span @click="addNewChord()">+ Save chord</span>
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
          'type': ['Major', 'Minor', 'Diminished', 'Augmented'],
          'add': ['', '7', '7+', 'sus2', 'sus4'],
        },
        currentSongKey: undefined,
        currentSongKeyStep: undefined,
        newSectionField: false,
        newSectionName: '',
        chordCreator: false,
        currentCreatedChord: [0,0,0],
        currentCreatedChordPosition: [],
      }
    },
    created (){
      this.setInitialSongKey();
    },
    methods: {
      getStepByKey(key){
        return this.chordMap['steps'].indexOf(key);
      },
      getKeyByStep(step){
        if(step > 11) step = step - 12;
        return this.chordMap['steps'][step];
      },
      setInitialSongKey(){
        this.currentSongKey = this.currentSongData.defaultKey;
        this.currentSongKeyStep = this.getStepByKey(this.currentSongKey);
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
      showNewSectionField(){
        this.newSectionField = true;
      },
      newSectionFormSubmit(){
        let songSlug = this.$route.params.slug;
        this.$store.commit('addNewSection', {songSlug: songSlug, name: this.newSectionName})
        this.newSectionName = '';
        this.newSectionField = false;
      },
      addNewLine(sectionSlug){
        let songSlug = this.$route.params.slug;
        this.$store.commit('addNewLine', {songSlug: songSlug, sectionSlug: sectionSlug})
      },
      chooseNewChord(sectionSlug, lineIndex){
        this.chordCreator = true;
        this.currentCreatedChordPosition[0] = sectionSlug;
        this.currentCreatedChordPosition[1] = lineIndex;
      },
      addNewChord(){
        let songSlug = this.$route.params.slug;
        let sectionSlug = this.currentCreatedChordPosition[0];
        let lineIndex = this.currentCreatedChordPosition[1];
        let chord = this.currentCreatedChord;
        this.$store.commit('addNewChord', {songSlug: songSlug, sectionSlug: sectionSlug, lineIndex: lineIndex, chord: chord})
        this.resetChordCreator();
      },
      resetChordCreator(){
        this.chordCreator = false;
        this.currentCreatedChord = [0,0,0];
        this.currentCreatedChordPosition = [];
      },
    },
    computed: {
      currentSongData(){
        let songSlug = this.$route.params.slug;
        let song = this.$store.getters.getSongBySongSlug(songSlug)
        if(!song.length){
          this.$store.commit('createNewEmptySong')
          song = this.$store.getters.getSongBySongSlug(songSlug)
        }
        return song[0]
      },
      currentSlug(){
        return this.$route.params.slug;
      },
      editMode(){
        return (this.$route.params.mode === 'edit')
      },
      currentSongSections(){
        return this.currentSongData.sections;
      },
    },
  }
</script>

<style lang="scss" scoped> 
  @import './src/assets/scss/_common.scss';
  
  .song{

    &__title-field{
      padding: 4px 10px;
      font-size: 18px;
      font-weight: bold;
      width: 100%;

    }
    &__section{
      margin-bottom: 3%;
      &__name{
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: $color-gray-dark;
        font-size: 14px;
      }
      &__line{
        display: block;
        margin-bottom: 1%;
      }
      &__chord{
        width: 130px;
        display: inline-block;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
</style>
