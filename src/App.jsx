/* oxlint-disable react(set-state-in-effect) */
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const APPLIANCE_META = [
  { id: "light", label: "Light", watts: 60 },
  { id: "fan", label: "Fan", watts: 75 },
  { id: "tv", label: "TV", watts: 120 },
  { id: "ac", label: "AC", watts: 1200 },
];

const DEFAULT_APPLIANCES = {
  light: true,
  fan: true,
  tv: false,
  ac: false,
};

const VOLTAGE = 230;
const POWER_FACTOR = 0.92;
const TARIFF = 8;
const STARTING_BALANCE = 100;
const LOAD_REFERENCE_POWER = 1500;

const clamp = (value, digits = 2) => Number(Math.max(0, value).toFixed(digits));

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

function RoomSwitch({ applianceId, label, x, y, appliances, supplyOn, onToggleAppliance }) {
  const isOn = appliances[applianceId] && supplyOn;
  const activate = () => onToggleAppliance(applianceId);

  return (
    <g
      className={`room-switch ${isOn ? "on" : "off"}`}
      role="button"
      tabIndex={0}
      aria-label={`${label} wall switch`}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      }}
    >
      <rect x={x} y={y} width="34" height="48" rx="7" className="wall-switch-plate" />
      <rect x={x + 10} y={y + 8} width="14" height="24" rx="3" className="wall-switch-rocker" />
      <circle cx={x + 17} cy={y + 39} r="2" className="wall-switch-led" />
      <text x={x + 17} y={y + 59} className="wall-switch-label">{label}</text>
    </g>
  );
}

function PhysicalSwitch({ applianceId, label, appliances, supplyOn, onToggleAppliance }) {
  const isOn = Boolean(appliances[applianceId] && supplyOn);

  return (
    <div className={`switch-unit ${isOn ? "is-on" : "is-off"} ${supplyOn ? "" : "is-unavailable"}`}>
      <button
        type="button"
        className="rocker-switch"
        aria-label={`${label} wall switch`}
        aria-pressed={isOn}
        disabled={!supplyOn}
        onClick={() => onToggleAppliance(applianceId)}
      >
        <span className="rocker-face"><span className="rocker-mark" /></span>
        <span className="switch-pilot" />
      </button>
      <span className="switch-caption">{label}</span>
    </div>
  );
}

function RoomSwitchboard({ title, controls, appliances, supplyOn, onToggleAppliance }) {
  return (
    <div className="room-switchboard" aria-label={`${title} wall switchboard`}>
      <span className="switchboard-title">{title}</span>
      <div className="switchboard-controls">
        {controls.map(({ applianceId, label }) => (
          <PhysicalSwitch
            key={`${title}-${applianceId}`}
            applianceId={applianceId}
            label={label}
            appliances={appliances}
            supplyOn={supplyOn}
            onToggleAppliance={onToggleAppliance}
          />
        ))}
      </div>
      <span className="switchboard-socket" aria-hidden="true"><i /><i /></span>
    </div>
  );
}

function CeilingFan({ active }) {
  return (
    <div className={`ceiling-fan-unit ${active ? "is-running" : "is-stopped"}`} aria-label={`Ceiling fan ${active ? "on" : "off"}`}>
      <span className="fan-canopy" />
      <span className="fan-rod" />
      <span className="fan-motor" />
      <span className="fan-blades">
        <i className="fan-blade blade-north" />
        <i className="fan-blade blade-east" />
        <i className="fan-blade blade-south" />
        <i className="fan-blade blade-west" />
      </span>
      <span className="fan-cap" />
    </div>
  );
}

function CeilingLight({ active }) {
  return (
    <div className={`ceiling-light-fixture ${active ? "is-on" : "is-off"}`} aria-label={`Ceiling light ${active ? "on" : "off"}`}>
      <span className="light-recess" />
      <span className="light-diffuser" />
    </div>
  );
}

