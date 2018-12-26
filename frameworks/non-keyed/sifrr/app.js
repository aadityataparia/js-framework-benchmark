import SifrrDOM from '@sifrr/dom'
import SifrrFetch from '@sifrr/fetch'

window.Sifrr = { Dom: SifrrDOM, Fetch: SifrrFetch };
Sifrr.Dom.setup({ baseUrl: '/frameworks/non-keyed/sifrr/' });
Sifrr.Dom.Event.add('click');
Sifrr.Dom.load('main-element');
const sft = document.querySelector('main-element');
let startTime, lastMeasure;
let startMeasure = function(name) {
  startTime = performance.now();
  lastMeasure = name;
}

let stopMeasure = function() {
  let last = lastMeasure;
  if (lastMeasure) {
    window.setTimeout(function() {
      lastMeasure = null;
      let stop = performance.now();
      let duration = 0;
      console.log(last + " took " + (stop - startTime));
    }, 0);
  }
}
let selected = null;
document.querySelector("main-element").$click = e => {
  let target = e.path ? e.path[0] : e.target;
  // startMeasure(target.id || target.className);
  if (target.matches('#add')) {
    //console.log("add");
    sft.state = {
      data: sft.state.data.concat(buildData(1000, sft.state.data.length))
    };
  } else if (target.matches('#run')) {
    //console.log("run");
    sft.state = {
      data: buildData(1000)
    };
  } else if (target.matches('#update')) {
            let state = sft.state,
      l = sft.state.data.length;
    for (let i = 0; i < l; i += 10) {
      state.data[i].label = state.data[i].label + ' !!!';
      // this.data[i] = Object.assign({}, this.data[i], {label: this.data[i].label +' !!!'});
    }
    sft.state = state;
  } else if (target.matches('#hideall')) {
    //console.log("hideAll");
    sft.state = {
      data: []
    };
  } else if (target.matches('#showall')) {
    //console.log("showAll");
    sft.state = {
      data: buildData(1000)
    };
  } else if (target.matches('#runlots')) {
    //console.log("runLots");
    sft.state = {
      data: buildData(10000)
    };
  } else if (target.matches('#clear')) {
    //console.log("clear");
    sft.state = {
      data: []
    };
  } else if (target.matches('#swaprows')) {
    //console.log("swapRows");
    let state = sft.state.data;
    if (state.length > 998) {
      const tmp = state[1];
      state[1] = state[998];
      state[998] = tmp;
      sft.state = {data: state};
    }
  } else if (target.matches('.remove')) {
    const id = getParent(target).state.id;
    // console.log("delete",id);
    let state = sft.state.data;
    for(let i = state.length-1; i >= 0; i--){
      if (state[i].id == id) {
        state.splice(i, 1);
      }
    }
    sft.state = { data: state };
  } else if (target.matches('.lbl')) {
    // Using state
    // const id = getParent(target).state.id;
    // console.log("select",id);
    // const state = sft.state.data;
    // for(let i = state.length-1; i >= 0; i--){
    //   if (state[i].id == id) {
    //     state[i].class = 'danger';
    //   } else {
    //     state[i].class = null;
    //   }
    // }
    // sft.state = { data: state };

    // Maybe cheating by using vanilla implementation?
    const row = getParent(target);
    if (selected) {
      selected.className = '';
    }
    row.className = 'danger';
    selected = row;
  }
  // stopMeasure();
};

function _random(max) {
  return Math.round(Math.random() * 1000) % max;
}

let from = 1;
function buildData(count = 1000) {
  const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive",
    "cheap", "expensive", "fancy"
  ];
  const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
  const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
  let data = [];
  for (let i = 0; i < count; i++)
    data.push({
      id: i + from,
      label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)]
    });
  from = from + count;
  return data;
}

function getParent(elem) {
  while(elem.nodeName !== 'TR') elem = elem.parentNode;
  return elem;
}
