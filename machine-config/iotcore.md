

## Creating the deployment image (for Hummingboard Edge):

Install required tools listed in the [README](https://github.com/ms-iot/project-kayla)

- I downloaded the following from the EEAP program
    - 17744.1001.180818-1845.rs5_release_amd64fre_ADK.iso
    - 17744.1001.180818-1845.rs5_release_WindowsSDK.iso
        - this had to be installed before the WDK I also needed to uncheck "Windows IP over USB" as it would not install (Error 1603)
    - 17744.1001.180818-1845.rs5_release_amd64fre_WDK.iso
    - 17744.1001.180818-1845.rs5_release_amd64fre_IOTCORE_PACKAGES.iso
        - I installed Windows_10_IoT_Core_ARM64_Packages.msi and Windows_10_IoT_Core_ARM_Packages.msi as the instructions said to "install the ARM packages"
- Follow the steps for environment setup


---------------------------
Microsoft Visual Studio
---------------------------
The 'Microsoft.Windows.Tools.WinIDE.Debugger.DebuggerPackage, DebuggerPackage, Version=10.0.0.0, Culture=neutral, PublicKeyToken=null' package did not load correctly.



The problem may have been caused by a configuration change or by the installation of another extension. You can get more information by examining the file 'C:\Users\v-seakel\AppData\Roaming\Microsoft\VisualStudio\15.0_63a459aa\ActivityLog.xml'.



Restarting Visual Studio could help resolve this issue.



Continue to show this error message?
---------------------------
Yes   No   
---------------------------


---------------------------
Microsoft Visual Studio
---------------------------
The 'DriverCommonPackage' package did not load correctly.



The problem may have been caused by a configuration change or by the installation of another extension. You can get more information by examining the file 'C:\Users\v-seakel\AppData\Roaming\Microsoft\VisualStudio\15.0_63a459aa\ActivityLog.xml'.



Restarting Visual Studio could help resolve this issue.



Continue to show this error message?
---------------------------
Yes   No   
---------------------------


---------------------------
Microsoft Visual Studio
---------------------------
The 'DriverTargetConfigPackage' package did not load correctly.



The problem may have been caused by a configuration change or by the installation of another extension. You can get more information by examining the file 'C:\Users\v-seakel\AppData\Roaming\Microsoft\VisualStudio\15.0_63a459aa\ActivityLog.xml'.



Restarting Visual Studio could help resolve this issue.



Continue to show this error message?
---------------------------
Yes   No   
---------------------------


---------------------------
Microsoft Visual Studio
---------------------------
The 'Microsoft.DriverKit.WdkTestPackage.DriverTestPackage, DriverTestPackage, Version=10.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35' package did not load correctly.



The problem may have been caused by a configuration change or by the installation of another extension. You can get more information by examining the file 'C:\Users\v-seakel\AppData\Roaming\Microsoft\VisualStudio\15.0_63a459aa\ActivityLog.xml'.



Restarting Visual Studio could help resolve this issue.



Continue to show this error message?
---------------------------
Yes   No   
---------------------------

---------------------------
Microsoft Visual Studio
---------------------------
The 'Microsoft.MetadataAuthoring.DriverKit.MetadataMenuPackage, MetadataAuthoringMenu, Version=0.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35' package did not load correctly.



The problem may have been caused by a configuration change or by the installation of another extension. You can get more information by examining the file 'C:\Users\v-seakel\AppData\Roaming\Microsoft\VisualStudio\15.0_63a459aa\ActivityLog.xml'.



Restarting Visual Studio could help resolve this issue.



Continue to show this error message?
---------------------------
Yes   No   
---------------------------






I have notes from Amy on creating an FFU based on the steps [here](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/iot-core-manufacturing-guide). The questions that we have are all around managing updates to the application and the OS after the devices are in the field. From reading the links you’ve provided below, this [link](https://docs.microsoft.com/en-us/windows/iot-core/commercialize-your-device/iotcoreservicesoverview) hints that all this is possible through the Azure IoT Device Management but it is not clear how.

[Archana] It is not just Azure device management.  The subscription lets the customer have control over the updates (both App and OS updates) using Device Update Center. 

This [link](https://docs.microsoft.com/en-us/windows-hardware/service/iot/updating-iot-core-apps) makes it sound like Microsoft Store, Device Update Center, Azure IoT Device Management and OMA-DM are all orthogonal, but that doesn’t make sense because OS updates can’t come through the Microsoft Store, so there must be an interaction of multiple services there but it is not clear which ones are necessary and which ones are optional.

[Archana] The link you mentioned is talking about App updates and not OS updates. 

The customer wants to control app and OS updates to their device in the field. What is the best strategy for doing this? 

[Archana] Device update Center looks like their best option since they need both app and OS updates. 

They do not have any custom drivers so I believe they don’t need Device Update Center, right? They are hoping to ship on a Raspberry PI, we are hoping to try and talk them into using something else, but I can’t find the webpage with Microsoft approved DevBoards that already have BSPs available. This customer does not have hardware engineers and has no desire to build a custom piece of hardware. They are looking for an off the shelf solution like the Raspberry Pi. 

[Archana] The devices supported by Windows IoT core are list [here](https://docs.microsoft.com/en-us/windows/iot-core/learn-about-hardware/socsandcustomboards). The customer could pick one of these boards.
 
----

Below are the links that will answer your questions:
http://aka.ms/iotcoreservices
http://aka.ms/iotupdates
https://docs.microsoft.com/en-us/windows-hardware/service/iot/updating-iot-core-apps
http://aka.ms/deviceupdatecenter
 
-----

https://github.com/ms-iot/project-kayla