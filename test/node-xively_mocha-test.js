require('expectations'); // exports a global, so use anywhere
var sinon = require('sinon');
var request = require('request');

var XivelyClient = require('../lib/node-xively.js');

describe("XivelyJS", function () {
    beforeEach(function () {
        this.xively = new XivelyClient();
        this.xively.setKey("my_key");
    });

    describe("initialization", function () {
        it("should allow setting the apiEndpoint on our client instance", function () {
            this.xively = new XivelyClient("example.com");
            expect(this.xively._settings().apiHost).toEqual("example.com");
        });
    });

    describe(".setKey", function () {
        it("should set the key on our client instance", function () {
            expect(this.xively._settings().apiKey).toEqual("my_key");
        });
    });

    describe(".apiEndpoint", function () {
        it("should expose the api endpoint for use", function () {
            expect(this.xively.apiEndpoint).toEqual("http://api.xively.com/v2");
        });
    });

    describe(".version", function () {
        it("should expose the version string", function () {
            expect(this.xively.version()).toBeDefined();
        });
    });

    describe("feed.get", function () {
        beforeEach(function () {
            sinon.spy(request, 'get');
            sinon.spy(request, 'put');
            this.callback = sinon.spy();
        });

        afterEach(function () {
            request.get.restore();
            request.put.restore();
        });

        it("should get with correct parameters", function () {
            var calledArgs;

            this.xively.feed.get(123, this.callback);
            calledArgs = request.get.getCall(0).args;

            expect(calledArgs[0]).toMatch(/https?:\/\/api.xively.com\/v2\/feeds\/123/);
            expect(calledArgs[1].headers['X-ApiKey']).toEqual("my_key");
            expect(calledArgs[1].headers['Content-Type']).toEqual("application/json");
            expect(request.get.calledOnce);
            expect(this.callback.called);
        });

        it("should post with correct parameters", function () {
            var calledArgs;
            var feed_data = { title: "Feed Test", description: "Feed description" };

            this.xively.feed.new(123, { data_point: feed_data, callback: this.callback});

            calledArgs = request.put.getCall(0).args;

            expect(calledArgs[0]).toMatch(/https?:\/\/api.xively.com\/v2\/feeds\/123/);
            expect(calledArgs[1].headers['X-ApiKey']).toEqual("my_key");
            expect(calledArgs[1].headers['Content-Type']).toEqual("application/json");
            expect(calledArgs[1].method).toEqual("PUT");
            expect(calledArgs[1].body).toEqual(JSON.stringify(feed_data));
            expect(request.put.calledOnce);
        });


    });

});