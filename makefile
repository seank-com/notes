RSYNCFLAGS =\
	-av \
	--progress \
	--exclude='$RECYCLE.BIN' \
	--exclude='$Recycle.Bin' \
	--exclude='.AppleDB' \
	--exclude='.AppleDesktop' \
	--exclude='.AppleDouble' \
	--exclude='.com.apple.timemachine.supported' \
	--exclude='.dbfseventsd' \
	--exclude='.DocumentRevisions-V100*' \
	--exclude='.DS_Store' \
	--exclude='.fseventsd' \
	--exclude='.PKInstallSandboxManager' \
	--exclude='.Spotlight*' \
	--exclude='.SymAV*' \
	--exclude='.symSchedScanLockxz' \
	--exclude='.TemporaryItems' \
	--exclude='.Trash*' \
	--exclude='.vol' \
	--exclude='.VolumeIcon.icns' \
	--exclude='Desktop DB' \
	--exclude='Desktop DF' \
	--exclude='hiberfil.sys' \
	--exclude='lost+found' \
	--exclude='Network Trash Folder' \
	--exclude='pagefile.sys' \
	--exclude='Recycled' \
	--exclude='RECYCLER' \
	--exclude='System Volume Information' \
	--exclude='Temporary Items' \
	--exclude='Thumbs.db' \

instructions:
	@echo be sure the connect all keeper shares then run 
	@echo
	@echo make backup
	@echo
	@echo current connected shares (should see Admin, Data, Media, Personal, Programs, Projects, Resources, Scratch)
	@ls /Volumes

backup: admin data personal programs projects resources scratch media

admin:
	@echo Admin
	@rsync $(RSYNCFLAGS) /Volumes/Admin /Volumes/Backup

data:
	@echo Data
	@rsync $(RSYNCFLAGS) --exclude='Pluralsight' /Volumes/Data /Volumes/Backup

media:
	@echo Media
	@mkdir -p ./Media
	@rsync $(RSYNCFLAGS) /Volumes/Media/Audio /Volumes/Backup/Media

personal:
	@echo Personal
	@rsync $(RSYNCFLAGS) /Volumes/Personal /Volumes/Backup
	@rsync $(RSYNCFLAGS) /Volumes/Media/Personal/ /Volumes/Backup/Personal-Media

programs:
	@echo Programs
	@rsync $(RSYNCFLAGS) /Volumes/Programs /Volumes/Backup

projects:
	@echo Personal
	@rsync $(RSYNCFLAGS) /Volumes/Projects /Volumes/Backup

resources:
	@echo Resources
	@rsync $(RSYNCFLAGS) /Volumes/Resources /Volumes/Backup

scratch:
	@echo Scratch
	@rsync $(RSYNCFLAGS) /Volumes/Scratch /Volumes/Backup
