FROM ubuntu:18.04

RUN apt update \
 && apt install -y manpages \
                   vim \
                   emacs \
                   build-essential \
                   python3 \
                   perl \
                   gawk \
                   jq \
                   curl

ADD etc /usr/etc
RUN cat /usr/etc/passwd >> /etc/passwd \
 && cat /usr/etc/group  >> /etc/group

ADD data /hgi
WORKDIR /hgi

CMD /bin/bash
