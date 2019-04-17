Below is a list of pros and cons of using Windows IoT Core vs Linux with regard to OTA updates

## Window IoT Core

### Pros
- LTS is 10 years
- Easy deployment management through **Device Update Center**
- The Visual Studio C# development toolchain is super easy
  
### Cons
- LTS costs $0.30/device/month
- Deployment only allows for 3 rings of granularity (internal, preview, general)
- With .Net Core 3.0 its possible to use the same great toolchain and target Linux
- Documentation is in multiple places so it is hard to know which set of instructions are correct. 
  - For example the list of tools you need to install is provided [here](https://docs.microsoft.com/en-us/windows-hardware/manufacture/iot/set-up-your-pc-to-customize-iot-core#software) and [here](https://docs.microsoft.com/en-us/windows-hardware/service/iot/using-device-update-center#install-the-tools)
  - This is made even more difficult by the fact that names for values and settings are called different things in different places.
    - The **System Product Name** is referred in update portal as **Device Model**
    - **Base Board Product** is referred in the update portal as **Hardware Variant ID**
- There is no way to use your own keys. You need to purchase a Cross signature capable EV Signing Certificate (~$400/year), the docs also recommend you purchase an additional EV Signing Certificate (~$175/year), though you can use the first one for both purposes. *This is technically less secure (one key for two locks)*
- Only the BSP for the Dragonboard is data driven, for all other platforms, you will need to build a custom BIOS.
- The number of steps and details is immense. The whole process has taken nearly 4 weeks of full time work to get through.
- Many BSPs are poorly supported by third part OEMs. Examples include:
  - Dragonboard's display driver is hard coded to 1024x768 so it does not work correctly with displays of different sizes. This is made more problem matic because the touch driver does work correctly. So for example if you connect an 800x600 touch display it will render the upper left 800x600 of a 1024x768 display, but the touch sensor will map touchs to 1024x768 so the button's hitbox is slightly up and to the left of where it is rendered on screen. Dragonboard's embedded Android OS supports every screen size we tested.
  - Dragonboard's GPS driver requires ethernet access to get accurate timing to resolve its position. Dragonboard's embedded Android OS can resolve position without an ethernet connection
  - Raspberry Pi's display driver cannot access the GPU, consequently videos playback at no more than 5 FPS, Raspbian on the same device can play full 1080p at 30 FPS
  
## Linux

### Pros
- Many hardware engineers have already worked with Linux so it is well understood
- Updating is a matter of spawning a single shell command ```apt update && apt upgrade```
- You don't have to compile kernel drivers
- BSPs are well supported
- No extra charges for LTS or Certificates
### Cons
- LTS is only 5 years
- Documentation is in multiple places so it is hard to know which is correct
- You have to implement your own deployment management (there is not much to it, we can help customers do this in about two days in the lab)