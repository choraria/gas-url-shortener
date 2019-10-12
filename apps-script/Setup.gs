function setup() {
  
  // Create a master sheet that will store the slug<>longURL mapping
  var sheetName = redirectSheet;
  var activeSheet = ss.getSheetByName(sheetName);
  if (activeSheet == null) {
    activeSheet = ss.insertSheet().setName(sheetName);
    activeSheet.appendRow (
      [
        "Slug",
        "LongURL",
        "DateCreated"
      ]
    );
    activeSheet.appendRow (
      [
        "test",
        "https://www.google.com/",
        new Date()
      ]
    )
  }
  activeSheet.setFrozenRows(1);
  removeEmptyColumns(sheetName);
  makeHeadersBold(sheetName);
  
  // Create a repository list of all banned keywords that would be disallowed as slugs
  var sheetName = bannedKeywords;
  var activeSheet = ss.getSheetByName(sheetName);
  if (activeSheet == null) {
    activeSheet = ss.insertSheet().setName(sheetName);
    activeSheet.appendRow (
      [
        "BannedList"
      ]
    );
    activeSheet.appendRow (
      [
        "banExample"
      ]
    );
  }
  activeSheet.setFrozenRows(1);
  removeEmptyColumns(sheetName);
  makeHeadersBold(sheetName);
  
  // Delete the default sheet
  ss.deleteSheet(ss.getSheetByName('Sheet1'));
}
