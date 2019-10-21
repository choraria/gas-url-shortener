var sheetID = 'YourSpreadSheetIDGoesHere';
var customDomain = 'https://domain.tld/';
var serviceName = 'A Cool Name For Your Shortener';

/* =============== DO NOT CHANGE ANYTHING BELOW THIS LINE =============== */

var redirectSheet = 'Redirects';
var bannedKeywords = 'Exclusions';
var ss = SpreadsheetApp.openById(sheetID);

function doGet(e) {
  var slug = e.queryString;
  if (slug == '') {
    var title = 'Dashboard | ' + serviceName;
    return HtmlService.createHtmlOutputFromFile('Dashboard').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle(title);
  } else {
    var notFound = false;
    var redirectsData = getRedirects();
    for (var i = 0; i < redirectsData.length; i++) {
      if (slug == redirectsData[i].slug) {
        var redirectURL = redirectsData[i].longURL;
        var html = "<script>window.open('" + redirectURL + "','_top');</script>";
        return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle('Redirecting...');
        break;
      } else {
        notFound = true;
      }
    }
    if (notFound) {
      var html = "<script>alert('No redirects found!');window.open('" + customDomain + "','_top');</script>";
      return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle('404!');
    }
  }
}

function getRedirects() {
  var redirects = [];
  var sheetName = redirectSheet;
  var activeSheet = ss.getSheetByName(sheetName);
  var rangeData = activeSheet.getDataRange();
  var lastColumn = rangeData.getLastColumn();
  var lastRow = rangeData.getLastRow();
  var range = activeSheet.getRange(2,1, lastRow-1, lastColumn);
  var data = range.getValues();
  for (var i=0; i<lastRow-1; i++) {
    var dataJSON = redirectsJSON(data[i]);
    redirects.push(dataJSON);
  }
  return redirects;
}

function redirectsJSON(row) {
  return {
    "slug": row[0],
    "longURL": row[1]
  }
}

function getExclusions() {
  var sheetName = bannedKeywords;
  var activeSheet = ss.getSheetByName(sheetName);
  var rangeData = activeSheet.getDataRange();  
  var lastColumn = rangeData.getLastColumn();
  var lastRow = rangeData.getLastRow();
  var bannedList = activeSheet.getRange(2,1, lastRow-1, lastColumn).getValues();
  return bannedList;
}

function addLink(shortStack) {
  var now = new Date();
  var slug = shortStack.slug;
  var slugValidation = /[^A-Za-z0-9]+/;
  if (slugValidation.test(slug) == true) {
    return "Validation failed! Please use only texts & numbers."
  }
  var exclusionsData = getExclusions();
  for (var j = 0; j < exclusionsData.length; j++) {
    if (slug == exclusionsData[j]) {
      return "Banned slug! You cannot use '" + slug + "' with " + customDomain;
    }
  }
  var redirectsData = getRedirects();
  for (var i = 0; i < redirectsData.length; i++) {
    if (slug == redirectsData[i].slug) {
      return "Sorry! '" + slug + "' has already been taken.";
    }
  }
  var longURL = shortStack.longURL;
  
  var urlRegex = /https?:\/\/.?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&=]*/g;
  // Problem: https://github.com/schoraria911/gas-url-shortener/issues/19
  // Solution: https://stackoverflow.com/questions/30970068/js-regex-url-validation
  if (urlRegex.test(longURL)) {
    // continue
  } else {
    return 'Please enter a valid URL.';
  }
    
  var sheetName = redirectSheet;
  var activeSheet = ss.getSheetByName(sheetName);
  if (activeSheet !== null) {
    activeSheet.appendRow(
      [
        slug,
        longURL,
        now
      ]
    );
    return "Voila!";
  } else {
    return "Oops! Something went wrong.";
  }
}
