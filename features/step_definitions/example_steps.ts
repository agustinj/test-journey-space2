import { Given, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';

Given('I have a working Cucumber setup', function () {
  this.isSetUp = true;
});

Then('the scenario should pass', function () {
  assert.equal(this.isSetUp, true);
});