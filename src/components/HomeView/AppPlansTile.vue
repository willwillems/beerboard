<template>
  <div class="tile">
    <div class="tile__section"> 
      <div>
        <b class="tile__section__title">{{tiles.left.title}}</b> 
        <div v-html="tiles.left.content" class="tile__section__content"></div>
      </div>
      <div class="spacer"></div>
      <button class="tile__section__button">{{tiles.left.buttonTitle}}</button>
    </div>
    <div class="tile__border"></div>
    <div class="tile__section"> 
      <div>
        <b class="tile__section__title">{{tiles.right.title}}</b> 
        <div v-html="tiles.right.content" class="tile__section__content"></div>
      </div>
      <div class="spacer"></div>
      <button class="tile__section__button">{{tiles.right.buttonTitle}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'plans-tile',
  props: {
    tiles: {
      type: Object,
      required: true,
      validator (o) {
        return o.left && o.right
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tile {
  display: flex;
  justify-content: centre;
  flex-wrap: wrap; /* let the content collapse for mobile devices */
  max-width: 700px;
  border-radius: 5px;
  text-align: left;
  /* material shadow */
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.tile__section {
  /* flex is to let the button float under the text section in the middle */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* this width is specific for a layout of two sections */
  width: calc(50% - 40px - 0.5px); /* the .5 is for the 1px border on the left tile */
  min-width: 200px;
  padding: 20px;
  flex-grow: 1; /* when wrapped this makes the element grow to full width*/
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
  
}

.tile__section:first-child {
  border-radius: 5px 0px 0px 5px; /* match borders to container */
}

.tile__section:last-child {
  border-radius: 0px 5px 5px 0px; /* match borders to container */
}

@media screen and (max-width: 520px) {
  .tile {
    flex-direction: column; /* column on mobile */
  }

  .tile__section {
    width: calc(100% - 40px); /* 40px is 2 times the padding */
  }

  .tile__section:first-child {
    border-radius: 5px 5px 0px 0px; /* match borders to container */
  }

  .tile__section:last-child {
    border-radius: 0px 0px 5px 5px; /* match borders to container */
  }
}

/* increase shadow on hover */
.tile__section:hover {
  /* material shadow */
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

/* if somebody uses a li */
.tile__section ul {
  padding-left: 15px;
  margin: 0px;
}

.tile__section__title {
  font-size: 24px;
}

.tile__section__content {
  opacity: 0.71;
  margin: 5px 0px;
}

.tile__section__button {
  height: 30px;
  width: 150px;
  background-image: linear-gradient(-124deg, #EE1D1D 0%, #E38222 100%);
  background-color: red; /* fallback */
  color: white;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  transition: all linear 0.1s;
  margin: 1px 0px; /* to make toom for the hover grow */
  cursor: pointer;
}

.tile__section__button:hover {
  width: 152px; /* +2 on either side */
  height: 32px; /* +2 on either side */
  margin: 0px; /* to make toom for the hover grow */
  font-size: 19px;
  background-image: linear-gradient(-135deg, #738FF9 0%, #48E2E4 100%);
}

.tile__border {
    min-width: 1px;
  min-height: 1px;
  background-color: lightgray;
}

.spacer {
  height: 10px;
  width: 1px; /* probably neccecairy for IE ;) */
}
</style>
