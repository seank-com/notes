# Win 10 IoT Core BSP and Image Generation

## Quick Overview
The IoT ADK Addon Kit is a set of powershell applets for configuring and building IoT Core Images. This process points to input files, creates packages and “features” from these inputs, and then combines them all together at the end.

Because of this there are a variety of inputs that all need to be tracked but do not necessarily live within the workspace of the project.  They are merely inputs and could change. For example your application could be rebuilt into a new version. Or you may have external drivers which are provided by a vendor which you wish to include within your image.

For this reason we have worked on a useful structure for organizing your files related to a build. This structure is also recommended because absolute paths should always be used, additionally spaces should never be in a path or file name.

### Recommended Directory Structure
* C:\
    * <project_root>   
        * apps
        * certificates
        * lib
            * bsps
            * config            _This is used for things like the Device Update Center Config_
            * drivers
            * files
            * scripts
        * prov
        * workspace             _This is the iot-adk workspace. You should absolutely track this independently as well_
            * Build
            * Common
            * Source-arm

**NOTE:** *Do not put spaces in the path for you project root. Consider using source control for your apps, drivers, files, scripts and workspace. the config folder holds the Device Update Center Config, the workspace folder is for the iot-adk workspace*


## Toolchain Installation (See [here](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/set-up-your-pc-to-customize-iot-core) or [here](https://aka.ms/deviceupdatecenter) for more details)
**Note:** *All packages/components must be based on same Win 10 Version. No Exceptions!*

