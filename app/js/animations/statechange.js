function waveStateChange() {

  var staticFrame = [];

    var centerX = (lev.xsize - 1) / 2;
    var centerZ = (lev.zsize - 1) / 2;
    if (centerX < 1) centerX = 1;
    if (centerZ < 1) centerZ = 1;

    var crests = 4;
    normalizedPhase = normalizedPhase + ballSpeed;
    var phase = 2 * Math.PI * normalizedPhase;

    var maxDistance = Math.sqrt((centerX - 0) * (centerX - 0) + (centerZ - 0) * (centerZ - 0));
    var distanceScalar = Math.PI * (crests * 2 - 1) / maxDistance;
    var distanceOffset = 2 * Math.PI;
    var maxAmplitude = 0.2;
    var heightScalar = 100.00 / (2 * maxAmplitude);

    var i = 0;
    for (var x = 0; x < lev.xsize; x++) {
        for (var z = 0; z < lev.zsize; z++) {
            for (var y = 0; y < lev.ysize; y++) {
              if (i % lev.ysize <= (lev.ysize/2)   ) {
                var defp = ballsDefYPos[i];
                var d = Math.sqrt((centerX - x) * (centerX - x) + (centerZ - z) * (centerZ - z));
                distance = distanceScalar * d + distanceOffset;
                var height = Math.sin(distance - phase) / distance;
                staticFrame.push(heightScalar * height + defp);
              } else {
                staticFrame.push(ballsRemoveYPos[i]);
              }
              i++;
          }
      }
  }

  nextFrame = staticFrame;
  return nextFrame;

}
