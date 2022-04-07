/**
 * Although disabled by default, I am including this function to retrieve and display the UserProperties if we ever need to
 * display them. It requires the user to create a new Sheet called 'User Properties'.
 */

function getUserProps() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName('User Properties');
  let uObj=PropertiesService.getUserProperties().getProperties();
  let keys = Object.keys(uObj);
  sh.clearContents();
  let a=[['Key','Value']];
  keys.forEach(k => {a.push([k,uObj[k]]);});
  sh.getRange(1,1,a.length, a[0].length).setValues(a);
  ss.toast('User Properties generated.');
}