1.	Install [adksetup.exe](https://go.microsoft.com/fwlink/?LinkId=526803). Leave all options/paths to default.
2.	Install [wdksetup.exe](http://developer.microsoft.com/windows/hardware/windows-driver-kit). Leave all options/paths to default.
3.	Install the packages required for your architectures from [Windows10_IoTCore_Packages_ARM32_en-us_17763Oct.iso](https://www.microsoft.com/en-us/software-download/windows10iotcore)
    * Windows_10_IoT_Core_ARM_Packages.msi
    * Windows_10_IoT_Core_ARM64_Packages.msi
    * Windows_10_IoT_Core_x64_Packages.msi
    * Windows_10_IoT_Core_x86_Packages.msi from the 
4.	Extract [iot-adk-addonkit-master.zip](https://github.com/ms-iot/iot-adk-addonkit/archive/master.zip) to a known working directory. (Ex: “C:\\<something_without_spaces>”)
5.	Install the [Windows 10 IoT Core Dashboard](https://go.microsoft.com/fwlink/p/?LinkId=708576)
6.	Buy and obtain an EV Signing Certificate.
7.	Buy and obtain an EV Signing Certificate, Cross signature capable.
8.	Reboot after Installation.

## IoT Core Manufacturing Guide
### Default Image Generation
#### From “[Lab 2: Create/Load a BSP](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/create-a-new-bsp)”

1.	Run as admin the "IoTCorePShell.cmd" script in the iot-adk-addonkit. SHOULD NOT have errors!
2.  Create the workspace
    ```
    new-ws <target_folder> <oem_name> <proc_architecture>
    ```
    
    Example
    ```
    PS C:\> new-ws C:\rheometer\workspace PolymerLabs arm
    ```
3.	Import the BSP into the workspace
    * Qualcomm:
        1. Place the db410c_bsp.zip in a convenient path without spaces. 
        2. Import the BSP
            ```
            Import-QCBSP “path_to_bsp.zip” C:\prebuilt\DB410c_BSP -ImportBSP  
            ```
        3. Build the packages for the BSP after imporation:

    * Raspberry Pi
        1. Place the RPi2_BSP.zip in a convenient path without spaces.
        2. Import the BSP
            ```
            importbsp RPi2 <path_to_bsp.zip>  
            ```
      
            Example  
            ```
            PS C:\rheometer\workspace> importbsp RPi2 c:\work\IoTCore\RPi_BSP.zip
            ```
        3. Build the packages
            ```
            PS C:\rheometer\workspace> buildpkg All
            ```
    * iMX
        1. Unknown

#### From “[Lab 1a: Create a basic image](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/create-a-basic-image)”
1.	Import the packages for your project, either selectively or all in the sample workspace.
    * Import all packages: 
      ```
      importpkg *
      ```
      Example
      ```
      PS C:\rheometer\workspace> importpkg *
      ```
    * Import selectively: 
      ```
      importpkg <package_name>
      ```
1.  Import the [Device Update Center](#device-update-center) configuration.
1.	Build the packages that you’ve imported.
    ```
    buildpkg All
    ```
1.	Create a [new product](https://github.com/ms-iot/iot-adk-addonkit/blob/master/Tools/IoTCoreImaging/Docs/Add-IoTProduct.md). This is where BSP, Architecture, and Package selection combine.
    ```
    newproduct <productName> <bspName>
    ```  
    **bspName choices:** 
    - DCDB410C
      - Qualcom Dragonboard
    - RPi2
      - (Raspberry Pi)  

    Example
    ```
    PS C:\rheometer\workspace> newproduct Rheometer RPi2
    ```

    The fields below all tie into the Device Update Center labeling

    Example
    ```
    OemName: PolymerLabs
    FamilyName: Rheometer   
    SkuNumber: 1234567   
    Baseboard Mfr: RaspberryPi  
    BaseboardProduct: Arm   
    ```

1.	Build the FFU image
    ```
    buildimage <product_name> <Test|Retail>
    ```
    Example
    ```
    PS C:\rheometer\workspace> buildimage Rheometer Test
    ```

1.	Load the image onto the device.

### Add an App Package to your image
#### From “[Lab 1b: Add an app to your image](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/deploy-your-app-with-a-standard-board)”

Build a package for your application.

1.	Once you have built your APPX for your UWP app do the following.
    ```
    newappxpkg <path_to_appx> <fga|bgt> Appx.<application_name>
    ```

    **Note:** Alphanumerics only for the application_name.  ```bgt``` = Background Tasks (will be set to start automatically) ```fga``` = Foreground Applications

    Example
    ```
    PS C:\rheometer\workspace> newappxpkg "C:\rheometer\apps\Monitor\AppPackages\Monitor_1.1.208.0_ARM_Test\Monitor_1.1.208.0_ARM.appx" fga Appx.Monitor

    ```  
1.	Now build your packages
    ```
    PS C:\rheometer\workspace> buildpkg Appx.*
    ```
1.	Now add the feature representing the application into your product *(this is a good time to remove the developer features)*

    Example
    ```
    PS C:\> addfid Rheometer Test APPX_MONITOR -OEM

    PS C:\> removefid Rheometer Test IOT_BERTHA

    PS C:\> removefid Rheometer Test IOT_ALLJOYN_APP

    PS C:\> removefid Rheometer Test IOT_NANORDPSERVER

    PS C:\> removefid Rheometer Test IOT_APPLICATIONS
    ```
1.	Repeat the above for every application

### Add Custom Registry and Files
#### From "[Lab 1c: Add a file and registry setting to an image](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/add-a-registry-setting-to-an-image)
#### Files
1.	Create an array with the listing of files you wish to include.
    ```Powershell
    $myfiles = @(  
    ("`$(runtime.system32)","C:\Temp\TestFile1.txt", ""),  
    ("`$(runtime.bootDrive)\OEMInstall","C:\Temp\TestFile2.txt", "TestFile2.txt")  
    )
    ```  
1. Add the IoT File Package to the workspace
    ```
    Add-IoTFilePackage <package_name> $myfiles  
    ```
    We recommend Files._yourNameHere_ as a pattern for Files package names.

2. Build the new package.
    ```
    buildpkg <package_name>
    ```
3. Add the package to your product
    ```
    addfid <product_name> [Test|Retail] <PACKAGE_NAME> -OEM
    ```

#### Registry
1. Create an array with the listing of registry entries you wish to bundle in a package.
    ```Powershell
    $packagekeyarray = @(
    ("`$(hklm.software)\`$(OEMNAME)\Test","StringValue", "REG_SZ", "Test string"),
    ("`$(hklm.software)\`$(OEMNAME)\Test","DWordValue", "REG_DWORD", "0x12AB34CD")
    )
    ```
1. Add this registry collection as a package.
    ```
    Add-IoTRegistryPackage <package_name> $packagekeyarray
    ```

    We recommend Registry._yourNameHere_ as a pattern for Registry package names.

1. Build the new package
    ```
    buildpkg <package_name>
    ```

1. Add the package name into your product
    ```
    addfid <product_name> [Test|Retail] <PACKAGE_NAME> -OEM 
    ```

### Add a Driver to the image
#### From "[Lab 1e: Add a driver to an image](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/add-a-driver-to-an-image)"

Build a package for your driver.
1. Create a package for the driver.
    ```
    newdrvpkg <path_to_inf> <package_name>
    ```
    We recommend Drivers._yourNameHere_ as a pattern for Drivers package names.

2. Build the package
    ```
    buildpkg <package_name>
    ```

3. Add the package to your product
    ```
    addfid <product_name> [Test|Retail] <PACKAGE_NAME> -OEM
    ```

### Device Update Center
#### From "[Using Device Update Center](https://docs.microsoft.com/en-us/windows-hardware/service/iot/using-device-update-center)"

Setup your environment
1. Configure your workspace to use your EV Code Signing certificate and cross signing certificate. Use only one of the following formats for each tag.
    ```XML
    <!--Specify the retail signing certificate details, Format given below -->
    <RetailSignToolParam>/s my /i "Issuer" /n "Subject" /ac "C:\CrossCertRoot.cer" /fd SHA256</RetailSignToolParam>
    <RetailSignToolParam>/s my /sha1 "fingerprint for certificate here" /ac "C:\CrossCertRoot.cer" /fd SHA256</RetailSignToolParam>
    <RetailSignToolParam>/f "C:\CertificatePath\CertName.cer" /ac "C:\CrossCertRoot.cer" /fd SHA256</RetailSignToolParam>
    <!--Specify the ev signing certificate details, Format given below -->
    <EVSignToolParam>/s my /sha1 "fingerprint for certificate here" /fd SHA256</EVSignToolParam>
    <EVSignToolParam>/s my /i "Issuer" /n "Subject" /fd SHA256</EVSignToolParam>
    <EVSignToolParam>/f "C:\CertificatePath\CertName.cer" /fd SHA256</EVSignToolParam>
    ```
2. [Register your device](https://docs.microsoft.com/en-us/windows-hardware/service/iot/using-device-update-center#step-3-register-device-model-in-device-update-center) model in the [Device Update Center](https://partner.microsoft.com/en-us/dashboard/)

    Now that you have the CUSConfig.zip, you need to bring that into your environment.

1. Import the CUSConfig.zip
    ```
    importcfg <product_name> <CUSConfig.zip_path>
    ```

2. You need to sign all 

### Other Configuration Notes:

1.	For a headless device:
    ```
    addfid <product_name> [Test|Retail] IOT_HEADLESS_CONFIGURATION
    ```

1. Validate the signatures on the CABs.
    ```
    Test-IoTSignature <file> [Test|Retail]
    ```


## Addendum

### Updating BIOS for Rapberry Pi

The [Device Update Center User Guide](https://aka.ms/deviceupdatecenter) says 'For other platforms, you will have to update the BIOS to reflect these values.'

The following are the steps necessary to do this for the Raspberry Pi

1. Clone the https://github.com/ms-iot/RPi-UEFI
2. Install the ARM embedded tool chain from https://launchpad.net/gcc-arm-embedded/4.8
3. Edit the PlatformSmbiosDxe.c in [both](https://github.com/ms-iot/RPi-UEFI/blob/ms-iot/Pi3BoardPkg/Drivers/PlatformSmbiosDxe/PlatformSmbiosDxe.c#L145) [places](https://github.com/ms-iot/RPi-UEFI/blob/ms-iot/Pi3BoardPkg/Drivers/PlatformSmbiosDxe/PlatformSmbiosDxe.c#L180)
4. Build the DEBUG version of kernel.img (RELEASE version currently doesn’t build)
5. Copy C:\Program Files (x86)\Windows Kits\10\MSPackages\retail\arm\fre\RASPBERRYPI.RPi2.BootFirmware.cab to a new folder c:\CAB
6. unpack the cab
    ```
    PS C:\CAB> pkgsigntool unpack .\RASPBERRYPI.RPi2.BootFirmware.cab /out:./files
    ```
7. Copy ```kernel.img``` from step 4 to replace ```C:\CAB\files\5.img```
8. update package
    ```
    PS C:\CAB> pkgsigntool update ./files
    ```
9. rebuild catalog
    ```
    PS C:\CAB> makecat .\files\content.cdf
    ```
10. sign it
    ```
    PS C:\CAB> sign .\files\update.cat
    ```
11. create a new CAB
    ```
    PS C:\CAB> pkgsigntool repack .\files /out:RASPBERRYPI.Rheometer.BootFirmware.cab
    ```
12. Copy new cab file to ```C:\Program Files (x86)\Windows Kits\10\MSPackages\retail\arm\fre```
13. Edit ```Source-arm\BSP\Rpi2\Packages\RPi2FM.xml``` in your workspace to point to the new cab instead of the old one
14. Rebuild image
    ```
    PS C:\rheometer\workspace> retailsign On
    buildpkg all
    signbinaries C:\rheometer\workspace *.sys, *.dll, *.exe
    buildimage Rheometer Retail
    ```

### Creating an update

```
PS C:\rheometer\workspace> newappxpkg "C:\rheometer\apps\Monitor\AppPackages\Monitor_1.1.209.0_ARM_Test\Monitor_1.1.209.0_ARM.appx" fga Appx.Monitor
PS C:\rheometer\workspace> Set-IoTCabVersion 10.0.0.1
PS C:\rheometer\workspace> retailsign On
PS C:\rheometer\workspace> buildpkg all
PS C:\rheometer\workspace> signbinaries c:\rheometer\workspace *.sys, *.dll, *.exe
PS C:\rheometer\workspace> buildimage Rheometer retail
PS C:\rheometer\workspace> Export-IoTDUCCab Rheometer retail
```

### Collecting logs

Logs files exist in the following locations:

```
C:\Data\SystemData\NonETWLogs
C:\Data\Programdata\softwaredistribution\Logs
C:\Data\Programdata\UsoShared\Logs
C:\Data\Programdata\softwaredistribution\reportingevents.log
```
