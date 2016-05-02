'Script Name:VerifyInvalidEmail
'Purpose: To verify application accepts invalid email format.

'Declare variales and assign values
Dim sUrl,oBrow,oPg
sUrl="https://rocky-tor-93182.herokuapp.com/"
sInvalidEmail="rama@gmail,com"

''Open Chrome to launch application
SystemUtil.Run "chrome.exe",sUrl,,,3
Wait(5)

Set oBrow=Browser("Shoe Store")
Set oPg=oBrow.Page("Shoe Store:")
oPg.Sync
'click on January Month
oPg.Link("innertext:=January").Click
oPg.Sync
if oPg.WebElement("January's Shoes").Exist(2) then
'Click on a brand
	oPg.Link("Jimmy Choo").Click
	oPg.Sync
	if oPg.WebButton("Submit Query").Exist(1) then
		oPg.WebEdit("email").Set sInvalidEmail
		oPg.WebButton("Submit Query").Click
		oPg.Sync
		If oPg.WebElement("Thanks! We will notify").Exist(3) Then
			Reporter.ReportEvent micFail,"Invalid Email","Invalid email accepted:"&sInvalidEmail
		End If
	Else
		Reporter.ReportEvent micFail,"Email Submit","Email Submit button do not exist"
	End if	
else
	Reporter.ReportEvent micFail,"Brand Search","Brand search did not return any results"
End if
