#mkdir /Volumes/nas-backup/Media
#mkdir /Volumes/nas-backup/Media/Personal
#mkdir /Volumes/nas-backup/Personal
#mkdir /Volumes/nas-backup/Programs
#mkdir /Volumes/nas-backup/Programs/3D\ Graphics
#mkdir /Volumes/nas-backup/Programs/Applications
#mkdir /Volumes/nas-backup/Programs/Drivers
#mkdir /Volumes/nas-backup/Programs/Graphics
#mkdir /Volumes/nas-backup/Programs/Media
#mkdir /Volumes/nas-backup/Programs/Media/Audio
#mkdir /Volumes/nas-backup/Programs/Media/Video
#mkdir /Volumes/nas-backup/Programs/Utilities

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Media/Personal/ /Volumes/nas-backup/Media/Personal/

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Personal/ /Volumes/nas-backup/Personal/

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Bryce\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Bryce\ Content\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/CLIP\ Studio\ Paint\ Pro\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Carrara\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Carrara\ Content\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Content\ Paradise\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/DAZ\ Studio\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/DAZ\ Studio\ Content\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Hexagon\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/PhilC.net\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Poser\ 10\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Poser\ 9\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Poser\ Content\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Poser\ Pro\ 11\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Poser\ Pro\ 11.3\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Poser6\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Poser7\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/Reality\ 3\ for\ Poser\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/3D\ Graphics/ZBrush\ \(purchased\) /Volumes/nas-backup/Programs/3D\ Graphics

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Applications/e-Sword /Volumes/nas-backup/Programs/Applications
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Applications/MasterCook /Volumes/nas-backup/Programs/Applications

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Drivers/SpaceNavigator\ PE /Volumes/nas-backup/Programs/Drivers

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Graphics/Anime\ Studio\ Pro\ 8\ \(purchased\) /Volumes/nas-backup/Programs/Graphics/
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Graphics/Manga\ Studio\ 4\ EX\ \(purchased\) /Volumes/nas-backup/Programs/Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Graphics/Natural\ and\ Digital\ Painting\ Kit\ Humble\ Bundle /Volumes/nas-backup/Programs/Graphics
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Graphics/Xara\ \(purchased\) /Volumes/nas-backup/Programs/Graphics

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/MacSoftware /Volumes/nas-backup/Programs
  
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Audio/AV\ Voice\ Changer\ Basic\ \(purchased\) /Volumes/nas-backup/Programs/Media/Audio
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Audio/Audio\ Cleaning\ Lab\ 2013\ \(purchased\) /Volumes/nas-backup/Programs/Media/Audio
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Audio/Magix\ Humble\ Bundle /Volumes/nas-backup/Programs/Media/Audio
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Audio/Magix\ Music\ Studio\ 2\ \(purchased\) /Volumes/nas-backup/Programs/Media/Audio
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Audio/Magix\ MusicMaker\ \(purchased\) /Volumes/nas-backup/Programs/Media/Audio
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Audio/Magix\ Soundpool\ 18\ DVD\ Collection\ \(purchased\) /Volumes/nas-backup/Programs/Media/Audio
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Audio/Music\ Maker\ 2014\ Premium\ \(purchased\) /Volumes/nas-backup/Programs/Media/Audio

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Video/Movie\ Edit\ Pro\ 2014\ \(purchased\) /Volumes/nas-backup/Programs/Media/Video
#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Media/Video/Rescue\ Your\ Video\ Tapes\ \(purchased\) /Volumes/nas-backup/Programs/Media/Video

#rsync -avP --delete-after --exclude-from=excludes /Volumes/Programs/Utilities/Display\ Fusion\ \(purchased\) /Volumes/nas-backup/Programs/Utilities

rsync -avP --delete-after --exclude-from=excludes /Volumes/Data /Volumes/nas-backup/
