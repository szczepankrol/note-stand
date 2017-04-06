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
        <div class="song__section__line" v-for="line in section.chords">
          <span class="song__section__chord" v-for="chord in line" v-html="displayChord(chord)"></span>
        </div>
      </div>

      <div v-if="editMode" @click="showNewSectionField()">Add new section</div>
      <div class="" v-if="newSectionField">
        <form v-on:submit.prevent="newSectionFormSubmit">
          <input type="text" v-model="newSectionName">
          <button type="submit">Add</button>
        </form>
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
        currentSongKey: undefined,
        currentSongKeyStep: undefined,
        newSectionField: false,
        newSectionName: '',
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
        this.$store.commit('addNewSection', {songSlug: 'new', name: this.newSectionName})
        this.newSectionName = '';
        this.newSectionField = false;
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
