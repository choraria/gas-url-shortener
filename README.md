# TakeMeThere
This tool is a [URL Shortening service](https://en.wikipedia.org/wiki/URL_shortening) powered by [Google Apps Script](https://developers.google.com/apps-script) and hosted using [Github Pages](https://pages.github.com/).

## Demo

You can try **TakeMeThere** on https://tmt.pw/ and access the original resources here -
- The entire folder on my [Google Drive](https://drive.google.com/drive/folders/1SuHsBLbSYm5dSnp3NeGmUOTnC9NPqEje?usp=sharing)
- A Spreadsheet that acts as the [datasource](https://docs.google.com/spreadsheets/d/1xPs4Ht-3PVBGgdNSxyN3p2F5TtOifgvunrEvYaiu_A4/edit?usp=sharing)
- Finally, [the script](https://script.google.com/d/1wdNu632PfJNv0iCCNLjA-9nARemz7DLcK28Lio6YdVNMP3iEtOUtR4_R/edit?usp=sharing) itself

## Caveat(s)

With the current architecture, while "redirecting" from the short URL to the destination (long) URL, the Apps Script web app link is exposed and visible. Here's what I mean -

![tmt-caveat](https://raw.githubusercontent.com/schoraria911/gas-url-shortener/staging/imgs/tmt-caveat.gif)

For now, the 404s are more of an "alert" box, that's then redirected to the main domain.

![tmt-404](https://raw.githubusercontent.com/schoraria911/gas-url-shortener/staging/imgs/tmt-404.gif)

These may be deal-breakers for a few and so I'd rather you know about them **before** you're exposed to the excruciating documentation 😅

# Table of Contents

# Prerequisites

1. Gmail or a G Suite account
2. A domain name with access its DNS management
   - will be required to setup Github Pages
3. Github account (the free one would do too)

# Installation

The architecture...

## Google Sheets & Script stage

1. Create a new [Spreadsheet](https://docs.google.com/spreadsheets/)
   - **DO NOT** add new sheets manually or rename the existing, default 'Sheet1' either; the script would automatically do that in the `setup` phase
2. Make a copy of [my script](https://script.google.com/d/1wdNu632PfJNv0iCCNLjA-9nARemz7DLcK28Lio6YdVNMP3iEtOUtR4_R/edit?usp=sharing) **OR** Create a new [Google Apps Script](https://script.google.com/home/start) and then copy > paste all the code that's available in [apps-script](apps-script/)
   - in case you do not know how to create a fresh Apps Script seperately (i.e. without going through to **Tools > Script Editor**), refer [this](https://script.gs/disassociate-scripts-from-sheets-and-other-tools/)
3. In the **Code.gs** file, replace the `sheetID` with the Spreadsheet ID that you could find from the URL of your newly created sheet in step 1
   - referring to the `https://docs.google.com/spreadsheets/d/`**RandomStringOfCharactersHere**`/edit`
4. Right below the `sheetID`, also add your domain name under `customDomain` & a name that you'd want to display under `serviceName`
   - Note: You **DO NOT** need to purchase a seperate SSL certificate as `https` will be enforced in the coming stages, when we start working with Github Pages
5. Save the script - **DO NOT** deploy as webapp or run any function at this stage. Simply save the script and it might prompt you for a file name, if that has not already been setup
6. Navigate to the `Setup.gs` script file within apps script and run the `setup` function. Here, it would ask you to authorise the script - **do it**! This would do 3 things:
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
   - DO NOT make any changes to the `404.html` file
4. Finally, go to **Settings > Options** (this is where you'd land by default)
   - scroll down to **GitHub Pages > Source**
   - select **master branch** from the drop down
   - enter your domain name under **Custom domain** and hit "save"

# Dependencies

# Usage

# Contributing

# Credits

# License
