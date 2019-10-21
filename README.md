![GitHub](https://img.shields.io/github/license/schoraria911/gas-url-shortener) ![GitHub issues](https://img.shields.io/github/issues-raw/schoraria911/gas-url-shortener) ![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m783618162-c6afcee4f4657cd7e88007d1) ![Twitter Follow](https://img.shields.io/twitter/follow/schoraria911?label=Follow&style=social)

<a href="https://www.producthunt.com/posts/take-me-there-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-take-me-there-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=170935&theme=dark" alt="Take Me There - URL Shortener powered by Google Apps Script | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>


# TakeMeThere
This tool is a [URL Shortening service](https://en.wikipedia.org/wiki/URL_shortening) powered by [Google Apps Script](https://developers.google.com/apps-script) and hosted using [Github Pages](https://pages.github.com/).

~Taking advantage of an [undocumented resource](https://stackoverflow.com/questions/58172084/grab-web-app-link-info-besides-querystring-parameters/58172160#58172160) from the `doGet` function that I accidentally stumbled upon - `e.pathInfo` while working on a completely different project.~

## Demo

You can try **TakeMeThere** on https://tmt.pw/ and access the original resources here -
- The entire folder on my [Google Drive](https://drive.google.com/drive/folders/1SuHsBLbSYm5dSnp3NeGmUOTnC9NPqEje?usp=sharing)
- A Spreadsheet that acts as the [datasource](https://docs.google.com/spreadsheets/d/1xPs4Ht-3PVBGgdNSxyN3p2F5TtOifgvunrEvYaiu_A4/edit?usp=sharing)
- Finally, [the script](https://script.google.com/d/1wdNu632PfJNv0iCCNLjA-9nARemz7DLcK28Lio6YdVNMP3iEtOUtR4_R/edit?usp=sharing) itself

## Caveat(s)

### Redirects

With the current architecture, while "redirecting" from the short URL to the destination (long) URL, the Apps Script web app link is exposed and visible. Here's what I mean -

![tmt-caveat](https://raw.githubusercontent.com/schoraria911/gas-url-shortener/staging/imgs/tmt-caveat.gif)

### 404s

For now, the 404s are more of an "alert" box, that's then redirected to the main domain.

![tmt-404](https://raw.githubusercontent.com/schoraria911/gas-url-shortener/staging/imgs/tmt-404.gif)

### Analytics

Yeah, I know this may sound super annoying but *that*, something that most folks would call the holy grail for using URL shortening services, is still under my [bucket list](#bucket-list).

These may be (and I'm not trying to be too hard on myself here) deal-breakers for a few and so I'd rather you know about them **before** you're exposed to the excruciating documentation 😅

# Table of Contents

- [TakeMeThere](#takemethere)
  - [Demo](#demo)
  - [Caveat(s)](#caveats)
    - [Redirects](#redirects)
    - [404s](#404s)
    - [Analytics](#analytics)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Google Sheets & Script stage](#google-sheets--script-stage)
  - [Github stage](#github-stage)
  - [Domain DNS stage](#domain-dns-stage)
- [Dependencies](dependencies)
- [Usage](#usage)
  - [Validations](#validations)
  - [Glossary](#glossary)
- [Contributing](#contributing)
- [Credits](#credits)
- [Bucket list](#bucket-list)
- [FAQs](#faqs)
- [Learnings](#learnings)
  - [Google login](#google-login)
- [Changelog](#changelog)
- [License](#license)

# Prerequisites

1. Gmail or a G Suite account
2. A domain name with access to its DNS management
   - we'll need it to setup Github Pages later
3. Github account (the free one would do too)

# Installation

## Google Sheets & Script stage

1. Create a new [Spreadsheet](https://docs.google.com/spreadsheets/)
   - **DO NOT** add new sheets manually or rename the existing (default) 'Sheet1' either; the script would automatically do that in the `setup` phase
2. Make a copy of [my script](https://script.google.com/d/1wdNu632PfJNv0iCCNLjA-9nARemz7DLcK28Lio6YdVNMP3iEtOUtR4_R/edit?usp=sharing) **OR** Create a new [Google Apps Script](https://script.google.com/home/start) and then copy > paste all the code that's available in [apps-script](apps-script/) within their respective files
   - in case you do not know how to create a fresh Apps Script seperately (i.e. without going through to **Tools > Script Editor**), refer [this article](https://script.gs/disassociate-scripts-from-sheets-and-other-tools/)
3. In the **Code.gs** file, replace the `sheetID` with the Spreadsheet ID that you could find from the URL of your newly created sheet in step 1
   - referring to the `https://docs.google.com/spreadsheets/d/`**RandomStringOfCharactersHere**`/edit`
4. Right below the `sheetID`, fill in your domain name under `customDomain` & a name that you'd want to display under `serviceName`
   - Note: You **DO NOT** need to purchase a seperate SSL certificate as `https` will be enforced in the coming stages, when we start working with Github Pages
5. Save the script - **DO NOT** deploy as webapp or run any function at this stage. Simply save the script and if it prompts you for a file name, if it did not already, then provide a name and let the script save
6. Navigate to the `Setup.gs` script file within apps script and run the `setup` function. Here, it would ask you to authorise the script - **do it**! The function would do 3 things:
   - create a new sheet that would store/contain your slug and long URL tuple, along with the date on which it was created
   - create another sheet that would store a list of banned keywords that you could define, as required
   - delete the default 'Sheet1'
7. Finally, go to **Publish > Deploy as web app...** and do the following:
   - Choose **Project version:** as **New**
   - Select **Execute the app as:** to **Me (your-email-id)**
   - Most importantly, have the **Who has access to the app:** setup to **Anyone, even anonymous**
   - Click **Deploy**

Save the link somewhere as we'll need it in the later stages of this setup.

## Github stage

1. [Create a new repository](https://github.com/new)
   - Name it as you like
   - Keep it **Public**
   - (Optional) Check the **Initialize this repository with a README**
   - Ignore the license and other aspects after the above options (you can set them up later)
   - Click **Create repository**
2. Copy the `index.html` & `404.html` files from this repository to your own
3. Edit the `index.html` file from your respository and replace the links (from **lines 41 & 70**) that contain a `script.google.com` URL to the one (your own) that you'd have saved from [the previous stage](#google-sheets--script-stage)
   - Also edit the `<title>` tag from **line 5**
   - **DO NOT** make any changes to the `404.html` file (courtesy [Rafael Pedicini](#credits))
4. Finally, go to **Settings > Options** (this is where you'd land by default when you click "Settings")
   - scroll down to **GitHub Pages > Source**
   - select **master branch** from the drop down
   - enter your domain name under **Custom domain** and hit "save"

## Domain DNS stage

Please follow through what's available with [configuring an apex domain](https://help.github.com/en/articles/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain). My approach was to create A records that point to the following IP addresses for GitHub Pages -

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Wait for the DNS propogation to take place - can vary somewhere between 5 minutes to 78 hours (or more).

# Dependencies

The setup uses the following third party dependecies (notwithstanding the obvious ones, those of which have been defined under [prerequisites](#prerequisites))

1. [Materialize CSS](https://materializecss.com)
2. [Google fonts](https://fonts.google.com/specimen/Bree+Serif)

# Usage

Once you have everything setup, you can then navigate to your domain (in this case, https://tmt.pw/) and -

1. Fill in the destination (long) URL that you'd want a user to land on
2. Provide a slug (short notation) that would go right after your domain name
3. Hit `Enter` or click **CREATE**

![tmt-demo](https://raw.githubusercontent.com/schoraria911/gas-url-shortener/staging/imgs/tmt-demo.gif)
*open this image in a new tab for better clarity / resolution*

You can also clear the fields by clicking on the (Red) 'CLEAR' button. It has currently not been automated (intentionally) as the final display (that comes up in Green) consumes the slug from this form.

## Validations

The script within the `Code.gs` file checks for a few kinds of validations within different parts of the process.

- It checks whether the "slug" contains anything other than texts and/or numbers
- Restricts the use of keywords from the Banned list, as defined by the user
   - I've gotten some examples from http://www.bannedwordlist.com/ that I've populated in [my setup](https://docs.google.com/spreadsheets/d/1xPs4Ht-3PVBGgdNSxyN3p2F5TtOifgvunrEvYaiu_A4/edit#gid=360346341)
- Disallowes link creation if the slug (keyword) already exists

## Glossary

- slug = the path of the URL just comes right after the TLD of a domain (`https://example.com/`**slug**)
- long URL = destination URL (where you'd want the users to be redirected should they visit the short URL)

# Contributing

I'm new here, this is my first open-source project & I'm not actually a coder/techie or a programmer - just super enthusiastic about Google Apps Script with a huge self-centered need to brag.

If you've read through this documentation so far - I know, this is such a cliché thing to say - and want to contribute, please feel free to create pull requests with your recommendations or write to me on `code@script.gs`.

# Credits

This project would've not been possible (by me), had I not found my way through to the following resources -

1. Jonathon Broughton's technique to use [Apps Script web apps within embeded ifames in Github Pages](https://github.com/stardotbmp/slack-gas-signup#github-pages)
2. Rafael Pedicini's [Single Page Apps for GitHub Pages](https://github.com/rafrex/spa-github-pages)
   - this was truly plug & play!
3. [Jasper Duizendstra](https://www.linkedin.com/in/duizendstra/) for helping me figure my way around `e.pathInfo`
   - refer Learnings > [Google login](#google-login)

# Bucket list

1. Analytics (P0)
   - Number of hits
   - URL Referrers
2. User management (P1)
   - Login
   - Custom dashboard
   - Email notifications
3. API (P2)
   - `doPost` to create new short URLs
   - Fetch, update & delete existing URLs

# FAQs

### Does this service provide a 301/302 redirect?

No. This setup simply uses `window.open` to have a new URL loaded on the same browser window (using `_top`), based on the slug.

# Learnings

## Google login

> Turns out `e.pathInfo` was a bad idea! Switched my code back to `e.queryString`.

[[Resolved](https://stackoverflow.com/questions/58358716/web-app-asking-user-to-login-even-though-its-been-deployed-to-be-used-by-anyon)] I got to know about this *odd behavior* only by the end of fully dpeloying this solution and the scenario being while a user would not be prompted to login when they create short URLs (via custom domain), they would be prompted to login when they **visit** a shortened URL (if they've not already logged in to their Google accounts on that browser).

# Changelog

A simple view of all things that have been changed can be tracked [here](https://github.com/schoraria911/gas-url-shortener/wiki/Changelog)

# License

MIT License

Copyright (c) 2019 Sourabh Choraria

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
