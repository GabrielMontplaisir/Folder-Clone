var ss = SpreadsheetApp.getActiveSpreadsheet();
// Menu

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem("Select Folders", "doGet")
    .addSeparator()
    .addItem('Help','getHelp')
    // .addItem("Generate Properties", "getUserProps")
  .addToUi();
}

function getHelp() {
  help = ss.getSheetByName('Instructions');
  help.showSheet();
}

// Display Google Picker

function doGet(e) {
  var sh = ss.getActiveSheet();
  if (sh.getName() != 'Instructions') {
    ss.getSheetByName('Instructions').hideSheet();

    // Delete the properties and the values on the sheet.
    // PropertiesService.getUserProperties().deleteAllProperties();
    sh.clear();

    // Display a first row when you show the picker.
    sh.appendRow( ['Folder Name', 'Progress', 'Destination', 'Link to Clone'] );

    // if (PropertiesService.getUserProperties().getProperty('AUTHGRANTED') == 'true') {
      // Display Google Picker
      var html = HtmlService.createHtmlOutputFromFile('picker')
        .setWidth(1051)
        .setHeight(650)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME.ALLOWALL);
      SpreadsheetApp.getUi().showModalDialog(html, 'Select a folder');
    // } else {
    //   var authHtml = HtmlService.createHtmlOutputFromFile('temp')
    //     .setWidth(450)
    //     .setHeight(150);
    //   SpreadsheetApp.getUi().showModalDialog(authHtml,"Starting Authorization to Google Picker");
    //   PropertiesService.getUserProperties().setProperty('AUTHGRANTED','true');
    // }

  } else {
    ss.getSheetByName('Folder Clone').activate();
    doGet(e);
  }
}

// Get the user's OAuth 2.0 Token //

function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}