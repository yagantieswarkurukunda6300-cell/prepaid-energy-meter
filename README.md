# ⚡ PREPAID ENERGY METER

<p align="center">
  <img src="https://img.shields.io/badge/⚡%20Electrical%20Engineering-Prepaid%20Energy%20System-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/⚛️%20React-Vite-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/🏠%20Residential%20Energy-Simulation-red?style=for-the-badge" />
</p>

<p align="center">
  <strong>A realistic interactive residential prepaid energy meter simulation built with React and Vite.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/yagantieswarkurukunda6300-cell/prepaid-energy-meter?style=flat-square" />
  <img src="https://img.shields.io/github/forks/yagantieswarkurukunda6300-cell/prepaid-energy-meter?style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/yagantieswarkurukunda6300-cell/prepaid-energy-meter?style=flat-square" />
  <img src="https://img.shields.io/github/license/yagantieswarkurukunda6300-cell/prepaid-energy-meter?style=flat-square" />
</p>

---

## 🔥 PROJECT OVERVIEW

**Prepaid Energy Meter** is an interactive residential electrical energy monitoring and control simulation designed to demonstrate how a modern prepaid electricity system can work inside a home.

The system combines **Electrical Engineering concepts + Energy Monitoring + Appliance Control + Prepaid Billing + Modern Web Development** into one interactive digital environment.

Users can monitor electrical parameters, control household appliances, manage the main MCB, observe supply status, track energy consumption and manage their prepaid balance.

---

## 🏠 RESIDENTIAL ELECTRICAL ENVIRONMENT

```text
                 ⚡ ELECTRICAL SUPPLY
                         │
                         ▼
              ┌─────────────────────┐
              │   PREPAID ENERGY    │
              │       METER         │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   DISTRIBUTION      │
              │       BOARD         │
              │      MAIN MCB       │
              └──────────┬──────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      🛏️ BEDROOM     🛋️ LIVING      🍳 KITCHEN
          │              │              │
       💡 Light        💡 Light        💡 Light
       🌀 Fan          🌀 Fan
       ❄️ AC           📺 TV
```

---

## ⚡ LIVE ELECTRICAL MONITORING

| Parameter  |    Live Value |
| ---------- | ------------: |
| 🔌 Voltage |     **230 V** |
| ⚡ Current  |    **0.64 A** |
| 💡 Power   |     **135 W** |
| 🔋 Energy  | **0.004 kWh** |
| 💰 Balance |   **₹100.00** |
| 🟢 Supply  |        **ON** |

The simulation provides a visual representation of electrical parameters and residential load behavior.

---

## 🎛️ APPLIANCE CONTROL

### 🛏️ Bedroom

* 💡 Light
* 🌀 Fan
* ❄️ AC

### 🛋️ Living Room

* 💡 Light
* 🌀 Fan
* 📺 TV

### 🍳 Kitchen

* 💡 Light

Appliance states can be controlled through the interactive interface, allowing the user to observe changes in the simulated electrical system.

---

## 💰 PREPAID ENERGY SYSTEM

The project demonstrates the basic concept of prepaid electricity consumption.

```text
💰 Recharge Balance
        ↓
⚡ Consume Energy
        ↓
📊 Calculate Usage
        ↓
🔋 Update Balance
        ↓
🏠 Monitor Supply
```

The system represents how energy consumption can be connected with a prepaid balance and residential load management.

---

## 🛡️ ELECTRICAL SAFETY & CONTROL

The simulation includes a **Main MCB control** and supply-status monitoring.

### Main Controls

🟢 **MCB ON**
🔴 **MCB OFF**

The MCB acts as the main simulated control point for the residential electrical distribution system.

---

## ✨ KEY FEATURES

* ⚡ Real-time electrical parameter simulation
* 🔌 Voltage monitoring
* 🔋 Current monitoring
* 💡 Power calculation
* 📊 Energy consumption tracking
* 💰 Prepaid balance management
* 🔄 Recharge functionality
* 🏠 Residential appliance control
* 🛡️ Main MCB control
* 🟢 Supply ON/OFF status
* 🔁 Reset functionality
* 🎨 Interactive residential electrical environment
* 📱 Responsive interface
* ⚛️ React-based architecture
* 🚀 Vite-powered development and build system

---

## 🧠 ELECTRICAL ENGINEERING CONCEPTS

This project demonstrates practical concepts including:

* **Voltage**
* **Current**
* **Electrical Power**
* **Energy Consumption**
* **Power Factor**
* **Tariff**
* **Prepaid Billing**
* **Load Management**
* **Residential Distribution**
* **MCB Protection**
* **Appliance Load Behavior**

### Basic Power Relationship

```text
        P = V × I

P → Electrical Power
V → Voltage
I → Current
```

This relationship is used as one of the fundamental concepts behind electrical load monitoring.

---

## 🛠️ TECHNOLOGY STACK

<p align="center">
  <img src="https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/CSS3-Responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-Version%20Control-181717?style=for-the-badge&logo=github&logoColor=white" />
</p>

---

## 📂 PROJECT STRUCTURE

```text
prepaid-energy-meter/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── Home3D.jsx
│   ├── Home3D.css
│   ├── HomeScene.jsx
│   ├── HomeScene.css
│   ├── PremiumSimulation.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🚀 RUN LOCALLY

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yagantieswarkurukunda6300-cell/prepaid-energy-meter.git
```

### 2️⃣ Enter the project

```bash
cd prepaid-energy-meter
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Start development server

```bash
npm run dev
```

### 5️⃣ Open in browser

```text
http://localhost:5173
```

---

## 🌐 LIVE PROJECT

🚀 **Live Demo:**
https://prepaid-energy-meter.vercel.app/

> If your Vercel deployment generated a different URL, replace the link above with the actual Vercel URL.

---

## 🎯 PROJECT PURPOSE

The main purpose of this project is to create a practical digital representation of a **residential prepaid energy management system**.

It connects theoretical electrical engineering concepts with modern software development to create an interactive environment where users can understand:

```text
Electrical Supply
       ↓
Energy Meter
       ↓
Distribution Board
       ↓
Residential Loads
       ↓
Energy Consumption
       ↓
Prepaid Balance
       ↓
Energy Management
```

---

## 👨‍💻 DEVELOPED BY

### KURUKUNDA YAGANTI ESWAR

**Electrical Engineering | AI | IoT | Software Development**

Building practical engineering projects by combining:

⚡ Electrical Engineering
🤖 Artificial Intelligence
🌐 Web Development
📡 IoT & Automation
🏭 Industrial Technology

---

## ⭐ SUPPORT THE PROJECT

If you found this project useful or interesting:

⭐ **Star the repository**

🍴 **Fork the project**

📢 **Share it with others**

---

<p align="center">

### ⚡ ENERGY • TECHNOLOGY • INNOVATION ⚡

<strong>Built with Electrical Engineering + Modern Web Technology</strong>

</p>
