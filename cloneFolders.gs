var ss = SpreadsheetApp.getActive();
var sh = ss.getActiveSheet();
var copySubFolders = false;

/** 
 * The inProgress function will iterate through all the folders picked by the user in the Google Picker.
 * It will display all the folders (but not sub-folders) in a list and retain their spot on the Sheet under UserProperties.
 * We use the parameter folderData as it holds all the information from the Google Picker in the array.
*/

function inProgress(folderData) {
  for (var u = 0 ; u < folderData.length; u++){
    for (var s = 2; s < folderData[0].length; s++){
      sh.getRange(folderData[u][0]+2,s-1).setValue(folderData[u][s]);
      sh.getRange(folderData[u][0]+2,s-1).setBackground('#ffe599');
    }
    let psObj = PropertiesService.getUserProperties().getProperties();
    psObj[folderData[u].map(re => re).join()] = folderData[u][0]+2;
    PropertiesService.getUserProperties().setProperties(psObj);
  }
}

/** 
 * Once folders are selected in Google Picker, we launch this function to ask the user if they would like to copy
 * subfolders and files. This is a lengthy process, and we alert the user to limit themselves to a few folders at a time
 * if they do select this option.
 * 
 * Depending on their answer, return true or false.
*/

function copySubDocsMenu() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
    'Would you like to copy subfolders?',
    'If you have a large folder and many subfolders, we recommend you only copy one at a time.',
    ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    return copySubFolders = true;
  } else if (result == ui.Button.NO) {
    return copySubFolders = false;
  } else {
    return copySubFolders = null;
  }
}

/**
 * A recursive function which calls two parameters: parent, and its source.
 * param @parent will contain all the necessary information such as its name and ID.
 * param @parentFolder will contain the cloned copy ID in order to put subfolders into it.
 */

function getSubFolders(parent, parentFolder) {
  var parentFolderName = parent.getName();        // Grab the parent folder's name.
  var parentFolderID = parent.getId();            // Grab the parent folder's unique ID.

  var newParentFolderName = parent.createFolder(parentFolderName);                  // Create a subfolder under the same name as the parent folder.
  var newParentFolderID = DriveApp.getFolderById(newParentFolderName.getId());      // Grab the new folder's ID.
  var parentFiles = parent.getFiles();                                              // Grab the files within the parent folder to copy them to this new subfolder.

  /** 
  * Alert the user that we're cloning the folder and files from the the subfolder to it's parent folder.
  * This is useful to let the user know that something is happening in the background, as otherwise they wouldn't know 
  * whether the script is working as intended. 
  */
  ss.toast('Cloning folder and files from '+newParentFolderName+' to '+parentFolder.getName()+'.');

  // Copy the files to the subfolder.
  while (parentFiles.hasNext()){
    var parentFile = parentFiles.next();
    var parentFileName = parentFile.getName();
    parentFile.makeCopy(parentFileName, newParentFolderID);
  }

  /**
   * Due to limitations within the Google Drive API, there is no function to Copy Folders. 
   * We have to create a temporary folder to the original which contains all the files,
   * then move it to the Clone folder.
   */
  parentFolder.addFolder(newParentFolderID);
  DriveApp.getFolderById(parentFolderID).removeFolder(newParentFolderID);

  // Get subfolders within the subfolder.
  var childFolder = DriveApp.getFolderById(parentFolderID).getFolders();

  // Recursively rerun this function.
  while(childFolder.hasNext()) {
    var subFolder = childFolder.next();
    getSubFolders(subFolder, newParentFolderID);
  }
  return;
}

/**
 * This function runs immediately after we've displayed all the folders in our spreadsheet.
 * It will start by creating the menu to ask the user if they wish to copy subfolders and files.
 * It will then iterate through our FolderData array and start copying our folders.
 */

function copyFolders(folderData) {
  copySubDocsMenu(copySubFolders);
  if (copySubFolders == true || copySubFolders == false) {
    for (var u = 0 ; u < folderData.length; u++){
      //ss.toast(folderData[u]);

      // Fetch the folder and get the files from the original folder.
      var rootFolder = DriveApp.getFolderById(folderData[u][1]);
      var rootFiles = rootFolder.getFiles();
      
      // Alert the user that we're cloning the folder.
      ss.toast('Cloning files from '+folderData[u][2]+'.');

      // Create a new folder named 'Copy of Original Folder', then get its ID and URL
      var newRootFolderName = DriveApp.createFolder('Clone of '+folderData[u][2]);
      var newRootFolderID = DriveApp.getFolderById(newRootFolderName.getId());
      var newRootFolderURL = newRootFolderID.getUrl();

      // Iterate through the files of the original folder, then copy them with the same name to the new folder.
      while (rootFiles.hasNext()){
        var rootFile = rootFiles.next();
        var rootFileName = rootFile.getName();
        rootFile.makeCopy(rootFileName, newRootFolderID);
      }

      // If the user clicks 'Yes' on the subfolder Alert, grab the child folders.
      if (copySubFolders == true) {
        var childFolders = rootFolder.getFolders();
        while (childFolders.hasNext()) {
          var child = childFolders.next();
          getSubFolders(child, newRootFolderID);
        }
      }

      // Refer to the UserProperties, and mark the appropriate row as complete along with the clone name and URL to indicate it was successfully cloned. 
      var newFolderData = [folderData[u][2], "Completed", newRootFolderName, newRootFolderURL];
      let oldspot = parseInt(PropertiesService.getUserProperties().getProperties()[folderData[u].map(re => re).join()]); //This gets the last row used in the log sheet
      for (var s = 0; s < newFolderData.length; s++){
        sh.getRange(oldspot,s+1).setValue(newFolderData[s]);
        sh.getRange(oldspot,s+1).setBackground('#b6d7a8');
      }
      // A necessary line as Google Sheets doesn't always prioritize new changes. If not there, it won't update the rows until ALL folders are copied.
      SpreadsheetApp.flush();
    }
  } else {
    ss.toast('Clone cancelled.');
    sh.clear();
    return;
  }
}