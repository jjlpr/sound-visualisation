const fs = require('fs');

const generateSample = (sampleSize) => {

  const sample = [];
  let i=0, l = sampleSize;
  for(i; i<l; i++) {
    sample.push(
      Math.round(
        Math.random()*100
      )
    );
  }

  sample.sort((a, b) => a - b);
  return sample;
}

const generateSecond = () => {

  const sampleSize = 3;
  const sample = generateSample(sampleSize);
  const av = sample.reduce((sample, s) =>
    sample + s/sampleSize, 0);
  const max = sample[sampleSize-1];
  const noisy = max > 90;

  const second = {
    // time: , I will want to add this later, when the data is recorded... I think :|
    av,
    max,
    noisy,
  }
  return second;
}

const generateSeconds = () => {

  let i=0, l=3600;
  const seconds = [];
  for(i; i<l; i++) {
    seconds.push(
      generateSecond()
    );
  }
  return seconds;
}

const data = generateSeconds();

const dataJson = JSON.stringify(data);

fs.writeFile('sample-data.json', dataJson, (err) => {
  if(err) {
    console.log('err');
  }
  console.log('success');
});
