---
title: "Installing Arch Linux with Full Disk Encryption, Btrfs and GRUB"
excerpt: "A straight to the point reference guide on how I have set up my Arch installation on my personal laptop."
date: "2022-10-11"
---

# Installing Arch Linux with Full Disk Encryption, Btrfs and GRUB

A straight to the point reference guide on how I set up my Arch installation on my personal laptop. Some prior knowledge of installing and/or using Arch/Linux is probably required to follow this guide. I **highly** recommend that you have a second machine to ssh from, as it will make your life easier to copy and paste the commands.

## My motivation and choices

- Arch Linux

  - I generally prefer a rolling release distro that have newer packages and the AUR to install packages that are not in the official repositories.

- Full Disk Encryption, excluding /boot partition
  - The security from full disk encryption for a portable device and the convenient of not having `/boot` partition encrypted and carrying around a physical keyfile. Yes, I am aware of Evil maid attack, but the attack requires me to leave my device unatendded over a longer period of time and requiring them to have physical access to my device twice. It is a price I will pay for the convenient of not carrying around a keyfile with me.
- Btrfs filesystem
  - Subvolumes and easy snapshots for rollback.
- GRUB bootloader
  - Unfortunately systemd-boot does not support [grub-btrfs](https://github.com/Antynea/grub-btrfs) to automatically add snapshots in the booting menu.
- Btrfs swapfile - Post install (W.I.P)
  - Easier to resize compared to a swap partition where you need to re-partiton.
- Snapper - Post install (W.I.P)
- grub-btrfs - Post install (W.I.P)

## Set keymap and wifi

```bash
loadkeys <keymap>       # loadkeys dk

rfkill unblock wifi     # unblock wifi
```

```bash
iwctl --passphrase <passphrase> station wlan0 connect <SSID>

dhcpcd

ping archlinux.org      # Check for connection
```

Create a temporary password for `root` with `passwd` so we can login with ssh. `sshd` is already running by default. If you need to start it manually you can do so by `systemctl start sshd`.

From another machine, ssh onto your laptop with `ssh root@IP-ADDR` or `ssh root@archiso`.

You can find your local IP address with `ip addr show`.

## Partition disk

Use `lsblk` to identify your block device. i.e. `/dev/nvme0n1` or `/dev/sda`.

Create two partitions, one for `/boot` of type EFI sized `512M` and a root partition with remaning of disk space.

Use your favorite partitioning tool.

```bash
cfdisk /dev/nvme0n1

# Create 2 partitions
# 1. EFI partition 512M /dev/nvme0n1p1
# 2. ARCH partition (100%) /dev/nvme0n1p2
```

## Full Disk Encryption

We add encryption to our root partition, leaving only `/boot` unencrypted.

```bash
cryptsetup --hash sha512 --key-size 512 --iter-time 5000 -y luksFormat --label ARCH_LUKS <DEVICE PARTITION>
```

Read more about [cryptsetup](https://wiki.archlinux.org/title/Dm-crypt/Device_encryption#Encryption_options_for_LUKS_mode) options.

Open the LUKS container.

```bash
cryptsetup --perf-no_read_workqueue --perf-no_write_workqueue --persistent open /dev/nvme0n1p2 cryptroot
```

Read about [no_read/write_workqueue flags](<https://wiki.archlinux.org/title/Dm-crypt/Specialties#Disable_workqueue_for_increased_solid_state_drive_(SSD)_performance>) for SSD and the increased performance.

If you are installing to a HDD you omit the workqueue flags.

```bash
cryptsetup open /dev/sda2 cryptroot
```

Format the partitions

```bash
mkfs.btrfs -L ARCH /dev/mapper/cryptroot
mkfs.fat -F32 -n EFI /dev/nvme0n1p1
```

## Mount volumes

Create subvolumes to exclude certain directories from snapshots and create the swap subvolume.

```bash
mount -o compress=zstd,noatime /dev/mapper/cryptroot /mnt
btrfs su cr /mnt/@          # /
btrfs su cr /mnt/@home      # /home
btrfs su cr /mnt/@vlog      # /var/log
btrfs su cr /mnt/@vcache    # /var/cache
btrfs su cr /mnt/@vtmp      # /var/tmp
btrfs su cr /mnt/@swap      # /swap
umount -R /mnt
```

Rremount the new subvolumes.

```bash
mount -o compress=zstd,noatime,subvol=@ /dev/mapper/cryptroot /mnt
mkdir -p /mnt/{home,boot,swap,var/{log,cache,tmp}}
mount -o compress=zstd,noatime,subvol=@home /dev/mapper/cryptroot /mnt/home
mount -o compress=zstd,noatime,subvol=@vlog /dev/mapper/cryptroot /mnt/var/log
mount -o compress=zstd,noatime,subvol=@vcache /dev/mapper/cryptroot /mnt/var/cache
mount -o compress=zstd,noatime,subvol=@vtmp /dev/mapper/cryptroot /mnt/var/tmp
mount /dev/nvme0n1p1 /mnt/boot
```

The swap subvolume will need to have [Copy-on-Write](https://wiki.archlinux.org/title/btrfs#Swap_file) disabled.

```bash
mount -o nodatacow,noatime,nodiratime,compress=no,subvol=@swap /dev/mapper/cryptroot /mnt/swap
chattr +C /mnt/swap
```

## pacstrap

Configure pacman to parallel download for a faster installation.

```bash
nano /etc/pacman.conf

# Uncomment ParallelDownloads
ParallelDownloads = 5

# Optional run reflector to use fast mirrors
reflector --latest 5 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
```

Pacstrap the system, optionally modify packages for your needs. Replace `amd-ucode` with `intel-ucode` if you are on a Intel machine.

```bash
pacstrap /mnt base base-devel linux linux-firmware git btrfs-progs grub efibootmgr sudo networkmanager neovim pipewire pipewire-alsa pipewire-pulse amd-ucode
```

Generate `fstab` and check if everything is correct. Add `nodatacow`, `nodiratime`, and `compress=no`to `/swap`.

```bash
genfstab -U /mnt >> /mnt/etc/fstab

# edit fstab add nodatacow, nodiratime and change to compress=no
nano /mnt/etc/fstab

# example of my /swap
#UID=xxxx /swap btrfs rw,nodatacow,noatime,nodiratime,compress=no,ssd,space_cache=v2,subvolid=261,subvol=/@swap 0 0
```

## arch-chroot

Time to chroot into our newly installed system to finish the installation.

```bash
arch-chroot /mnt
```

### Time and locale

```bash
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
hwclock --systohc

nano /etc/locale.gen
# uncomment en_US.UTF-8 and save

locale-gen
echo LANG=en_US.UTF-8 >> /etc/locale.conf
echo KEYMAP=dk >> /etc/vconsole.conf
```

### hostname

```bash
echo arch-laptop >> /etc/hostname
```

## mkinitcpio

```bash
nvim /etc/mkinitcpio.conf

# add btrfs to BINARIES
BINARIES=(btrfs)

# add hooks (systemd, keyboard, sd-vconsole, sd-encrypt)
HOOKS=(base systemd autodetect keyboard sd-vconsole modconf block sd-encrypt filesystems fsck)

# save and regenerate initramfs
mkinitcpio -P
```

## Configuring bootloader with encryption

First we need to figure out the UUID of the encrypted device. We can find the UUID with either `blkid` or in `/dev/disk/by-uuid/`

```bash
blkid

/dev/nvme0n1p1: LABEL_FATBOOT="EFI" LABEL="EFI" UUID="xxxx-xxxx" BLOCK_SIZE="512" TYPE="vfat" PARTUUID="xxxx-xxxx"
/dev/nvme0n1p2: UUID="a43c35b9-cc89-41bf-821f-045d9e3ed3c7" LABEL="ARCH_LUKS" TYPE="crypto_LUKS" PARTUUID="ac5c927c-5609-5b4d-b112-3ea0f8d4d8a7"
/dev/mapper/cryptroot: LABEL="ARCH" UUID="xxxx-xxxx" UUID_SUB="xxxx-xxxx" BLOCK_SIZE="4096" TYPE="btrfs"
```

Find your device and look for the UUID and save it. In the output above the UUID is `a43c35b9-cc89-41bf-821f-045d9e3ed3c7`.
**Notice** that it is not the UUID for the encrypted container we are interested in.

Alternatively `ls /dev/disk/by-uuid/` will output the UUID aswell.

Point the UUID to grub so your device can be unlocked with your passphrase at boot.

```bash
nvim /etc/default/grub

# replace <UUID>
GRUB_CMDLINE_LINUX_DEFAULT="rd.luks.name=<UUID>=cryptroot root=/dev/mapper/cryptroot loglevel=3 quiet"

# save and install grub to /boot
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB --recheck
grub-mkconfig -o /boot/grub/grub.cfg
```

## Add user and root password

```bash
# set root password
passwd

# create user and add it to wheel group for sudo
useradd -m -G wheel <USERNAME>
passwd <USERNAME>
```

## Finish installation

And we are done with the installation. You can exit `arch-chroot` and reboot your machine. Hopefully it boots up and you are able to unlock your encrypted container!

Next we will setup a swapfile, Snapper and [grub-btrfs](https://github.com/Antynea/grub-btrfs) that will enable us to rollback to a previous snapshot at boot. Coming soon.
