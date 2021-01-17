const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

const { GMEMAIL, GMPASSWORD } = process.env

class GoogleMeet {
    constructor(head, strict) {
        this.email = GMEMAIL;
        this.pass = GMPASSWORD;
        this.head = head;
        this.strict = strict;
        this.browser;
        this.page;
    }
    async schedule(url) {
        try {
            // Open browser
            this.browser = await puppeteer.launch({
                headless: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--use-fake-ui-for-media-stream',
                    '--disable-audio-output'
                ],
            });
            this.page = await this.browser.newPage()
            await this.page.goto('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin')

            // Login Start
            await this.page.type("input#identifierId", this.email, {
                delay: 0
            })
            await this.page.click("div#identifierNext")

            await this.page.waitForTimeout(4000)

            await this.page.type("input.whsOnd.zHQkBf", this.pass, {
                delay: 0
            })
            await this.page.click("div#passwordNext")

            await this.page.waitForTimeout(4000)

            console.log(url)

            await this.page.goto(url.url)

            console.log("inside meet page")

            await this.page.waitForTimeout(5000)
            try {
                await this.page.click("div.IYwVEf.HotEze.uB7U9e.nAZzG")
            } catch (e) {
                console.log ("\naudio seems to disabled already")
                console.log (e);
            }
            await this.page.waitForTimeout(1000)
            try {
                await this.page.click("div.IYwVEf.HotEze.nAZzG")
            } catch (e) {
                console.log ("\nvideo seems to be disabled already")
                console.log (e)
            }

            // sanity check (connect only if both audio and video are muted) :P
            if (this.strict) {
                let audio = await this.page.evaluate('document.querySelectorAll("div.sUZ4id")[0].children[0].getAttribute("data-is-muted")')
                let video = await this.page.evaluate('document.querySelectorAll("div.sUZ4id")[1].children[0].getAttribute("data-is-muted")')

                if (audio === "false" || video === "false") {
                    console.log ("Not joining meeting. We couldn't disable either audio or video from the device.\nYou may try again.")
                    return
                }
                console.log ("all set!!")
            }

            await this.page.waitForTimeout(3000)

            console.log('clicking on join')
            
            await this.page.click("span.NPEfkd.RveJvd.snByac")

            console.log("Successfully joined/Sent join request")
        }
        catch(err) {
            console.log(err)
        }
    }

    async end() {
        await this.browser.close();
    }
}

module.exports = GoogleMeet