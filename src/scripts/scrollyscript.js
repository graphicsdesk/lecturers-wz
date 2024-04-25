import scrollama from 'scrollama';
/**
 * Resizer script to toggle multiple artboards for responsiveness. Adapted from:
 * https://github.com/newsdev/ai2html/blob/gh-pages/_includes/resizer-script.html
 */
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
//import * as d3 from 'd3';




const d3 = { select, selectAll, transition };
const d3t = {transition};
//
// using d3 for convenience
var main = d3.select('main');
var scrolly = main.select('#scrolly');
var sticky = scrolly.select('#sticky-thing');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

function handleStepEnter(response) {
  //unfade();
  step.classed('is-active', function (d, i) {
    return i === response.index;
  });
  stepFunctions[response.index]();
  sticky.attr('class', 'step-' + response.index);
}

function handleStepExit(response) {
  if (response.index == 0 && response.direction == 'up') {
    sticky.attr('class', 'none');
  }
}

// function to set the initial page up. This is what the scrolly will look like when you first get to it.
function setup() {

  // hide all lines that start with "section" (using ^ selector) 
  // (i gave them all the name "section" in illustrator)
  // you may need to change "data-name" to "id"—I forget

  d3.selectAll("[id^='section-']").classed('hidden', true,); 
  d3.selectAll("[id^='section-']").classed('draw', false,); 
  // we're applying the "hidden" class to all of these objects by setting it to true.
  // "hidden" is in the style section scrolly.html


  // let's also hide the numbers we'll be using as counters (the numbers should really be years, but I just used 1,2,3,4,5 for simplicity)
  d3.selectAll("[id^='num-']").classed('hidden', true,); 
  

  // again, I renamed the number objects in illustrator so they all start with "num"
  
}

// now we can start making the funcitons for each "step"
// this is a scrollama thing - when you hit a certain point on the page while you scroll, you'll hit a new step


function step_0() {
 
}
function step_1() {
  visible('num-two','num-one');
  draw('1');

 

}
function step_2() {
  visible('num-one','num-two');
  draw('2');
  
}
function step_3() {
  visible('num-two','num-three');
  draw('3');
}
function step_4() {
  visible('num-three','num-four');
  draw('4');
  
}
function step_5() {
  visible('num-four','num-five');
  draw('5');
}

function step_6() {
  
}

var stepFunctions = [
  step_0,
  step_1,
  step_2,
  step_3,
  step_4,
  step_5,
  step_6,
];


function visible(old, name) {
  d3.selectAll('#' + old).classed('visible',false);
  d3.selectAll('#' + old).classed('hidden',true);
  d3.selectAll('#' + name).classed('visible',true);
  d3.selectAll('#' + name).classed('hidden',false);
}

function draw(name) {
  d3.selectAll('[id^=section-'+ name +']').classed('visible',true);
  d3.selectAll('[id^=section-'+ name +']').classed('draw',true);

}



function init() {
  // 2. setup the scroller passing options
  //    this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  setup();
  scroller
    .setup({
      step: '#scrolly article .step',
      offset: 0.98,
      debug: false,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

  // setup resize event
  window.addEventListener('resize', scroller.resize);
}

// kick things off
init();






