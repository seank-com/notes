# Powershell Notes

```powershell
$ (gci -include *.cs,*.csproj,*.js,*.json,*.ps1,*.xml,*.yml -recurse | select-string .).Count
```