function ResidentialInterior({
  appliances,
  balance,
  current,
  activePower,
  energy,
  supplyOn,
  mcbOn,
  onToggleAppliance,
  onToggleMcb,
  onResetSimulation,
}) {
  const lightOn = Boolean(appliances.light && supplyOn);
  const fanOn = Boolean(appliances.fan && supplyOn);
  const tvOn = Boolean(appliances.tv && supplyOn);
  const acOn = Boolean(appliances.ac && supplyOn);

  return (
    <main className="house-experience" aria-label="Interactive residential electrical training house">
      <div className="interior-grid">
        <section className={`room-scene bedroom-scene ${lightOn ? "room-illuminated" : ""}`} aria-label="Bedroom interior">
          <div className="room-back-wall"><span className="room-window window-bedroom"><i /><i /></span></div>
          <div className="room-floor bedroom-floor" />
          <span className="room-name">Bedroom</span>
          <CeilingLight active={lightOn} />
          <CeilingFan active={fanOn} />
          <div className={`split-ac ${acOn ? "is-on" : "is-off"}`} aria-label={`Split air conditioner ${acOn ? "on" : "off"}`}>
            <span className="ac-brand-mark" />
            <span className="ac-temperature">{acOn ? "23°" : "--"}</span>
            <span className="ac-status-led" />
            <span className="ac-outlet"><i /></span>
            {acOn && <span className="ac-breeze breeze-one" />}
            {acOn && <span className="ac-breeze breeze-two" />}
          </div>
          <div className="bed-ensemble">
            <div className="bed-headboard" />
            <div className="bed-mattress"><span className="bed-cover" /></div>
            <div className="bed-pillow pillow-one" />
            <div className="bed-pillow pillow-two" />
            <div className="bedside-cabinet"><span className="cabinet-pull" /></div>
            <span className="bedside-lamp" />
          </div>
          <RoomSwitchboard
            title="Bedroom switches"
            controls={[{ applianceId: "light", label: "LIGHT" }, { applianceId: "fan", label: "FAN" }, { applianceId: "ac", label: "AC" }]}
            appliances={appliances}
            supplyOn={supplyOn}
            onToggleAppliance={onToggleAppliance}
          />
        </section>

        <section className={`room-scene living-scene ${lightOn ? "room-illuminated" : ""}`} aria-label="Living room interior">
          <div className="room-back-wall"><span className="room-window window-living"><i /><i /></span></div>
          <div className="room-floor living-floor" />
          <span className="room-name">Living room</span>
          <CeilingLight active={lightOn} />
          <CeilingFan active={fanOn} />
          <div className="television-wall">
            <div className={`flat-screen ${tvOn ? "is-on" : "is-off"}`} aria-label={`Living room TV ${tvOn ? "on" : "off"}`}>
              <span className="tv-bezel">
                <span className="tv-glass">
                  <span className="tv-picture picture-one" />
                  <span className="tv-picture picture-two" />
                  <span className="tv-picture picture-three" />
                  <span className="tv-content-glow" />
                </span>
                <span className="tv-logo">N</span>
                <span className={`tv-power-led ${tvOn ? "is-on" : "is-off"}`} />
              </span>
            </div>
            <div className="media-console"><span /><span /><span /></div>
          </div>
          <div className="living-sofa">
            <div className="sofa-back-cushions"><i /><i /><i /></div>
            <div className="sofa-seat-cushions"><i /><i /><i /></div>
            <div className="sofa-base" />
            <div className="sofa-arm arm-left" />
            <div className="sofa-arm arm-right" />
            <span className="sofa-throw" />
          </div>
          <div className="living-coffee-table"><span className="table-top" /><span className="table-leg" /></div>
          <RoomSwitchboard
            title="Living room switches"
            controls={[{ applianceId: "light", label: "LIGHT" }, { applianceId: "fan", label: "FAN" }, { applianceId: "tv", label: "TV" }]}
            appliances={appliances}
            supplyOn={supplyOn}
            onToggleAppliance={onToggleAppliance}
          />
        </section>

        <section className={`room-scene kitchen-scene ${lightOn ? "room-illuminated" : ""}`} aria-label="Kitchen interior">
          <div className="room-back-wall"><span className="room-window window-kitchen"><i /><i /></span></div>
          <div className="room-floor kitchen-floor" />
          <span className="room-name">Kitchen</span>
          <CeilingLight active={lightOn} />
          <div className="kitchen-upper-cabinets"><i /><i /><i /></div>
          <div className="kitchen-counter"><span className="counter-surface" /><span className="sink-basin"><i /></span><span className="tap-faucet" /></div>
          <div className="kitchen-lower-cabinets"><i /><i /><i /></div>
          <div className="kitchen-fridge"><span className="fridge-freezer" /><span className="fridge-handle" /></div>
          <div className="kitchen-appliance"><span /><i /></div>
          <RoomSwitchboard
            title="Kitchen switches"
            controls={[{ applianceId: "light", label: "LIGHT" }]}
            appliances={appliances}
            supplyOn={supplyOn}
            onToggleAppliance={onToggleAppliance}
          />
        </section>

        <section className="utility-room" aria-label="Entry electrical installation">
          <div className="utility-wall-surface">
            <div className="utility-room-title"><span>Entry · Electrical installation</span><i /></div>
            <div className={`prepaid-meter ${supplyOn ? "is-live" : "is-cut"}`}>
              <span className="equipment-screw screw-top-left" />
              <span className="equipment-screw screw-top-right" />
              <span className="meter-brand">PREPAID ENERGY METER</span>
              <div className="meter-lcd">
                <div className="meter-reading-row"><span>VOLTAGE</span><strong>{VOLTAGE} V</strong></div>
                <div className="meter-reading-row"><span>CURRENT</span><strong>{current.toFixed(2)} A</strong></div>
                <div className="meter-reading-row"><span>POWER</span><strong>{activePower} W</strong></div>
                <div className="meter-reading-row"><span>ENERGY</span><strong>{energy.toFixed(3)} kWh</strong></div>
                <div className="meter-reading-row meter-balance"><span>BALANCE</span><strong>{formatCurrency(balance)}</strong></div>
              </div>
              <div className="meter-controls"><span className="meter-led" /><span className="meter-button" /><span className="meter-button" /></div>
              <div className="meter-terminal-cover"><i /><i /><i /><i /></div>
              <span className="equipment-screw screw-bottom-left" />
              <span className="equipment-screw screw-bottom-right" />
            </div>

            <div className="distribution-board">
              <span className="equipment-screw screw-top-left" />
              <span className="equipment-screw screw-top-right" />
              <div className="db-heading"><strong>RESIDENTIAL</strong><span>DISTRIBUTION BOARD</span></div>
              <div className="din-rail">
                <div className={`main-breaker ${mcbOn ? "is-on" : "is-off"} ${balance <= 0 ? "is-unavailable" : ""}`}>
                  <span className="breaker-label">MAIN<br />MCB</span>
                  <span className="breaker-markings"><i>ON</i><i>OFF</i></span>
                  <button type="button" className="breaker-lever-control" aria-label={`Main MCB ${mcbOn ? "on" : "off"}`} aria-pressed={mcbOn} disabled={balance <= 0} onClick={onToggleMcb}>
                    <span className="breaker-lever" />
                  </button>
                  <span className="breaker-pilot" />
                </div>
                <div className="branch-breakers">
                  {APPLIANCE_META.map((appliance) => (
                    <div key={appliance.id} className={`branch-breaker ${appliances[appliance.id] && supplyOn ? "is-live" : "is-off"}`}>
                      <span className="branch-breaker-indicator" />
                      <span className="branch-breaker-switch" />
                      <small>{appliance.label.toUpperCase()}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="db-terminal-strip"><i /><i /><i /><i /><i /><i /></div>
              <span className="equipment-screw screw-bottom-left" />
              <span className="equipment-screw screw-bottom-right" />
            </div>
          </div>
        </section>
      </div>

      <section className="home-hud" aria-label="Live residential system status">
        <div className={`hud-supply ${supplyOn ? "is-live" : "is-cut"}`}><i />{supplyOn ? "SUPPLY ON" : "SUPPLY OFF"}</div>
        <div className="hud-reading"><span>VOLTAGE</span><strong>{VOLTAGE} V</strong></div>
        <div className="hud-reading"><span>CURRENT</span><strong>{current.toFixed(2)} A</strong></div>
        <div className="hud-reading"><span>POWER</span><strong>{activePower} W</strong></div>
        <div className="hud-reading"><span>ENERGY</span><strong>{energy.toFixed(3)} kWh</strong></div>
        <div className="hud-reading hud-balance"><span>BALANCE</span><strong>{formatCurrency(balance)}</strong></div>
        <button type="button" className="hud-reset" onClick={onResetSimulation} aria-label="Reset simulation">RESET</button>
      </section>
    </main>
  );
}

function ResidentialHomePage({
  appliances,
  balance,
  current,
  activePower,
  energy,
  supplyOn,
  mcbOn,
  onToggleAppliance,
  onToggleMcb,
  onOpenMonitoring,
  onResetSimulation,
  lastRecharge,
}) {
  return (
    <div className="residential-page">
      <header className="residential-header">
        <div className="residential-title-wrap">
          <span className="residential-badge">
            <span className="residential-dot" aria-hidden="true" />
            Residential Energy System
          </span>
          <h1>Residential Building Electrical Installation</h1>
        </div>

        <button type="button" className="monitoring-launch" onClick={onOpenMonitoring}>
          LIVE MONITORING
        </button>
      </header>

      <ResidentialInterior
        appliances={appliances}
        balance={balance}
        current={current}
        activePower={activePower}
        energy={energy}
        supplyOn={supplyOn}
        mcbOn={mcbOn}
        onToggleAppliance={onToggleAppliance}
        onToggleMcb={onToggleMcb}
        onResetSimulation={onResetSimulation}
      />

      <main className="residential-layout legacy-residential-layout" aria-hidden="true">
        <section className="building-stage" aria-label="Residential building electrical simulation">
          <div className="building-shell">
            <div className="entry-wall-panel" aria-label="Wall mounted electrical equipment">
              <div className={`entry-device meter-device ${supplyOn ? "on" : "off"}`}>
                <span className="device-title">Prepaid Meter</span>
                <strong>{formatCurrency(balance)}</strong>
                <small>{VOLTAGE}V · {current.toFixed(2)}A</small>
              </div>

              <button
                type="button"
                className={`entry-device mcb-device ${mcbOn ? "on" : "off"}`}
                onClick={onToggleMcb}
                aria-label="Main MCB switch"
              >
                <span className="device-title">Main MCB</span>
                <strong>{mcbOn ? "ON" : "OFF"}</strong>
                <small>Supply {supplyOn ? "Live" : "Cut"}</small>
              </button>

              <div className={`entry-device db-device ${supplyOn ? "on" : "off"}`}>
                <span className="device-title">Distribution</span>
                <strong>{activePower} W</strong>
                <small>{energy.toFixed(3)} kWh</small>
              </div>
            </div>

            <svg className="building-svg" viewBox="0 0 900 520" role="img" aria-label="Residential home interior layout">
              <defs>
                <linearGradient id="wallStone" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#1d3a46" />
                  <stop offset="100%" stopColor="#152e38" />
                </linearGradient>
                <linearGradient id="floorTone" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#a8835a" />
                  <stop offset="100%" stopColor="#8d6d4b" />
                </linearGradient>
              </defs>

              <g className="house-illustration">
                <rect x="70" y="60" width="760" height="390" rx="26" className="outer-shell" />
                <rect x="90" y="80" width="720" height="350" rx="18" className="inner-shell" />
                <rect x="110" y="95" width="350" height="210" rx="12" className="room room-living" />
                <rect x="495" y="95" width="280" height="135" rx="12" className="room room-bedroom" />
                <rect x="495" y="255" width="280" height="120" rx="12" className="room room-kitchen" />
                <rect x="110" y="330" width="350" height="70" rx="12" className="room room-entry" />

                <text x="130" y="155" className="room-label">LIVING ROOM</text>
                <text x="520" y="151" className="room-label">BEDROOM</text>
                <text x="520" y="278" className="room-label">KITCHEN</text>
                <text x="120" y="324" className="room-label large">ENTRY / UTILITY</text>

                <rect x="136" y="118" width="110" height="18" rx="6" className="window frame" />
                <rect x="255" y="118" width="110" height="18" rx="6" className="window frame" />
                <rect x="385" y="118" width="32" height="90" rx="6" className="window frame" />
                <rect x="520" y="118" width="80" height="18" rx="6" className="window frame" />
                <rect x="635" y="118" width="110" height="18" rx="6" className="window frame" />
                <rect x="520" y="155" width="75" height="52" rx="8" className="window frame" />
                <rect x="644" y="155" width="75" height="52" rx="8" className="window frame" />
                <rect x="553" y="285" width="110" height="48" rx="8" className="window frame" />
                <rect x="680" y="285" width="60" height="48" rx="8" className="window frame" />

                <g className={`ceiling-light ${appliances.light && supplyOn ? "on" : "off"}`}>
                  <rect x="210" y="88" width="42" height="18" rx="8" />
                  <circle cx="231" cy="92" r="7" />
                </g>
                <g className={`ceiling-light ${appliances.light && supplyOn ? "on" : "off"}`}>
                  <rect x="565" y="88" width="42" height="18" rx="8" />
                  <circle cx="586" cy="92" r="7" />
                </g>
                <g className={`ceiling-light ${appliances.light && supplyOn ? "on" : "off"}`}>
                  <rect x="585" y="245" width="42" height="18" rx="8" />
                  <circle cx="606" cy="249" r="7" />
                </g>

                <g className={`ceiling-fan ${appliances.fan && supplyOn ? "on" : "off"}`} transform="translate(300 190)">
                  <rect x="-22" y="-20" width="44" height="20" rx="10" className="fan-mount" />
                  <circle cx="0" cy="0" r="16" className="fan-hub" />
                  <g className="fan-blades">
                    <path d="M 0 0 L 14 -24" />
                    <path d="M 0 0 L 22 8" />
                    <path d="M 0 0 L -18 20" />
                    <path d="M 0 0 L -26 -6" />
                  </g>
                </g>

                <g className={`ceiling-fan ${appliances.fan && supplyOn ? "on" : "off"}`} transform="translate(610 155)">
                  <rect x="-22" y="-20" width="44" height="20" rx="10" className="fan-mount" />
                  <circle cx="0" cy="0" r="16" className="fan-hub" />
                  <g className="fan-blades">
                    <path d="M 0 0 L 14 -24" />
                    <path d="M 0 0 L 22 8" />
                    <path d="M 0 0 L -18 20" />
                    <path d="M 0 0 L -26 -6" />
                  </g>
                </g>

                <g className="living-room-scene">
                  <rect x="170" y="260" width="220" height="26" rx="12" className="sofa-base" />
                  <rect x="175" y="235" width="210" height="28" rx="10" className="sofa-back" />
                  <rect x="180" y="210" width="50" height="28" rx="8" className="sofa-seat" />
                  <rect x="240" y="210" width="50" height="28" rx="8" className="sofa-seat" />
                  <rect x="300" y="210" width="50" height="28" rx="8" className="sofa-seat" />
                  <rect x="220" y="288" width="100" height="18" rx="8" className="coffee-table" />
                  <rect x="240" y="175" width="120" height="68" rx="10" className={`tv-unit ${appliances.tv && supplyOn ? "on" : "off"}`} />
                  <rect x="248" y="183" width="104" height="52" rx="6" className={`tv-screen ${appliances.tv && supplyOn ? "on" : "off"}`} />
                  <rect x="278" y="236" width="44" height="7" rx="3" className="tv-stand" />
                  <RoomSwitch applianceId="light" label="LIGHT" x={122} y={220} appliances={appliances} supplyOn={supplyOn} onToggleAppliance={onToggleAppliance} />
                  <RoomSwitch applianceId="fan" label="FAN" x={416} y={220} appliances={appliances} supplyOn={supplyOn} onToggleAppliance={onToggleAppliance} />
                  <RoomSwitch applianceId="tv" label="TV" x={416} y={157} appliances={appliances} supplyOn={supplyOn} onToggleAppliance={onToggleAppliance} />
                </g>

                <g className="bedroom-scene">
                  <rect x="520" y="220" width="205" height="46" rx="10" className="bed-frame" />
                  <rect x="538" y="178" width="170" height="42" rx="10" className="bed-mattress" />
                  <rect x="565" y="174" width="22" height="12" rx="4" className="bed-pillows" />
                  <rect x="596" y="174" width="22" height="12" rx="4" className="bed-pillows" />
                  <rect x="690" y="210" width="22" height="52" rx="8" className="bedside-table" />
                  <rect x="683" y="143" width="72" height="28" rx="9" className={`ac-unit ${appliances.ac && supplyOn ? "on" : "off"}`} />
                  <line x1="692" y1="162" x2="745" y2="162" className="ac-vent" />
                  <circle cx="744" cy="151" r="2" className={`ac-indicator ${appliances.ac && supplyOn ? "on" : "off"}`} />
                  <path d="M697 172 Q704 181 697 190 M714 172 Q721 181 714 190 M731 172 Q738 181 731 190" className={`ac-airflow ${appliances.ac && supplyOn ? "on" : "off"}`} />
                  <RoomSwitch applianceId="ac" label="AC" x={735} y={178} appliances={appliances} supplyOn={supplyOn} onToggleAppliance={onToggleAppliance} />
                </g>

                <g className="kitchen-scene">
                  <rect x="520" y="285" width="220" height="52" rx="10" className="counter-top" />
                  <rect x="548" y="338" width="80" height="18" rx="8" className="cabinet" />
                  <rect x="642" y="338" width="82" height="18" rx="8" className="cabinet" />
                  <rect x="690" y="285" width="28" height="38" rx="6" className="sink" />
                  <rect x="532" y="288" width="26" height="40" rx="6" className="fridge" />
                  <rect x="595" y="285" width="76" height="24" rx="8" className="microwave" />
                  <RoomSwitch applianceId="light" label="LIGHT" x={735} y={307} appliances={appliances} supplyOn={supplyOn} onToggleAppliance={onToggleAppliance} />
                </g>

                <g className="entry-scene">
                  <rect x="135" y="340" width="72" height="38" rx="10" className="entry-door" />
                  <rect x="216" y="340" width="72" height="38" rx="10" className="entry-door" />
                  <rect x="304" y="340" width="110" height="34" rx="8" className="utility-box" />
                  <line x1="140" y1="356" x2="200" y2="356" className="wall-trim" />
                  <line x1="210" y1="356" x2="270" y2="356" className="wall-trim" />
                  <line x1="320" y1="356" x2="396" y2="356" className="wall-trim" />
                </g>

                <g className="subtle-wiring">
                  <line x1="122" y1="98" x2="195" y2="98" className="tiny-wire" />
                  <line x1="195" y1="98" x2="195" y2="140" className="tiny-wire" />
                  <line x1="752" y1="88" x2="760" y2="88" className="tiny-wire" />
                  <line x1="760" y1="88" x2="760" y2="118" className="tiny-wire" />
                </g>
              </g>
            </svg>

          </div>
        </section>

        <aside className="home-status-panel" aria-label="Residential electrical overview">
          <div className="home-status-header">
            <h2>System Summary</h2>
            <button type="button" className="home-reset-button" onClick={onResetSimulation}>Reset</button>
          </div>

          <div className="home-status-grid">
            <div className="home-status-box">
              <span>Supply</span>
              <strong>{supplyOn ? "ON" : "OFF"}</strong>
            </div>
            <div className="home-status-box">
              <span>Voltage</span>
              <strong>{VOLTAGE} V</strong>
            </div>
            <div className="home-status-box">
              <span>Current</span>
              <strong>{current.toFixed(2)} A</strong>
            </div>
            <div className="home-status-box">
              <span>Power</span>
              <strong>{activePower} W</strong>
            </div>
            <div className="home-status-box">
              <span>Energy</span>
              <strong>{energy.toFixed(3)} kWh</strong>
            </div>
            <div className="home-status-box emphasis">
              <span>Balance</span>
              <strong>{formatCurrency(balance)}</strong>
            </div>
          </div>

          <div className="home-mcb-summary">
            <span>Main MCB</span>
            <strong>{mcbOn ? "ON" : "OFF"}</strong>
          </div>

          {lastRecharge !== null && (
            <div className="home-recharge-summary">
              <span>Last Recharge</span>
              <strong>₹{lastRecharge}</strong>
            </div>
          )}

        </aside>
      </main>
    </div>
  );
}

function LiveMonitoringPage({
  balance,
  energy,
  activePower,
  current,
  supplyOn,
  appliances,
  mcbOn,
  onToggleAppliance,
  onToggleMcb,
  onResetSimulation,
  onRecharge,
  onGoHome,
  loadPercentage,
  balanceProgress,
  meterTone,
  alertMessage,
  alertTone,
  balanceStatus,
  chartPoints,
}) {
  return (
    <div className="app-dashboard">
      <div className="bg-noise" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <header className="top-header">
        <div className="header-copy">
          <div className="headline-row">
            <span className="live-indicator" aria-hidden="true" />
            <span className="live-tag">LIVE MONITORING</span>
          </div>
          <p className="header-tag">PREPAID ENERGY METER</p>
          <h1>Residential Energy Monitoring &amp; Control</h1>
        </div>

        <div className="header-actions">
          <button type="button" className="back-home-button" onClick={onGoHome}>
            BACK TO HOME
          </button>

          <div className={`status-pill ${supplyOn ? "pill-on" : "pill-off"}`}>
            <span className="status-dot" />
            <span>{supplyOn ? "SUPPLY ON" : "SUPPLY OFF"}</span>
          </div>

          <div className="balance-pill">
            <span className="balance-label">{formatCurrency(balance)}</span>
            <span className="balance-unit">BALANCE</span>
          </div>

          <button type="button" className="reset-button-main" onClick={onResetSimulation}>
            RESET SIMULATION
          </button>
        </div>
      </header>

      <section className="kpi-grid" aria-label="System overview">
        <article className="kpi-card card-blue">
          <div className="kpi-topline">
            <span className="kpi-icon">V</span>
            <span className="kpi-trend positive">LIVE</span>
          </div>
          <span className="kpi-label">Voltage</span>
          <strong className="kpi-value">{VOLTAGE}</strong>
          <span className="kpi-unit">V</span>
        </article>

        <article className="kpi-card card-cyan">
          <div className="kpi-topline">
            <span className="kpi-icon">A</span>
            <span className="kpi-trend positive">FLOW</span>
          </div>
          <span className="kpi-label">Current</span>
          <strong className="kpi-value">{current.toFixed(2)}</strong>
          <span className="kpi-unit">A</span>
        </article>

        <article className="kpi-card card-orange">
          <div className="kpi-topline">
            <span className="kpi-icon">W</span>
            <span className="kpi-trend positive">LOAD</span>
          </div>
          <span className="kpi-label">Power</span>
          <strong className="kpi-value">{activePower}</strong>
          <span className="kpi-unit">W</span>
        </article>

        <article className="kpi-card card-purple">
          <div className="kpi-topline">
            <span className="kpi-icon">kWh</span>
            <span className="kpi-trend positive">TOTAL</span>
          </div>
          <span className="kpi-label">Energy Consumed</span>
          <strong className="kpi-value">{energy.toFixed(3)}</strong>
          <span className="kpi-unit">kWh</span>
        </article>

        <article className="kpi-card card-green">
          <div className="kpi-topline">
            <span className="kpi-icon">₹</span>
            <span className="kpi-trend positive">BALANCE</span>
          </div>
          <span className="kpi-label">Prepaid Balance</span>
          <strong className="kpi-value">{formatCurrency(balance)}</strong>
          <span className="kpi-unit">&nbsp;</span>
        </article>
      </section>

      <main className="electrical-stage">
        <section className="system-panel physical-panel-section" aria-label="Electrical panel">
          <h2 className="physical-panel-heading">ELECTRICAL PANEL</h2>
          <div className="panel-wall">
            <div className="electrical-panel-enclosure">
              <span className="panel-mount mount-top-left" />
              <span className="panel-mount mount-top-right" />
              <span className="panel-mount mount-bottom-left" />
              <span className="panel-mount mount-bottom-right" />
              <div className="enclosure-face">
                <div className="enclosure-brand"><span>RESIDENTIAL</span><span className={`enclosure-status ${supplyOn ? "is-on" : "is-off"}`} /></div>
                <div className="breaker-compartment">
                  <div className="main-mcb-device">
                    <span className="main-mcb-label">MAIN MCB</span>
                    <div className="main-mcb-hardware">
                      <div className="mcb-scale"><span>I</span><span>O</span></div>
                      <button
                        type="button"
                        className={`physical-mcb-lever ${mcbOn ? "is-on" : "is-off"}`}
                        onClick={onToggleMcb}
                        aria-label={`Main MCB ${mcbOn ? "on" : "off"}`}
                        aria-pressed={mcbOn}
                      >
                        <span className="mcb-lever-grip" />
                      </button>
                    </div>
                    <span className={`main-mcb-status ${supplyOn ? "is-on" : "is-off"}`}><i />{supplyOn ? "ON" : "OFF"}</span>
                  </div>
                  <div className="branch-circuit-list">
                    {APPLIANCE_META.map((appliance) => {
                      const circuitOn = Boolean(appliances[appliance.id] && supplyOn);
                      return (
                        <div key={appliance.id} className={`panel-circuit-row ${circuitOn ? "is-on" : "is-off"}`}>
                          <span className="panel-circuit-label">{appliance.label.toUpperCase()}</span>
                          <span className="miniature-breaker"><i /></span>
                          <span className="circuit-status-led" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="enclosure-lower-rail"><i /><i /><i /><i /><i /><i /></div>
              </div>
            </div>
          </div>
        </section>

        <aside className="panel side-panel" aria-label="Live load monitoring">
          <div className="panel-header-row">
            <h2>LIVE LOAD MONITORING</h2>
          </div>

          <div className="monitor-grid">
            <div className="metric-inline">
              <span className="metric-label">TOTAL ACTIVE POWER</span>
              <strong>{activePower} W</strong>
            </div>
            <div className="metric-inline">
              <span className="metric-label">CURRENT</span>
              <strong>{current.toFixed(2)} A</strong>
            </div>
            <div className="metric-inline">
              <span className="metric-label">POWER FACTOR</span>
              <strong>{POWER_FACTOR.toFixed(2)}</strong>
            </div>
            <div className="metric-inline">
              <span className="metric-label">VOLTAGE</span>
              <strong>{VOLTAGE} V</strong>
            </div>
          </div>

          <div className="load-meter">
            <div className="load-header">
              <span>LOAD UTILIZATION</span>
              <strong>{Math.round(loadPercentage)}%</strong>
            </div>

            <div className="load-bar" aria-label="Load utilization bar">
              {Array.from({ length: 16 }, (_, index) => (
                <span
                  key={index}
                  className={index < Math.round((loadPercentage / 100) * 16) ? "bar-segment active" : "bar-segment"}
                />
              ))}
            </div>
          </div>

        </aside>
      </main>

      <section className="panel controls-panel" aria-label="Appliance load control">
        <div className="panel-header-row controls-header">
          <h2>APPLIANCE / LOAD CONTROL</h2>
          {!supplyOn && <span className="supply-lock">SUPPLY OFF</span>}
        </div>

        <div className="appliance-grid">
          {APPLIANCE_META.map((appliance) => {
            const isActive = appliances[appliance.id] && supplyOn;
            const contribution = isActive ? appliance.watts : 0;

            return (
              <article key={appliance.id} className={`appliance-card ${isActive ? "active" : ""} ${!supplyOn ? "disabled" : ""}`}>
                <div className="appliance-top">
                  <span className={`appliance-icon ${appliance.id}`} aria-hidden="true">
                    {appliance.id === "light" ? "L" : appliance.id === "fan" ? "F" : appliance.id === "tv" ? "T" : "A"}
                  </span>
                  <div className="appliance-copy">
                    <h3>{appliance.label}</h3>
                    <span>{appliance.watts} W</span>
                  </div>
                </div>

                <div className="appliance-status">
                  <span className={`dot ${isActive ? "on" : "off"}`} />
                  <span>{isActive ? "RUNNING" : "OFF"}</span>
                </div>

                <button
                  type="button"
                  className={`toggle-button ${isActive ? "toggle-on" : "toggle-off"}`}
                  onClick={() => onToggleAppliance(appliance.id)}
                  disabled={!supplyOn}
                >
                  <span className="toggle-track">
                    <span className="toggle-thumb" />
                  </span>
                  <span>{isActive ? "ON" : "OFF"}</span>
                </button>

                <div className="power-contribution">ACTIVE POWER: {contribution} W</div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel chart-panel" aria-label="Live energy consumption chart">
        <div className="panel-header-row chart-header">
          <h2>LIVE ENERGY CONSUMPTION</h2>
          <div className="chart-summary">
            <span>LIVE</span>
            <strong>{energy.toFixed(3)} kWh</strong>
          </div>
        </div>

        <div className="chart-wrap">
          <div className="chart-meta">
            <span>kWh</span>
            <span>CURRENT</span>
            <span>PEAK</span>
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Energy chart">
            {[0, 1, 2, 3, 4].map((line) => (
              <line
                key={line}
                x1="0"
                x2="100"
                y1={20 + line * 18}
                y2={20 + line * 18}
                className="chart-grid"
              />
            ))}
            <polyline className="chart-line" points={chartPoints} />
            <circle className="chart-dot" cx={100} cy={100} r="2.5" />
          </svg>
        </div>
      </section>

      <div className="bottom-grid">
        <section className="panel recharge-panel" aria-label="Prepaid recharge panel">
          <div className="panel-header-row">
            <h2>PREPAID RECHARGE</h2>
          </div>

          <div className="balance-summary">
            <span className="summary-label">Current Balance:</span>
            <strong>{formatCurrency(balance)}</strong>
          </div>

          <div className="balance-health">
            <div className="health-row">
              <span>BALANCE HEALTH</span>
              <strong>{Math.max(0, Math.round(balanceProgress))}%</strong>
            </div>
            <div className="level-track small">
              <span className={`level-fill ${meterTone}`} style={{ width: `${balanceProgress}%` }} />
            </div>
          </div>

          <div className="recharge-actions">
            {[50, 100, 500].map((amount) => (
              <button
                key={amount}
                type="button"
                className={`recharge-button color-${amount === 50 ? "blue" : amount === 100 ? "orange" : "purple"}`}
                onClick={() => onRecharge(amount)}
              >
                + ₹{amount}
              </button>
            ))}
          </div>

          <div className="tariff-note">Tariff: ₹{TARIFF} / kWh</div>
        </section>

        <section className="panel status-panel" aria-label="System status alerts">
          <div className="panel-header-row">
            <h2>SYSTEM STATUS</h2>
          </div>

          <div className="status-list">
            <div className={`status-row ${supplyOn ? "status-ok" : "status-critical"}`}>
              <span>SUPPLY</span>
              <strong>{supplyOn ? "ON" : "OFF"}</strong>
            </div>
            <div className="status-row status-ok">
              <span>METER</span>
              <strong>ACTIVE</strong>
            </div>
            <div className="status-row status-ok">
              <span>TARIFF</span>
              <strong>₹{TARIFF} / kWh</strong>
            </div>
            <div className="status-row status-ok">
              <span>POWER FACTOR</span>
              <strong>{POWER_FACTOR.toFixed(2)}</strong>
            </div>
            <div className={`status-row ${balanceStatus === "LOW BALANCE" ? "status-warning" : balanceStatus === "EXHAUSTED" ? "status-critical" : "status-ok"}`}>
              <span>BALANCE STATUS</span>
              <strong>{balanceStatus}</strong>
            </div>
          </div>

          <div className={`alert-strip ${alertTone}`}>
            {alertMessage}
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [energy, setEnergy] = useState(0);
  const [energyHistory, setEnergyHistory] = useState([0]);
  const [appliances, setAppliances] = useState(DEFAULT_APPLIANCES);
  const [mcbOn, setMcbOn] = useState(true);
  const [rechargeNotice, setRechargeNotice] = useState("");
  const [lastRecharge, setLastRecharge] = useState(null);

  const activePower = useMemo(
    () => APPLIANCE_META.reduce((total, appliance) => total + (appliances[appliance.id] ? appliance.watts : 0), 0),
    [appliances]
  );

  const supplyOn = mcbOn && balance > 0;
  const lowBalance = supplyOn && balance <= 20;
  const current = supplyOn && activePower > 0 ? activePower / (VOLTAGE * POWER_FACTOR) : 0;
  const loadPercentage = Math.min((activePower / LOAD_REFERENCE_POWER) * 100, 100);
  const balanceStatus = supplyOn ? (lowBalance ? "LOW BALANCE" : "NORMAL") : mcbOn ? "EXHAUSTED" : "PROTECTION OFF";
  const meterTone = supplyOn ? (lowBalance ? "warning" : "normal") : mcbOn ? "critical" : "warning";
  const balanceProgress = Math.max(0, Math.min((balance / STARTING_BALANCE) * 100, 100));
  const alertMessage = !mcbOn
    ? "⚠ MAIN MCB OFF — PROTECTION DISCONNECTED"
    : !supplyOn
      ? "⚠ PREPAID SUPPLY CUT-OFF — BALANCE EXHAUSTED"
      : lowBalance
        ? "⚠ LOW BALANCE — PLEASE RECHARGE"
        : "✓ SYSTEM OPERATING NORMALLY";
  const alertTone = !mcbOn ? "warning" : !supplyOn ? "critical" : lowBalance ? "warning" : "ok";

  const chartPoints = useMemo(() => {
    if (!energyHistory.length) return "";

    const maxEnergy = Math.max(...energyHistory, 0.01);

    return energyHistory
      .map((point, index) => {
        const x = (index / Math.max(energyHistory.length - 1, 1)) * 100;
        const y = 100 - (point / maxEnergy) * 82 - 8;
        return `${x},${y}`;
      })
      .join(" ");
  }, [energyHistory]);

  useEffect(() => {
    if (!supplyOn || activePower <= 0) return undefined;

    const interval = window.setInterval(() => {
      const energyIncrement = activePower / 3_600_000;
      const costIncrement = energyIncrement * TARIFF;

      setEnergy((previous) => {
        const nextEnergy = clamp(previous + energyIncrement, 6);

        setEnergyHistory((previousHistory) => {
          const nextHistory = [...previousHistory, Number(nextEnergy.toFixed(6))];
          return nextHistory.slice(-18);
        });

        return nextEnergy;
      });

      setBalance((previous) => {
        const nextBalance = clamp(previous - costIncrement, 2);

        if (nextBalance <= 0) {
          setMcbOn(false);
          setAppliances({ light: false, fan: false, tv: false, ac: false });
          return 0;
        }

        return nextBalance;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [activePower, supplyOn]);

  useEffect(() => {
    if (!rechargeNotice) return undefined;
    const timer = window.setTimeout(() => setRechargeNotice(""), 1600);
    return () => window.clearTimeout(timer);
  }, [rechargeNotice]);

  const toggleAppliance = (id) => {
    if (!supplyOn) return;
    setAppliances((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  const toggleMcb = () => {
    setMcbOn((previous) => {
      const next = !previous;
      if (!next) {
        setAppliances({ light: false, fan: false, tv: false, ac: false });
      }
      return next;
    });
  };

  const rechargeMeter = (amount) => {
    if (balance <= 0) setMcbOn(true);
    setBalance((previous) => clamp(previous + amount, 2));
    setLastRecharge(amount);
    setRechargeNotice(`✓ RECHARGE SUCCESSFUL — ₹${amount}`);
  };

  const resetSimulation = () => {
    setBalance(STARTING_BALANCE);
    setEnergy(0);
    setEnergyHistory([0]);
    setMcbOn(true);
    setAppliances(DEFAULT_APPLIANCES);
    setRechargeNotice("");
    setLastRecharge(null);
  };

  if (page === "home") {
    return (
      <>
        <ResidentialHomePage
          appliances={appliances}
          balance={balance}
          current={current}
          activePower={activePower}
          energy={energy}
          supplyOn={supplyOn}
          mcbOn={mcbOn}
          onToggleAppliance={toggleAppliance}
          onToggleMcb={toggleMcb}
          onOpenMonitoring={() => setPage("monitoring")}
          onResetSimulation={resetSimulation}
          lastRecharge={lastRecharge}
        />
        {rechargeNotice && <div className="toast">{rechargeNotice}</div>}
      </>
    );
  }

  return (
    <>
      <LiveMonitoringPage
        balance={balance}
        energy={energy}
        activePower={activePower}
        current={current}
        supplyOn={supplyOn}
        appliances={appliances}
        mcbOn={mcbOn}
        onToggleAppliance={toggleAppliance}
        onToggleMcb={toggleMcb}
        onResetSimulation={resetSimulation}
        onRecharge={rechargeMeter}
        onGoHome={() => setPage("home")}
        loadPercentage={loadPercentage}
        balanceProgress={balanceProgress}
        meterTone={meterTone}
        alertMessage={alertMessage}
        alertTone={alertTone}
        balanceStatus={balanceStatus}
        chartPoints={chartPoints}
      />
      {rechargeNotice && <div className="toast">{rechargeNotice}</div>}
    </>
  );
}

export default App;