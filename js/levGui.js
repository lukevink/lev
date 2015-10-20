//GUI //////////////////////////////////////////////////////////////////////

var levGui = function() {

   this.setInteractionMethod = function() {};

   this.setWav = function() {};
   this.wav_amplitude = wav_amplitude;
   this.wav_offset = wav_offset;
   this.wav_crests = wav_crests;

   this.setLev = function() {};
   this.columns = columns;
   this.positions = positions;
   this.ballSpeed = ballSpeed;
   this.columnDist = columnDist;
   this.posDist = columnDist;

   this.set3D = function() {};
   this.nextRandomFrame = function() {};

   this.columnX = 0;
   this.columnZ = 0;

   this.selectColl = function() {};

   this.selectSim2 = function() {};

   // Define render logic ...
};

window.onload = function() {

   var params = new levGui();
   var gui = new dat.GUI();

   gui.add(params, 'selectSim2').options({
       'None': 0,
       'Wave': 1,
       'Clear All': 2,
       'Show All': 3,
       'Render Objects': 4
   }).onFinishChange(function(newValue) {
       simSelect = parseInt(newValue);
       if (simSelect == 4) {
           nextFrame = genrateRandomNext();
       }
   }).name('Function:');

   var setInteraction = gui.addFolder('Interaction Options');
   setInteraction.add(params, 'setInteractionMethod').onFinishChange(function() { intSelect = 0; }).name('Move All');
   setInteraction.add(params, 'setInteractionMethod').onFinishChange(function() { intSelect = 1; }).name('Move Single');


   var setWav = gui.addFolder('Wave App Options');
   setWav.add(params, 'wav_amplitude', 0, 1).onFinishChange(function(newValue) {
       simSelect = 1;
       wav_amplitude = newValue;
   });
   setWav.add(params, 'wav_crests', 0, 20).onFinishChange(function(newValue) {
       simSelect = 1;
       wav_crests = newValue;
   });
   setWav.add(params, 'wav_offset', 0, 1000).step(1).onFinishChange(function(newValue) {
       simSelect = 1;
       wav_offset = newValue;
       orbitYPosition = ((lev.ysize * posDist) - posDist - (wav_offset / 2)) / 2;
       controls.target.y = orbitYPosition;
       controls.object.lookAt(controls.target);
   });



   var setRandom = gui.addFolder('Render Objects Options');
   setRandom.add(params, 'nextRandomFrame').onFinishChange(function() {
       simSelect = 4;
       nextFrame = rayCaster(0);
   }).name('Sphere');
   setRandom.add(params, 'nextRandomFrame').onFinishChange(function() {
       simSelect = 4;
       nextFrame = rayCaster(1);
   }).name('Cube');
   setRandom.add(params, 'nextRandomFrame').onFinishChange(function() {
       simSelect = 4;
       nextFrame = rayCaster(2);
   }).name('Helix');
   setRandom.add(params, 'nextRandomFrame').onFinishChange(function() {
       simSelect = 4;
       nextFrame = rayCaster(3);
   }).name('Torus');
   setRandom.add(params, 'nextRandomFrame').onFinishChange(function() {
       simSelect = 4;
       nextFrame = rayCaster(4);
   }).name('Atom');
   setRandom.add(params, 'nextRandomFrame').onFinishChange(function() {
       simSelect = 4;
       nextFrame = rayCaster(5);
   }).name('Planes');
   setRandom.add(params, 'nextRandomFrame').onFinishChange(function() {
      simSelect = 4;
       nextFrame = genrateRandomNext();
   }).name('Random Frame');


   var setLev = gui.addFolder('Lev Settings');
   setLev.add(params, 'columns', 0, 20).step(1).onFinishChange(function(newValue) {
       columns = newValue;
       resetInlev();
   });
   setLev.add(params, 'positions', 0, 20).step(1).onFinishChange(function(newValue) {
       positions = newValue;
       resetInlev();
   });
   setLev.add(params, 'ballSpeed', 0, 0.05).onFinishChange(function(newValue) {
       ballSpeed = newValue;
   });
   setLev.add(params, 'columnDist', 100, 300).step(10).onFinishChange(function(newValue) {
       columnDist = newValue;
       resetInlev();
   });
   setLev.add(params, 'posDist', 100, 300).step(10).onFinishChange(function(newValue) {
       posDist = newValue;
       resetInlev();
   });

   var columnX = 0;
   var columnZ = 0;
   var selectCol = gui.addFolder('Select Column');
   selectCol.add(params, 'columnX').onFinishChange(function(newValue) {
       columnX = newValue
   });
   selectCol.add(params, 'columnZ').onFinishChange(function(newValue) {
       columnZ = newValue
   });
   selectCol.add(params, 'selectColl').onFinishChange(function() {
       selectColumn(columnX, columnZ)
   }).name('Select Column');
   selectCol.add(params, 'clear').name('Clear Selection');


};
