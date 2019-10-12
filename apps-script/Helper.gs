function removeEmptyColumns(sheetName) {
  var activeSheet = ss.getSheetByName(sheetName)
  var maxColumns = activeSheet.getMaxColumns(); 
  var lastColumn = activeSheet.getLastColumn();
  if (maxColumns-lastColumn != 0){
    activeSheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
  }
}

function makeHeadersBold(sheetName) {
  var activeSheet = ss.getSheetByName(sheetName);
  var header = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).setFontWeight("bold");
}

function getCustomDomain() {
  return customDomain;
}
