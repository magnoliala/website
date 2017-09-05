<template>
  <div class="c-select" :class="{open: openOptionsList}">
    <div class="select-content">{{selectedOption.text || placeholder}}</div>
    <button class="btn-dropdown" @click="openOptionsList=true"><span class="caret"></span></button>
    <ul class="options-list">
      <li class="option" v-for="o in options" @click="selected(o)">{{o.text}}</li>
    </ul>
  </div>
</template>


<style scoped>
  .c-select {
    position: relative;
    font-size: 14px;
  }

  .c-select .select-content {
    display: inline-block;
    box-sizing: border-box;
    min-width: 8em;
    height: 35px;
    float: left;
    padding: 0 1em;
    border: 1px solid #e0e0e0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    line-height: 35px;
  }

  .c-select .btn-dropdown {
    box-sizing: border-box;
    width: 35px;
    height: 35px;
    float: left;
    border: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    line-height: 36px;
    text-align: center;
    background-color: #20A0FF;
    cursor: pointer;
    outline: none;
  }

  .c-select .btn-dropdown:active {
    background-color: #20A0FF;
  }

  .c-select .caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-top: -3px;
    vertical-align: middle;
    border-top: 4px solid #fff;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }

  .c-select .options-list {
    display: none;
    box-sizing: border-box;
    min-width: 100%;
    position: absolute;
    z-index: 90;
    left: 0;
    top: 33px;
    margin: 0;
    padding: 0;
    border: 1px solid #e0e0e0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #fff;
    list-style: none;
  }

  .c-select.open .options-list {
    display: block;
  }

  .c-select.open .select-content,
  .c-select.open .btn-dropdown {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .c-select .options-list .option {
    height: 35px;
    padding: 0 1em;
    line-height: 35px;
    cursor: pointer;
  }

  .c-select .options-list .option:hover {
    background-color: #eaf6fd;
  }
</style>


<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
        default: []
      },
      placeholder: String
    },
    data: function () {
      return {
        openOptionsList: false,
        selectedOption: {
          text: undefined,
          value: undefined
        }
      }
    },
    watch: {
      options: {
        handler: function (options) {
          if (options.length === 0) {
            return
          }
          if (!this.placeholder) {
            this.selectedOption.text = options[0].text
            this.selectedOption.value = options[0].value
          }
          for (let option of options) {
            if (option.selected === true) {
              this.selectedOption.text = option.text
              this.selectedOption.value = option.value
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      selected: function (option) {
        this.selectedOption.text = option.text
        this.selectedOption.value = option.value
        this.$emit('input', option.value, option)
        this.openOptionsList = false
      }
    },
    mounted: function () {
      var that = this
      document.body.addEventListener('click', function (e) {
        var clickTarget = e.target
        var selectElement = that.$el
        var obj = clickTarget
        var isParent = false
        while (obj !== undefined && obj !== null && obj.tagName.toUpperCase() !== 'BODY') {
          if (obj === selectElement) {
            isParent = true
          }
          obj = obj.parentNode
        }
        if (!isParent) {
          that.openOptionsList = false
        }
      })
    }
  }
</script>
