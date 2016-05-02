'Script Name:VerifyImage
'Purpose: To verify a shoe image is displaying along with shoe description

'Declare variales and assign values
Dim sUrl,oBrow,oPg,oTabDesc,cTab
sUrl="https://rocky-tor-93182.herokuapp.com/"

''Open Chrome to launch application
SystemUtil.Run "chrome.exe",sUrl,,,3
Wait(5)

Set oBrow=Browser("Shoe Store")
Set oPg=oBrow.Page("Shoe Store:")
oPg.Sync

'click on January Month
oPg.Link("innertext:=January").Click
oPg.Sync
if oPg.WebElement("wb_Shoes").Exist(2) then
	'Click on a brand
	oPg.Link("Jimmy Choo").Click
	Wait(2)
	Set oImgDesc=Description.Create()
	oImgDesc("micclass").Value="Image" 	
	set cImg=oPg.childobjects(oImgDesc)
	iImgCount=cImg.Count
	
	Set oLinkDesc=Description.Create()
	oLinkDesc("micclass").Value="Link" 	
	oLinkDesc("name").value="Jimmy Choo"
	set cLink=oPg.childobjects(oLinkDesc)
	iLinkCount=cLink.Count	
	
	If (iImgCount-1)=iLinkCount Then
		Reporter.ReportEvent micPass,"Images Lookup","All show images are present"
	else
		Reporter.ReportEvent micFail,"Images Lookup","Shoe images are missing for this brand"	
	End If
else
	Reporter.ReportEvent micFail,"Brand Search","Brand search did not return any results"
End if

oBrow.Close

Set oPg=Nothing
Set oBrow=Nothing
