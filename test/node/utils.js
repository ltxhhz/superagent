'use strict';
const assert = require('assert');
const utils = process.env.OLD_NODE_TEST === '1' ?
// eslint-disable-next-line node/no-missing-require
require('../../../utils') : require('../../lib/utils');

describe('utils.type(str)', () => {
  it('should return the mime type', () => {
    utils
      .type('application/json; charset=utf-8')
      .should.equal('application/json');

    utils.type('application/json').should.equal('application/json');
  });
});

describe('utils.params(str)', () => {
  it('should return the field parameters', () => {
    const object = utils.params('application/json; charset=utf-8; foo  = bar');
    object.charset.should.equal('utf-8');
    object.foo.should.equal('bar');

    utils.params('application/json').should.eql({});
  });
});

describe('utils.parseLinks(str)', () => {
  it('should parse links', () => {
    const string_ =
      '<https://api.github.com/repos/visionmedia/mocha/issues?page=2>; rel="next", <https://api.github.com/repos/visionmedia/mocha/issues?page=5>; rel="last"';
    const returnValue = utils.parseLinks(string_);
    returnValue.next.should.equal(
      'https://api.github.com/repos/visionmedia/mocha/issues?page=2'
    );
    returnValue.last.should.equal(
      'https://api.github.com/repos/visionmedia/mocha/issues?page=5'
    );
  });
});
