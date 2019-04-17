# HGI Prescreening Task

## Installation

With Docker installed, you can download and run the container for this
repository with:

    docker run -it mercury/hgi-prescreen

This is based on Ubuntu 18.04 LTS (Bionic Beaver), with the following
packages immediately available (you may install others, if you wish):

* [`manpages`](https://packages.ubuntu.com/bionic/manpages)
* [`vim`](https://packages.ubuntu.com/bionic/vim)
* [`emacs`](https://packages.ubuntu.com/bionic/emacs)
* [`build-essential`](https://packages.ubuntu.com/bionic/build-essential)
* [`python3`](https://packages.ubuntu.com/bionic/python3)
* [`perl`](https://packages.ubuntu.com/bionic/perl)
* [`gawk`](https://packages.ubuntu.com/bionic/gawk)
* [`jq`](https://packages.ubuntu.com/bionic/jq)
* [`curl`](https://packages.ubuntu.com/bionic/curl)

The data files for the task can be found in `/hgi`. You will probably
want to bind mount a local volume, so any code you write to complete the
task can be persisted outside of the container.

If you do not wish to use Docker, the files for the task can be found in
the `data` and `etc` directories.

## The Data

You will find the following files:

### `stat.dat.gz`

This is a `gzip`'d, tab-delimited text file containing `stat` data for
each inode on a filesystem. The fields are interpreted as follows:

1. File path (`base64` encoded)
2. Size (bytes)
3. Owner (`UID`)
4. Group (`GID`)
5. Last accessed time (`atime`; Unix epoch)
6. Last modified time (`mtime`; Unix epoch)
7. Last changed time (`ctime`; Unix epoch)
8. File type (see below)
9. Inode ID
10. Number of hardlinks
12. Device ID

Where the file type is a character representing an inode's protection
mode:

| Character | Meaning                                                  |
| :-------: | :------------------------------------------------------- |
| `f`       | Regular file                                             |
| `d`       | Directory                                                |
| `l`       | Symbolic link                                            |
| `s`       | Socket                                                   |
| `b`       | Block special device                                     |
| `c`       | Character special device                                 |
| `F`       | Named pipe (FIFO)                                        |
| `X`       | Other                                                    |

### `manifest.json`

This is a JSON array of objects, with the following keys:

| Key     | Meaning                                                    |
| :------ | :--------------------------------------------------------- |
| `user`  | Unix user name                                             |
| `group` | Unix group name                                            |

### `etc/passwd` and `etc/group`

If you are not using the Docker container, these files contain the user
and group mappings in their standard format. Inside the Docker
container, these users and groups are already available to you.

## The Task

Write code, which takes `stat.dat.gz` and `manifest.json` as inputs, and
which outputs JSON data with the following properties:

* A top-level array of objects, corresponding to the respective objects
  in `manifest.json`;
* Where each object contains the following keys and data, derived where
  necessary from `stat.dat.gz`:

  | Key      | Meaning                                                                               |
  | :------- | :------------------------------------------------------------------------------------ |
  | `user`   | Unix user name                                                                        |
  | `group`  | Unix group name                                                                       |
  | `inodes` | The number of inodes owned by the `user` in this `group`                              |
  | `size`   | The total size (bytes) of the inodes owned by the `user` in this `group`              |
  | `latest` | The file path of the most recently modified inode owned by the `user` in this `group` |

  For example, if an object in the `manifest.json` array has the form:

  ```json
  {
    "user": "foo",
    "group": "bar"
  }
  ```

  ...the output object may look something like:

  ```json
  {
    "user": "foo",
    "group": "bar",
    "inodes": 123,
    "size": 1048576,
    "latest": "/path/to/their/most/recently/modified/file"
  }
  ```

  This then applies to each object in the `manifest.json` array, where
  order need not be preserved.

  (In the event that no matches are found for a particular `user` and
  `group`, `inodes` and `size` should have the value `0` and `latest`
  should be `null`. If multiple files qualify as `latest` for a
  particular `user` and `group`, take the first match.)

The form your code takes (e.g., language, paradigm, etc.) and method of
input and output used is entirely up to you, based on what you feel is
appropriate for the task. You will be expected to justify your design
decisions. Incomplete solutions will be considered.

*Hint* `stat.dat.gz` is dummy data, designed for this task; in a
production system, there may be many such files -- for separate file
systems -- which are orders of magnitude larger in size (hundreds of
millions of records each). Your solution is expected to work with
production data in a reasonable amount of time.

*Note* If you install additional tools or require alternative setup from
the base Docker container, please also provide an appropriate
`Dockerfile` to run your solution. Otherwise, please provide minimal
usage instructions on how to run your solution.
