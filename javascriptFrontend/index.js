$(document).ready(function() {
  $.getJSON('http://localhost:3000/fishes').then(fishes => {
    fishes.forEach(fish => {
      console.log('fish here', fish);
    });
  });
});
