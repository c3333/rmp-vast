'use strict';

const TEST = require('../helpers/test');

var driver;

var testUrls = [
  TEST.pathToTest + 'inlineLinearSpec/IABVAST3Spec.html'
];

var testUrlsChromeOnly = [
  TEST.pathToTest + 'inlineLinearSpec/IABVAST2Spec.html',
  TEST.pathToTest + 'inlineLinearSpec/IABVAST3Spec.html',
  TEST.pathToTest + 'inlineLinearSpec/ImaInlineLinearSpec.html',
  TEST.pathToTest + 'inlineLinearSpec/SkippableSpec.html',
  TEST.pathToTest + 'inlineLinearSpec/SmartAdServerSpec.html'
];

const args = process.argv;
if (args[2] === 'android') {
  driver = TEST.getDriver('android');
} else if (args[2] === 'safari') {
  driver = TEST.getDriver('safari');
} else if (args[2] === 'chrome') {
  testUrls = testUrlsChromeOnly;
  driver = TEST.getDriver('chrome');
} else {
  driver = TEST.getDriver('firefox');
}

var intialTime = TEST.getTime();
var index = 0;

const _run = function () {
  console.log('Run HTML spec ' + testUrls[index] + ' at: ' + (TEST.getTime() - intialTime) + 'ms');
  const p = TEST.loadHTMLSpec(driver, testUrls[index]);
  p.then(() => {
    if (index === testUrls.length - 1) {
      driver.quit();
      return;
    }
    index++;
    _run();
  }).catch(() => {
    driver.quit();
  });
};

_run();
