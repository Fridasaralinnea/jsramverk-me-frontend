/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require('selenium-webdriver/firefox');
const webdriver = require("selenium-webdriver");

var options = new firefox.Options();

options.addArguments('--headless');

const By = webdriver.By;


// var driver = null;
var profile = new firefox.Profile();
var opts;
var builder;


profile.setAcceptUntrustedCerts(true);
profile.setAssumeUntrustedCertIssuer(false);


// opts = new firefox.Options();
// opts.setProfile(profile);
// builder = new webdriver.Builder().forBrowser('firefox');
// builder.setFirefoxOptions(opts);
// driver = builder.build();
//
// driver.get('https://www.google.com');
// driver.quit();


let browser;


// Does not work with WSL!! Use cygwin



// Test suite
test.describe("Me-App", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        opts = new firefox.Options();
        opts.setProfile(profile);
        builder = new webdriver.Builder().forBrowser('firefox').withCapabilities(options.toCapabilities());
        builder.setFirefoxOptions(opts);
        browser = builder.build();

        browser.get("https://jsramverk.fridasaralinnea.me/");

        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    // test.beforeEach(function(done) {
    //     this.timeout(20000);
    //     browser = new webdriver.Builder().
    //         withCapabilities(webdriver.Capabilities.firefox()).build();
    //
    //     // browser.get("http://localhost:4200/");
    //     browser.get("https://jsramverk.fridasaralinnea.me/");
    //
    //     done();
    // });
    //
    // test.afterEach(function(done) {
    //     browser.quit();
    //     done();
    // });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }


    function assertH2(target) {
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }



    // Test case
    test.it("Test index", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "MeFrontendAngular");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "MeFrontendAngular");
        });

        // assertH2("WELCOME");
        matchUrl("/");

        done();
    });



    test.it("Test go to Home", function(done) {
        // try use nav link
        goToNavLink("Home");

        assertH2("WELCOME");
        matchUrl("/" );

        done();
    });



    test.it("Test go to Reports", function(done) {
        goToNavLink("Reports");

        // get h1 text
        assertH1("Kmom01");
        matchUrl("/reports/week/1");

        done();
    });



    test.it("Test go to Kmom01", function(done) {
        goToNavLink("Reports");
        goToNavLink("Kmom01");

        // get h1 text
        assertH1("Kmom01");
        matchUrl("/reports/week/1");

        done();
    });



    test.it("Test go to Kmom02", function(done) {
        goToNavLink("Reports");
        goToNavLink("Kmom02");

        // get h1 text
        assertH1("Kmom02");
        matchUrl("/reports/week/2");

        done();
    });



    test.it("Test go to Kmom03", function(done) {
        goToNavLink("Reports");
        goToNavLink("Kmom03");

        // get h1 text
        assertH1("Kmom03");
        matchUrl("/reports/week/3");

        done();
    });



    test.it("Test go to Kmom04", function(done) {
        goToNavLink("Reports");
        goToNavLink("Kmom04");

        // get h1 text
        assertH1("Kmom04");
        matchUrl("/reports/week/4");

        done();
    });



    test.it("Test go to Kmom05", function(done) {
        goToNavLink("Reports");
        goToNavLink("Kmom05");

        // get h1 text
        assertH1("Kmom05");
        matchUrl("/reports/week/5");

        done();
    });



    test.it("Test go to Kmom06", function(done) {
        goToNavLink("Reports");
        goToNavLink("Kmom06");

        // get h1 text
        assertH1("Kmom06");
        matchUrl("/reports/week/6");

        done();
    });



    test.it("Test go to Kmom10", function(done) {
        goToNavLink("Reports");
        goToNavLink("Kmom10");

        // get h1 text
        assertH1("Kmom10");
        matchUrl("/reports/week/10");

        done();
    });




    test.it("Test go to Register", function(done) {
        goToNavLink("Register");

        // get h1 text
        assertH2("REGISTER NEW USER");
        matchUrl("/register");

        done();
    });



    test.it("Test go to Log in", function(done) {
        goToNavLink("Log in");

        // get h1 text
        assertH2("LOG IN");
        matchUrl("/login");

        done();
    });



    // test.it("Test color on Log in", function(done) {
    //     goToNavLink("Log in");
    //
    //     // display element background color
    //     browser.findElement(By.id("display")).then(function(displayElement) {
    //         displayElement.getCssValue("background-color").then(function(bgColor) {
    //             assert.equal(bgColor, "rgb(221, 221, 221)");
    //         });
    //     });
    //
    //     // operator buttons background color
    //     browser.findElements(By.className("operator")).then(function(operatorElements) {
    //         webdriver.promise.map(operatorElements, function(element) {
    //             return element.getCssValue('background-color');
    //         }).then(function(colors) {
    //             colors.forEach(function(color) {
    //                 assert.equal(color, "rgb(0, 31, 63)");
    //             });
    //         });
    //     });
    //
    //     done();
    // });



    // test.it("Test an addition calculation", function(done) {
    //     goToNavLink("Calculator");
    //
    //     let promiseNumbers = browser.findElements(By.className("number"));
    //
    //     promiseNumbers.then(function(numberElements) {
    //         // press number 1
    //         numberElements[6].click();
    //         // press +
    //         browser.findElements(By.className("operator")).then(function(operatorElements) {
    //             operatorElements[3].click();
    //             // press number 5
    //             numberElements[4].click();
    //             // press =
    //             operatorElements[4].click();
    //         });
    //     });
    //
    //     // check sum
    //     browser.findElement(By.id("display")).then(function(displayElement) {
    //         displayElement.getText().then(function(value) {
    //             assert.equal(value, "6");
    //         });
    //     });
    //
    //     done();
    // });
});
