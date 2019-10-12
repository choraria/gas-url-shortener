# TakeMeThere
This tool is a [URL Shortening service](https://en.wikipedia.org/wiki/URL_shortening) powered by [Google Apps Script](https://developers.google.com/apps-script) and hosted using [Github Pages](https://pages.github.com/).

## Demo

You can try **TakeMeThere** on https://tmt.pw/ and access the original resources here -
- The entire folder on my [Google Drive](https://drive.google.com/drive/folders/1SuHsBLbSYm5dSnp3NeGmUOTnC9NPqEje?usp=sharing)
- A Spreadsheet that acts as the [datasource](https://docs.google.com/spreadsheets/d/1xPs4Ht-3PVBGgdNSxyN3p2F5TtOifgvunrEvYaiu_A4/edit?usp=sharing)
- Finally, [the script](https://script.google.com/d/1wdNu632PfJNv0iCCNLjA-9nARemz7DLcK28Lio6YdVNMP3iEtOUtR4_R/edit?usp=sharing) itself

# Table of Contents

# Prerequisites

1. A Gmail or a G Suite account
2. Domain name with access to managing DNS
   - will be required to setup [Github Pages](https://pages.github.com/)
3. 

# Installation

1. Create a new [Spreadsheet](https://docs.google.com/spreadsheets/)
   - **DO NOT** add new sheets manually or rename the existing, default "**Sheet1**" either; the script would automatically do that in the `setup` phase
2. Make a copy of [my script](https://script.google.com/d/1wdNu632PfJNv0iCCNLjA-9nARemz7DLcK28Lio6YdVNMP3iEtOUtR4_R/edit?usp=sharing) **OR** Create a new [Google Apps Script](https://script.google.com/home/start) and then copy > paste all the code that's available in [apps-script](apps-script/)
   - in case you do not know how to create a fresh Apps Script seperately (i.e. without going through to **Tools > Script Editor**), refer [this](https://script.gs/disassociate-scripts-from-sheets-and-other-tools/)
3. In the **Code.gs** file, replace the `sheetID` with the Spreadsheet ID that you could find from the URL of your newly created sheet in step 1
   - referring to the `https://docs.google.com/spreadsheets/d/`**RandomStringOfCharactersHere**`/edit`
4. Right below the `sheetID`, also add the `customDomain` & `serviceName`, as desired
   - 

## Dependencies

# Usage

# Contributing

# Credits

# License
