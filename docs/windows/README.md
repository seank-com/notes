# Windows Notes

## EnableLinkedConnections

Press <kbd>Win</kbd>+<kbd>R</kbd>, type ```regedit```, click OK

Navigate to ```HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System```

Create a new DWORD (32-bit) Value named ```EnableLinkedConnections``` and set it to ```1```

Close the Registry Editor and restart your computer

## Connecting Network Drives

Launch an elevate command prompt

```batch
net use z: \\server\share /persistent:yes
```

## UNC to IPv6 address

Windows UNC notation permits you to use a raw IPv4 address in dotted notation as a server name: For example, ```net view \\127.0.0.1``` will show you the shared resources on the computer whose IP address is 127.0.0.1. But what about IPv6 addresses? IPv6 notation contains colons, which tend to mess up file name parsing since a colon is not a valid character in a path component. Enter the ipv6-literal.net domain. Take your IPv6 address, replace the colons with dashes, replace percent signs with the letter “s”, and append .ipv6-literal.net. This magic host resolves back to the original IPv6 address, but it avoids characters which give parsers the heebie-jeebies.

Note that this magic host is resolved internally by Windows and never hits the network. It’s sort of a magic escape sequence.
