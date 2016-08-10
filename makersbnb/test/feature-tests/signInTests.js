// // process.env.NODE_ENV = 'test';
// const Browser = require('zombie');
// var chai = require('chai');
// var expect = chai.expect;
// var assert = chai.assert;
//
// describe('homepage', function() {
//   before(function() {
//     this.browser = new Browser({ site: 'http://localhost:3000' });
//   });
//
//   before(function(done) {
//     this.browser.visit('/', done);
//   });
//
//   it('should show title', function(){
//     expect(this.browser.html("body")).to.include("Username");
//     // this.browser.assert.element('signupForm')
//   });
//  });


 var Browser = require('zombie');
 var browser = new Browser();
 var url = 'localhost:3000';
 var chai = require('chai');
 var expect = chai.expect;
 // var app = require('./app.js');

 Browser.localhost('localhost', 3000);


 describe('user registration', function() {
  before(function(done) {
    browser.visit('/', done);
  });

  // it('displays an email and password form', function(done) {
  //   browser
  //     .fill('username', 'test')
  //     .fill('email', 'test@email.com')
  //     .fill('password', '12345')
  //     .pressButton('submit', done);
  // });

  it('displays', function() {
    expect(browser.html('p')).to.include('Express');
  });
  });
