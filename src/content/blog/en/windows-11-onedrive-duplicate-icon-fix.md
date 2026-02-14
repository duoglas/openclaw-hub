---
title: "Fix: Duplicate OneDrive Icons in Windows 11 File Explorer"
description: "Seeing both 'OneDrive' and 'OneDrive - Personal' in your Windows 11 File Explorer sidebar? This is a known Microsoft registry bug. Here's exactly why it happens and how to fix it in under 3 minutes."
pubDate: 2026-02-15
tags: ["windows-11", "onedrive", "registry", "bug-fix", "troubleshooting"]
category: "tutorial"
lang: "en"
---

## 🐛 The Problem

Open File Explorer on Windows 11, and you'll see **two OneDrive entries** in the left navigation pane:

- **OneDrive**
- **OneDrive - Personal**

Both point to the same folder. Reinstalling OneDrive, signing out and back in, or resetting the app doesn't fix it.

This is a widespread bug that has been reported since late 2024 and continues to affect fresh Windows 11 installations.

## 🔍 Root Cause: A Rename Gone Wrong

OneDrive registers itself in the File Explorer navigation pane via entries under this registry path:

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace
```

Each sub-key is a CLSID (a GUID in curly braces) that tells Explorer to show a special folder.

**What went wrong:** During a OneDrive update, Microsoft renamed the personal OneDrive entry from `OneDrive` to `OneDrive - Personal`. The update process:

- ✅ Created a new registry entry with the name `OneDrive - Personal`
- ❌ **Failed to remove the old registry entry** named `OneDrive`

Both CLSIDs now coexist under `NameSpace`, and Explorer dutifully renders both — hence the duplicate.

### Why Common Fixes Don't Work

| Method | Why It Fails |
|---|---|
| Sign out / Sign in to OneDrive | Doesn't touch legacy registry entries |
| Reinstall OneDrive | Installer only manages the new entry |
| OneDrive reset / `wsreset` | Resets app data, not registry |
| Setting `IsPinnedToNameSpaceTree` to 0 | May revert after reboot |

## 🛠️ The Fix: Clean Up the Registry (3 Minutes)

> ⚠️ **Back up first:** In Registry Editor, go to File → Export to save a .reg backup.

### Step 1: Open Registry Editor

Press `Win + R`, type `regedit`, hit Enter. Click "Yes" on the UAC prompt.

### Step 2: Navigate to NameSpace

Paste this path into the address bar at the top and press Enter:

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace
```

### Step 3: Identify the Duplicate

Under `NameSpace`, you'll see several sub-keys named as GUIDs (e.g., `{018D5C66-...}`).

Click each one and check the **(Default)** value in the right panel:

- One will show **OneDrive - Personal** → **Keep this one**
- Another will show **OneDrive** → **Delete this one**

The legacy CLSID is typically `{018D5C66-4533-4307-9B53-224DE2ED1FE6}`, but verify by checking the Default value.

### Step 4: Delete the Old Entry

Right-click the sub-key whose Default value is `OneDrive` → Delete → Confirm.

### Step 5: Refresh Explorer

No reboot needed. Just restart Explorer:

1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Find **Windows Explorer** in the process list
3. Right-click → **Restart**

The duplicate icon should be gone.

## 🔬 Alternative: HKEY_CLASSES_ROOT Method

If you can't find duplicates under `NameSpace`, try:

```
HKEY_CLASSES_ROOT\CLSID
```

Press `Ctrl + F`, search for `OneDrive`, and look for entries with a `System.IsPinnedToNameSpaceTree` value. If you find two OneDrive-related CLSIDs, set the old one's `System.IsPinnedToNameSpaceTree` to `0`.

> ⚠️ Note: Changes under `HKEY_CLASSES_ROOT` may revert after a reboot. The `NameSpace` deletion method above is more reliable.

## 🛡️ Prevention Tips

- **Keep OneDrive updated** — Microsoft may eventually clean up the stale entry automatically
- **Check after major Windows updates** — Feature updates can re-introduce registry leftovers
- **Back up your registry** before making changes

## 📋 Summary

This is a classic case of Microsoft renaming something without cleaning up after itself. When OneDrive Personal's display name changed from `OneDrive` to `OneDrive - Personal`, the old registry entry was left behind, causing Explorer to show both.

The fix is straightforward: open Registry Editor, navigate to NameSpace, delete the stale entry, and restart Explorer. Done.

---

**References:**
- [Microsoft Q&A - OneDrive is duplicated in file explorer](https://learn.microsoft.com/en-us/answers/questions/5375765/onedrive-is-duplicated-in-file-explorer)
- [Reddit r/Windows11 - OneDrive appearing twice](https://www.reddit.com/r/Windows11/comments/1h7lswm/onedrive_appearing_twice_in_file_explorer/)
- [Super User - Duplicated OneDrive icon in explorer](https://superuser.com/questions/1144868/duplicated-onedrive-icon-in-explorer)
