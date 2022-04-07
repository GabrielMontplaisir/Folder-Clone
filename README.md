# Folder-Clone
A Google Apps Script designed to allow the user to copy Google Drive folders, since Google doesn't allow it by default. Currently doesn't work because it needs to be published as an Add-on. 

This is a script I created in order to solve one of Google Drive's most frustraing "non-feature": The inability to copy an entire folder. This document is already loaded with the script. You can easily just start using it in just a few clicks.

What you can do with this script:

- Copy folders that are shared with you (and you would like to make you own copy)
- Copy an entire directory (yes, it can copy subfolders, subfolders of subfolders, subfolders of sub...You get the idea.)
- Copy MULTIPLE folders at once!

What it cannot do:

- Copy folders in Shared Drives...yet. (I'm working on it).
- Make your coffee in the morning.
- Walk your dog.

## Installation

**Click on the website to the right to create a copy template of the Folder Clone**

## Usage

Under the 'Add-ons' Menu, find Folder Clone, then choose Select Folders.

The first time you run the script, it will ask you to authorize the application on two occasions: The first when you run the menu, and a second when you click on 'Select Folders'. It will warn you that it is unverified both times. This is normal! The script hasn't been verified by Google (It costs like $15,000). I do not log any of your personal info. The script requires access to your Google Drive in order to create copies for you. Click Advanced, and then Continue.

Once you click on Select Folders, a dialog menu will appear. Wait a few more seconds and your Drive folder should appear. 

From here, nagivate to the folder you wish to copy, click on it and hit Select.
You cannot select files as it's not the purpose of the script. To copy files, simply copy them in Google Drive.
You can select MULTIPLE folders at once by Shift+Click or Ctrl+Click on multiple folders at once.

You can select MULTIPLE folders at once by Shift+Click or Ctrl+Click on multiple folders at once.If you wish to copy a Shared Folder (not from a Shared Drive), use the search function to retrieve it.

Once you select a folder, you will receive a prompt to ask if you wish to copy subfolders and files.
Clicking 'Yes' will start copying ALL subfolders and files within the selected folder.
This is a lengthy process and will significantly take more time if you have a LARGE folder. I HIGHLY recommend you only select one folder at a time if you choose this option.
Clicking 'No' will simply copy the files within the selected folders.

And let it do its thing! You will notice the folders are shown on your screen saying 'In Progress'. You will receive some occasional alerts to tell you what is happening in the background. Once completed, the spreadsheet will update with to green with the new cloned folder and a link to it (You can also find it under 'My Drive' in Google Drive).

Please keep in mind that the more folders you copy, the longer the process takes. Large folders will take more time than smaller ones. I recommend you select fewer folders to clone if you know the folders have many documents. 	