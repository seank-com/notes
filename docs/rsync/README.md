## Bi weekly NAS drive backup

```bash
$ cd /Volumes/USBDrive
$ mkdir nas-bu<todays-date>
$ sudo rsync -ahHP --del --exclude ".Trashes" --link-dest=/Volumes/USBDrive/nas-bu<date-of-previous-backup>/ /Volumes/DroboFS/tdd120570109/1/ /Volumes/USBDrive/nas-bu<today’s-date>/

$ rsync -av --progress --exclude ".Trashes" /Users/seank/Desktop/Personal/E-Books/ /Volumes/Data/E-Books/

$ rsync -av --progress --exclude ".Trashes" --exclude ".DS_Store" /Volumes/Admin /Volumes/Backup

$ rsync -avP --delete-after --exclude-from=excludes /Volumes/Media/Personal/ /Volumes/nas-backup/Media/Personal/
$ rsync -avP --delete-after --exclude-from=excludes /Volumes/Personal/ /Volumes/nas-backup/Personal/
```