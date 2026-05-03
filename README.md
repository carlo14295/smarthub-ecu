# SmartHub — Remote ECU Programming Interface

Master's Thesis project — Carlo Fiori, Politecnico di Torino, 2022

## Overview

SmartHub is a **Raspberry Pi 3 extension board ("Shield")** designed to enable the remote programming and management of Electronic Control Units (ECUs). The Shield groups in a compact custom PCB the electronic modules that the base Raspberry Pi model lacks, allowing a remote computer to fully control a Device Under Test (DUT) through a web browser.

Peripherals such as USB pen drives, USB2CAN adapters, USB2ETH adapters, a JTAG programmer, and the DUT power supply can all be switched on and off remotely during the programming phase — without physical access to the hardware.

The project is divided into two main parts:
- **Hardware**: a custom PCB designed with KiCad 6.0, featuring 8 switchable USB ports, a power supply relay, JTAG and boot mode pin control, and a Pi Camera connector.
- **Software**: a web application with back-end services running on the Raspberry Pi and a browser-based front-end, coordinated by an nginx reverse proxy.

The system was validated by performing real programming operations on an ECU connected to the Raspberry Pi through the web interface.

---

## System Architecture

All services run on the Raspberry Pi. nginx acts as reverse proxy and serves the static web frontend.

```
Browser  ──────────────────  nginx (port 80)
                                    │
          ┌─────────────────────────┼──────────────────────┐
          │                         │                      │
   REST API (:8080)      WebSocket servers           Video stream
   SmartHub API          ├── SmartHubSocket (:9001)  SmartHubStreaming
   Python/Flask/OpenAPI  └── SmartHubSerial (:9002)  Python/picamera
   GPIO control              Node.js                 (:9003)
```

| Folder | Stack | Role |
|---|---|---|
| `SmartHub/` | Python 3, Flask, Connexion, OpenAPI 3.0 | REST API — controls Raspberry Pi GPIO pins |
| `SmartHubSocket/` | Node.js, WebSocket (`ws`), Axios | Executes scripted commands sent from the browser |
| `SmartHubSerial/` | Node.js, WebSocket, `serialport` | Exposes serial ports to the browser as terminals |
| `SmartHubStreaming/` | Python, `picamera`, `pyshine` | MJPEG video stream from the Pi Camera |
| `www/` | HTML, CSS, jQuery | Web frontend |
| `nginx/` | nginx | Reverse proxy and static file server |

---

## Web Interface

The frontend is divided into sections:

- **Switches** — toggle switches for USB 1–8, JTAG, BOOT mode, and power supply
- **Code** — a scripting editor to write and run automation sequences
- **Serial Terminal** — one or more in-browser serial terminals (configurable port and baud rate)
- **Streaming** — live video feed from the Pi Camera

---

## REST API

Defined in `SmartHub/openapi_server/openapi/openapi.yaml` (OpenAPI 3.0).

| Endpoint | Methods | Description |
|---|---|---|
| `/v2/usb` | GET | Status of all 8 USB ports |
| `/v2/usb/{id}` | GET, PUT | Get or set a single USB port (id: 1–8) |
| `/v2/power` | GET, PUT | Get or set the power supply |
| `/v2/jtag` | GET, PUT | Get or set the JTAG interface |
| `/v2/boot` | GET, PUT | Get or set the boot mode pin |
| `/v2/port` | GET | List available serial ports on the Pi |

PUT endpoints accept `?value=high` or `?value=low`.

The interactive Swagger UI is available at `http://<raspberry-ip>/v2/ui/` when the API is running.

---

## GPIO Pin Mapping

| Function | BCM Pin |
|---|---|
| USB 1 | 3 |
| USB 2 | 4 |
| USB 3 | 17 |
| USB 4 | 27 |
| USB 5 | 22 |
| USB 6 | 10 |
| USB 7 | 9 |
| USB 8 | 11 |
| Power Supply | 6 |
| JTAG | 20, 21 |
| Boot Mode | 5 |

---

## Scripting Language

The **Code** section of the web interface supports a simple command language executed sequentially via WebSocket:

```
usb <1-8> on|off      # enable or disable a USB port
power on|off          # enable or disable the power supply
jtag on|off           # enable or disable the JTAG interface
boot on|off           # set the boot mode pin
wait <seconds>        # pause before the next command
from cmd: <command>   # run a shell command on the Raspberry Pi
```

Example — power-cycle a DUT and start programming:
```
power off
wait 3
power on
wait 1
usb 1 on
jtag on
```

---

## Installation

### Requirements

**On the Raspberry Pi:**

```bash
# Python dependencies (REST API and video stream)
pip3 install -r SmartHub/requirements.txt
pip3 install picamera pyshine netifaces

# Node.js dependencies (WebSocket servers)
cd SmartHubSocket && npm install
cd ../SmartHubSerial && npm install
```

System packages: `nginx`, `RPi.GPIO` (pre-installed on Raspberry Pi OS).

### nginx configuration

```bash
sudo cp nginx/nginx.conf      /etc/nginx/nginx.conf
sudo cp nginx/nginx_http.conf /etc/nginx/nginx_http.conf
sudo cp nginx/nginx_locations.conf /etc/nginx/nginx_locations.conf
sudo cp -r www/ /var/www/smarthub/
sudo systemctl restart nginx
```

### Starting all services

```bash
# REST API (port 8080, proxied to /v2/ by nginx)
cd SmartHub && python3 -m openapi_server

# WebSocket command server (port 9001)
cd SmartHubSocket && node Node.js

# Serial terminal server (port 9002)
cd SmartHubSerial && node serial.js

# Video stream (port 9003)
cd SmartHubStreaming && python3 main.py
```

Open a browser at `http://<raspberry-pi-ip>/`.

---

## Security Notice

The scripting interface supports `from cmd: <shell command>`, which executes arbitrary commands on the Raspberry Pi. This system is designed for use on a **trusted local network only**. Do not expose it to the public internet without adding proper authentication.

---

## Project Structure

```
SmartHub/                        # REST API
├── openapi_server/
│   ├── controllers/             # GPIO logic (power, usb, jtag, boot, port)
│   ├── models/                  # OpenAPI data models
│   └── openapi/openapi.yaml     # API definition (OpenAPI 3.0)
├── requirements.txt
└── Dockerfile

SmartHubSocket/                  # WebSocket command executor
└── Node.js

SmartHubSerial/                  # Serial terminal WebSocket server
└── serial.js

SmartHubStreaming/                # Pi Camera MJPEG stream
└── main.py

www/                             # Web frontend
├── index.html
├── index.css
├── xferinfo.js                  # GPIO switch UI logic
├── coding.js                    # Script editor and executor
└── serialterminal.js            # Serial terminal UI logic

nginx/                           # Reverse proxy configuration
├── nginx.conf
├── nginx_http.conf
└── nginx_locations.conf
```

---

## References

- C. Fiori, *"SmartHub: Remote ECU Programming Interface"*, Master's Thesis, Politecnico di Torino, 2022
- [OpenAPI Generator](https://openapi-generator.tech)
- [Connexion](https://github.com/zalando/connexion)
- [KiCad 6.0](https://www.kicad.org)
- [pyshine](https://pyshine.com)
