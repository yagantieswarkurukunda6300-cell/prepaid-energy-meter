# ⚡ PREPAID ENERGY METER

## 🏠 Residential Building Electrical Installation

<p align="center">

**A realistic interactive prepaid energy meter simulation for residential electrical monitoring, appliance control, energy tracking, and prepaid balance management.**

</p>

<p align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)

</p>

<p align="center">

![Electrical Engineering](https://img.shields.io/badge/⚡_Electrical_Engineering-FF6B00?style=for-the-badge)
![Energy Monitoring](https://img.shields.io/badge/🔋_Energy_Monitoring-22C55E?style=for-the-badge)
![Residential System](https://img.shields.io/badge/🏠_Residential_System-06B6D4?style=for-the-badge)
![Prepaid Meter](https://img.shields.io/badge/💰_Prepaid_Meter-8B5CF6?style=for-the-badge)

</p>

---

# ⚡ PROJECT AT A GLANCE

| ⚡ SYSTEM                   | 📊 STATUS       |
| -------------------------- | --------------- |
| 🏠 Residential Environment | Interactive     |
| 🔌 Energy Monitoring       | Live Simulation |
| 💡 Appliance Control       | Available       |
| 🛡️ Main MCB               | ON / OFF        |
| 💰 Prepaid Balance         | Available       |
| 🔋 Energy Tracking         | Available       |
| 🔄 Reset System            | Available       |
| 🌐 Frontend                | React + Vite    |

---

# 🎯 WHAT IS THIS PROJECT?

**Prepaid Energy Meter** is a web-based simulation of a residential electrical installation.

The project creates a digital representation of a house where users can:

* Monitor voltage
* Monitor current
* Observe power consumption
* Track energy usage
* Manage prepaid balance
* Control household appliances
* Operate the main MCB
* Observe supply status
* Reset the simulated system

The main goal is to combine **Electrical Engineering concepts with modern web development** in a practical and interactive project.

---

# 🏠 RESIDENTIAL ELECTRICAL SYSTEM

```text
                    ⚡ ELECTRICAL SUPPLY
                            │
                            ▼
                  ┌──────────────────┐
                  │  PREPAID ENERGY  │
                  │      METER       │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │    MAIN MCB      │
                  │ DISTRIBUTION BD  │
                  └────────┬─────────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        🛏️ BEDROOM    🛋️ LIVING     🍳 KITCHEN
             │             │             │
             ▼             ▼             ▼
        💡 LIGHT       💡 LIGHT      💡 LIGHT
        🌀 FAN         🌀 FAN
        ❄️ AC          📺 TV
```

---

# 📊 LIVE MONITORING

The application provides an interactive simulation of residential electrical parameters.

| Parameter  | Example Reading |
| ---------- | --------------: |
| ⚡ Voltage  |       **230 V** |
| 🔌 Current |      **0.64 A** |
| 💡 Power   |       **135 W** |
| 🔋 Energy  |   **0.004 kWh** |
| 💰 Balance |     **₹100.00** |
| 🟢 Supply  |          **ON** |

> These values represent the simulated electrical state of the application and are not measurements from a physical energy meter.

---

# 💡 APPLIANCE CONTROL

## 🛏️ BEDROOM

| Appliance | Control  |
| --------- | -------- |
| 💡 Light  | ON / OFF |
| 🌀 Fan    | ON / OFF |
| ❄️ AC     | ON / OFF |

## 🛋️ LIVING ROOM

| Appliance | Control  |
| --------- | -------- |
| 💡 Light  | ON / OFF |
| 🌀 Fan    | ON / OFF |
| 📺 TV     | ON / OFF |

## 🍳 KITCHEN

| Appliance | Control  |
| --------- | -------- |
| 💡 Light  | ON / OFF |

---

# 💰 PREPAID ENERGY MANAGEMENT

The project demonstrates the basic workflow of a prepaid electricity system.

```text
        💳 RECHARGE
             │
             ▼
      💰 PREPAID BALANCE
             │
             ▼
        ⚡ ENERGY USE
             │
             ▼
      📊 USAGE CALCULATION
             │
             ▼
       💰 BALANCE UPDATE
             │
             ▼
        🏠 SUPPLY STATUS
```

The user can recharge the simulated balance and observe how energy consumption is connected to the available prepaid amount.

---

# 🛡️ MAIN MCB CONTROL

The simulated distribution board contains a **Main MCB**.

### 🟢 MCB ON

```text
MCB ON
  ↓
SUPPLY AVAILABLE
  ↓
HOUSEHOLD LOADS ACTIVE
```

### 🔴 MCB OFF

```text
MCB OFF
  ↓
SUPPLY DISCONNECTED
  ↓
HOUSEHOLD LOADS DISABLED
```

This represents the basic role of a main protection and isolation device in a residential electrical installation.

---

# ⚡ ELECTRICAL ENGINEERING

This project demonstrates several fundamental electrical concepts.

### 🔌 Voltage

Electrical potential difference supplied to the simulated residential system.

### ⚡ Current

Current drawn by the connected household loads.

### 💡 Power

Electrical power associated with the connected load.

### 🔋 Energy

Electrical energy consumed by the simulated appliances.

### 💰 Tariff

Cost associated with energy consumption.

### 🛡️ MCB

Main protection and isolation point represented in the distribution board.

### 🏠 Load Management

Controlling residential appliances according to the simulated electrical system state.

---

# 📐 POWER RELATIONSHIP

One of the fundamental electrical relationships represented in the project is:

```text
             P = V × I

      P = Electrical Power
      V = Voltage
      I = Current
```

Example:

```text
Voltage = 230 V
Current = 0.64 A

P = 230 × 0.64
P ≈ 147 W
```

The application itself uses its own simulation logic for displayed values.

---

# 🔄 SYSTEM WORKFLOW

```text
┌─────────────────────┐
│   USER INTERACTION  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ APPLIANCE CONTROL   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ LOAD / POWER LOGIC  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ ENERGY CALCULATION  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ PREPAID BALANCE     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ SUPPLY STATUS       │
└─────────────────────┘
```

---

# ✨ KEY FEATURES

### ⚡ ENERGY MONITORING

* Voltage monitoring
* Current monitoring
* Power monitoring
* Energy consumption tracking
* Supply status monitoring

### 🏠 RESIDENTIAL CONTROL

* Bedroom appliance controls
* Living room appliance controls
* Kitchen appliance controls
* Main MCB control
* Residential distribution simulation

### 💰 PREPAID MANAGEMENT

* Prepaid balance
* Recharge functionality
* Energy consumption tracking
* Balance management
* Supply-state simulation

### 🎨 USER EXPERIENCE

* Interactive interface
* Residential electrical environment
* Responsive design
* Visual electrical controls
* Simulated real-time values
* Reset functionality

---

# 🧰 TECHNOLOGY STACK

| Technology    | Purpose                              |
| ------------- | ------------------------------------ |
| ⚛️ React      | User interface and application logic |
| ⚡ Vite        | Development and production build     |
| 🟨 JavaScript | Application functionality            |
| 🎨 CSS3       | UI design and animations             |
| 🌐 HTML5      | Application structure                |
| 🐙 GitHub     | Source-code management               |
| 🚀 Vercel     | Deployment                           |

---

# 📂 PROJECT STRUCTURE

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
├── .gitignore
├── .oxlintrc.json
├── build-status.txt
└── README.md
```

---

# 🚀 RUN LOCALLY

### 1. Clone the repository

```bash
git clone https://github.com/yagantieswarkurukunda6300-cell/prepaid-energy-meter.git
```

### 2. Enter the project directory

```bash
cd prepaid-energy-meter
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

```text
http://localhost:5173
```

---

# 🏗️ BUILD FOR PRODUCTION

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

# 🌐 LIVE PROJECT

<p align="center">

<a href="https://prepaid-energy-meter.vercel.app/">

![Open Live Project](https://img.shields.io/badge/🚀_OPEN_LIVE_PROJECT-FF6B00?style=for-the-badge\&labelColor=111827)

</a>

</p>

> If your current Vercel deployment has a different URL, replace the link above with the exact deployed URL.

---

# 🎓 EDUCATIONAL PURPOSE

This project is designed as an **Electrical Engineering + Software Development portfolio project**.

It can help demonstrate concepts related to:

```text
⚡ Electrical Systems
        +
🏠 Residential Distribution
        +
🔌 Load Management
        +
💰 Prepaid Energy
        +
📊 Energy Monitoring
        +
💻 Software Development
```

The project is a **simulation**, not a certified electricity meter or a replacement for a physical protection or metering device.

---

# 🌟 WHY I BUILT THIS

Electrical engineering concepts are often learned through circuits, formulas, diagrams and laboratory equipment.

This project takes those concepts into a digital environment.

```text
             THEORY
                │
                ▼
          ENGINEERING
                │
                ▼
            SOFTWARE
                │
                ▼
           SIMULATION
                │
                ▼
          INTERACTION
                │
                ▼
          UNDERSTANDING
```

The objective is to make residential energy systems more **visual, interactive and easier to understand**.

---

# 👨‍💻 ENGINEERED BY ESWAR

## ⚡ KURUKUNDA YAGANTI ESWAR

**Electrical Engineering • AI • IoT • Automation • Software Development**

I build practical engineering projects by combining electrical systems with modern software, intelligent technologies and interactive digital experiences.

### 🔧 CORE INTERESTS

| ⚡ ENGINEERING      | 🤖 INTELLIGENCE         | 📡 CONNECTIVITY | 💻 SOFTWARE    |
| ------------------ | ----------------------- | --------------- | -------------- |
| Electrical Systems | Artificial Intelligence | IoT             | React          |
| Energy Systems     | Machine Learning        | Automation      | JavaScript     |
| Protection Systems | Fault Detection         | Smart Devices   | Vite           |
| Industrial Systems | Predictive Concepts     | Sensors         | Web Technology |

---

# 🔥 ENGINEERING PHILOSOPHY

> **“Don't just study the system. Build it, simulate it, understand it and improve it.”**

```text
⚡ IDEA
  ↓
🔧 ENGINEERING
  ↓
💻 DEVELOPMENT
  ↓
🤖 INTELLIGENCE
  ↓
📡 CONNECTIVITY
  ↓
🏭 SYSTEM
  ↓
🚀 REAL-WORLD IMPACT
```

---

# 🌐 CONNECT WITH ME

<p align="center">

<a href="https://github.com/yagantieswarkurukunda6300-cell">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<a href="https://www.linkedin.com/in/yaganti-eswar-kurukunda-7027132b2/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

</p>

---

# ⭐ SUPPORT THE PROJECT

If you find this project useful:

⭐ **Star the repository**

🍴 **Fork the repository**

📢 **Share the project**

💡 **Explore the code**

---

<p align="center">

# ⚡ ELECTRICAL ENGINEERING × TECHNOLOGY 🚀

**FROM CIRCUITS → TO CODE → TO INTELLIGENT SYSTEMS**

</p>

<p align="center">

🏠 **PREPAID ENERGY METER** • ⚡ **BUILT WITH ENGINEERING** • 💻 **POWERED BY REACT**

</p>

---

<p align="center">

**© 2026 Kurukunda Yaganti Eswar**

</p>
