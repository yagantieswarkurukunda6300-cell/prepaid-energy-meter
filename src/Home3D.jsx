import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace } from "three";
import "./Home3D.css";

function ApplianceTarget({ id, label, labelPosition, active, supplyOn, onToggle, children }) {
  const [hovered, setHovered] = useState(false);
  const available = supplyOn;

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        if (available) onToggle(id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        if (available) {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {children(hovered)}
      {hovered && (
        <Html position={labelPosition} center distanceFactor={9}>
          <span className="scene-hover-label">{label} · {active ? "ON" : "OFF"}</span>
        </Html>
      )}
    </group>
  );
}

function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <planeGeometry args={[10, 9]} />
        <meshStandardMaterial color="#ad8d6c" roughness={0.78} />
      </mesh>
      {Array.from({ length: 9 }, (_, index) => (
        <mesh key={`floor-x-${index}`} position={[-4.5 + index * 1.125, -0.065, 0]} receiveShadow>
          <boxGeometry args={[0.018, 0.008, 8.95]} />
          <meshStandardMaterial color="#796148" roughness={0.85} />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={`floor-z-${index}`} position={[0, -0.064, -4 + index * 1.12]} receiveShadow>
          <boxGeometry args={[9.95, 0.008, 0.018]} />
          <meshStandardMaterial color="#796148" roughness={0.85} />
        </mesh>
      ))}

      <mesh position={[0, 2.55, -4.45]} receiveShadow>
        <boxGeometry args={[10, 5.2, 0.22]} />
        <meshStandardMaterial color="#e8dfd1" roughness={0.92} />
      </mesh>
      <mesh position={[-4.92, 2.55, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5.2, 8.9]} />
        <meshStandardMaterial color="#d6c8b7" roughness={0.92} />
      </mesh>
      <mesh position={[4.92, 2.55, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5.2, 8.9]} />
        <meshStandardMaterial color="#d6c8b7" roughness={0.92} />
      </mesh>

      <mesh position={[0, 5.12, -2.35]} receiveShadow>
        <boxGeometry args={[10, 0.16, 4.25]} />
        <meshStandardMaterial color="#f2ebdf" roughness={0.92} />
      </mesh>
      <mesh position={[-4.84, 5.12, 2.1]} receiveShadow>
        <boxGeometry args={[0.22, 0.16, 4.65]} />
        <meshStandardMaterial color="#f2ebdf" roughness={0.92} />
      </mesh>
      <mesh position={[4.84, 5.12, 2.1]} receiveShadow>
        <boxGeometry args={[0.22, 0.16, 4.65]} />
        <meshStandardMaterial color="#f2ebdf" roughness={0.92} />
      </mesh>

      <mesh position={[0, 0.14, 4.18]} receiveShadow>
        <boxGeometry args={[10, 0.28, 0.12]} />
        <meshStandardMaterial color="#73543d" roughness={0.72} />
      </mesh>
      <mesh position={[-4.82, 2.55, -0.2]} receiveShadow>
        <boxGeometry args={[0.16, 5.1, 0.12]} />
        <meshStandardMaterial color="#b69c7b" roughness={0.8} />
      </mesh>
      <mesh position={[4.82, 2.55, -0.2]} receiveShadow>
        <boxGeometry args={[0.16, 5.1, 0.12]} />
        <meshStandardMaterial color="#b69c7b" roughness={0.8} />
      </mesh>
    </group>
  );
}

function WindowAndCurtains() {
  return (
    <group position={[-3.78, 2.95, -4.28]}>
      <RoundedBox args={[1.65, 1.65, 0.12]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial color="#754b34" roughness={0.58} />
      </RoundedBox>
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[1.42, 1.42]} />
        <meshPhysicalMaterial color="#9dc9d3" roughness={0.16} metalness={0.08} transmission={0.16} />
      </mesh>
      <mesh position={[0, 0, 0.095]}>
        <boxGeometry args={[0.045, 1.45, 0.04]} />
        <meshStandardMaterial color="#f0e5d5" roughness={0.44} />
      </mesh>
      <mesh position={[0, 0, 0.095]}>
        <boxGeometry args={[1.45, 0.045, 0.04]} />
        <meshStandardMaterial color="#f0e5d5" roughness={0.44} />
      </mesh>
      <mesh position={[0, 0.91, 0.16]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 2.1, 16]} />
        <meshStandardMaterial color="#65513e" metalness={0.62} roughness={0.3} />
      </mesh>
      {[-0.92, 0.92].map((x) => (
        <group key={x} position={[x, 0, 0.2]}>
          <RoundedBox args={[0.43, 2.08, 0.12]} radius={0.035} smoothness={4} castShadow>
            <meshStandardMaterial color="#98614d" roughness={0.88} />
          </RoundedBox>
          {[-0.13, 0.13].map((fold) => (
            <mesh key={fold} position={[fold, 0, 0.065]} castShadow>
              <boxGeometry args={[0.035, 2.02, 0.035]} />
              <meshStandardMaterial color="#b37b62" roughness={0.86} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function FrontDoor() {
  return (
    <group position={[4.1, 1.52, -4.27]}>
      <RoundedBox args={[1.32, 3.05, 0.18]} radius={0.045} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#65402e" roughness={0.57} />
      </RoundedBox>
      <RoundedBox args={[1.03, 2.76, 0.035]} radius={0.035} smoothness={4} position={[0, 0, 0.11]} castShadow>
        <meshStandardMaterial color="#865a3c" roughness={0.49} />
      </RoundedBox>
      {[-0.35, 0.35].map((x) => (
        <RoundedBox key={x} args={[0.36, 0.48, 0.045]} radius={0.03} smoothness={4} position={[x, 0.62, 0.14]}>
          <meshStandardMaterial color="#71472f" roughness={0.5} />
        </RoundedBox>
      ))}
      <mesh position={[0.34, -0.05, 0.19]} castShadow>
        <sphereGeometry args={[0.065, 20, 16]} />
        <meshStandardMaterial color="#c29b58" metalness={0.78} roughness={0.22} />
      </mesh>
      <mesh position={[0, 1.57, 0.15]}>
        <boxGeometry args={[1.45, 0.11, 0.24]} />
        <meshStandardMaterial color="#e2d4c0" roughness={0.74} />
      </mesh>
    </group>
  );
}

function CeilingFan({ active, supplyOn, onToggle }) {
  const rotor = useRef();

  useFrame((_, delta) => {
    if (rotor.current && active && supplyOn) rotor.current.rotation.y -= delta * 7;
  });

  return (
    <ApplianceTarget id="fan" label="FAN" labelPosition={[0.12, 4.7, 0]} active={active} supplyOn={supplyOn} onToggle={onToggle}>
      {(hovered) => (
        <group>
          <mesh position={[0.12, 4.72, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.62, 20]} />
            <meshStandardMaterial color="#777e80" metalness={0.78} roughness={0.3} />
          </mesh>
          <mesh position={[0.12, 4.4, 0]} castShadow>
            <sphereGeometry args={[0.16, 24, 18]} />
            <meshStandardMaterial color="#b7b7af" metalness={0.67} roughness={0.26} emissive={hovered ? "#e8c98d" : "#000000"} emissiveIntensity={0.18} />
          </mesh>
          <group ref={rotor} position={[0.12, 4.35, 0]}>
            {[0, 1, 2, 3].map((blade) => (
              <group key={blade} rotation={[0, blade * Math.PI / 2, 0]}>
                <RoundedBox args={[0.28, 0.055, 1.28]} radius={0.1} smoothness={5} position={[0, 0, -0.72]} castShadow>
                  <meshStandardMaterial color="#aa7950" roughness={0.47} metalness={0.08} emissive={hovered ? "#d2a676" : "#000000"} emissiveIntensity={0.12} />
                </RoundedBox>
              </group>
            ))}
            <mesh castShadow>
              <sphereGeometry args={[0.14, 24, 18]} />
              <meshStandardMaterial color="#d2c7b0" metalness={0.56} roughness={0.27} />
            </mesh>
          </group>
        </group>
      )}
    </ApplianceTarget>
  );
}

function CeilingLight({ active, supplyOn, onToggle }) {
  const light = useRef();
  const glow = useRef();
  const lit = active && supplyOn;

  useFrame((_, delta) => {
    if (light.current) light.current.intensity += ((lit ? 2.2 : 0) - light.current.intensity) * Math.min(1, delta * 3);
    if (glow.current) glow.current.material.emissiveIntensity += ((lit ? 1.7 : 0.08) - glow.current.material.emissiveIntensity) * Math.min(1, delta * 3);
  });

  return (
    <ApplianceTarget id="light" label="CEILING LIGHT" labelPosition={[-2.1, 4.85, 1.35]} active={active} supplyOn={supplyOn} onToggle={onToggle}>
      {(hovered) => (
        <group position={[-2.1, 0, 0]}>
          <mesh position={[0, 4.95, 1.35]}>
            <cylinderGeometry args={[0.055, 0.055, 0.25, 16]} />
            <meshStandardMaterial color="#736c60" metalness={0.55} roughness={0.35} />
          </mesh>
          <RoundedBox args={[1.32, 0.16, 0.55]} radius={0.12} smoothness={6} position={[0, 4.75, 1.35]} castShadow>
            <meshStandardMaterial color="#e5dfd2" roughness={0.34} metalness={0.04} />
          </RoundedBox>
          <mesh ref={glow} position={[0, 4.64, 1.35]}>
            <boxGeometry args={[1.06, 0.06, 0.35]} />
            <meshStandardMaterial color="#ffe4a3" emissive="#ffbd68" emissiveIntensity={lit ? 1.7 : 0.08} roughness={0.25} />
          </mesh>
          <pointLight ref={light} color="#ffd495" position={[0, 4.5, 1.35]} intensity={0} distance={7.5} decay={2} castShadow shadow-mapSize={[512, 512]} />
          {hovered && <mesh position={[0, 4.59, 1.35]}><boxGeometry args={[1.14, 0.13, 0.42]} /><meshBasicMaterial color="#ffe6b5" transparent opacity={0.12} /></mesh>}
        </group>
      )}
    </ApplianceTarget>
  );
}

function SofaAndTable() {
  return (
    <group>
      <group position={[0.05, 0, 0.8]}>
        <RoundedBox args={[3.38, 0.92, 1.02]} radius={0.2} smoothness={7} position={[0, 0.72, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#9a6748" roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[2.76, 0.88, 0.42]} radius={0.16} smoothness={7} position={[0, 1.45, -0.25]} castShadow>
          <meshStandardMaterial color="#87583e" roughness={0.85} />
        </RoundedBox>
        {[-1.63, 1.63].map((x) => (
          <RoundedBox key={x} args={[0.4, 0.92, 1.1]} radius={0.17} smoothness={7} position={[x, 0.78, 0.02]} castShadow>
            <meshStandardMaterial color="#805239" roughness={0.8} />
          </RoundedBox>
        ))}
        {[-0.89, 0, 0.89].map((x, index) => (
          <RoundedBox key={x} args={[0.78, 0.58, 0.22]} radius={0.14} smoothness={7} position={[x, 1.6, 0.03]} rotation={[0.13, (index - 1) * 0.08, (index - 1) * -0.08]} castShadow>
            <meshStandardMaterial color={index === 1 ? "#c2a17b" : "#d5c0a1"} roughness={0.9} />
          </RoundedBox>
        ))}
        {[-1.15, 1.15].map((x) => (
          <mesh key={x} position={[x, 0.18, 0.22]} castShadow>
            <cylinderGeometry args={[0.065, 0.05, 0.36, 12]} />
            <meshStandardMaterial color="#4c3528" roughness={0.55} />
          </mesh>
        ))}
      </group>

      <group position={[0, 0, -0.65]}>
        <RoundedBox args={[2.2, 0.12, 1.18]} radius={0.1} smoothness={6} position={[0, 0.68, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#9a6844" roughness={0.36} />
        </RoundedBox>
        {[-0.86, 0.86].map((x) => (
          <mesh key={x} position={[x, 0.34, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.075, 0.62, 12]} />
            <meshStandardMaterial color="#65452f" roughness={0.42} metalness={0.12} />
          </mesh>
        ))}
        <RoundedBox args={[0.24, 0.27, 0.2]} radius={0.08} smoothness={5} position={[-0.4, 0.88, 0.02]} castShadow>
          <meshStandardMaterial color="#eee4d6" roughness={0.72} />
        </RoundedBox>
        <mesh position={[-0.4, 1.03, 0.02]}>
          <cylinderGeometry args={[0.075, 0.075, 0.045, 20]} />
          <meshStandardMaterial color="#704431" roughness={0.35} />
        </mesh>
        <mesh position={[0.42, 0.79, 0]} castShadow>
          <sphereGeometry args={[0.14, 18, 12]} />
          <meshStandardMaterial color="#b78e5c" roughness={0.35} />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0.45]} receiveShadow>
        <planeGeometry args={[4.1, 3.25]} />
        <meshStandardMaterial color="#9a6c52" roughness={0.94} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0.45]}>
        <planeGeometry args={[3.92, 3.07]} />
        <meshStandardMaterial color="#b89070" roughness={0.97} />
      </mesh>
    </group>
  );
}

function Television({ active, supplyOn, onToggle }) {
  const screenGlow = useRef();
  const light = useRef();
  const lit = active && supplyOn;

  useFrame(({ clock }, delta) => {
    if (screenGlow.current) screenGlow.current.material.emissiveIntensity += ((lit ? 0.65 : 0) - screenGlow.current.material.emissiveIntensity) * Math.min(1, delta * 4);
    if (light.current) light.current.intensity += ((lit ? 0.55 : 0) - light.current.intensity) * Math.min(1, delta * 3);
    if (screenGlow.current && lit) screenGlow.current.material.color.setHSL(0.53 + Math.sin(clock.elapsedTime * 0.28) * 0.015, 0.45, 0.36);
  });

  return (
    <ApplianceTarget id="tv" label="TELEVISION" labelPosition={[-2.1, 2.9, -3.66]} active={active} supplyOn={supplyOn} onToggle={onToggle}>
      {(hovered) => (
        <group position={[-2.1, 0, -3.66]}>
          <RoundedBox args={[2.45, 0.5, 0.62]} radius={0.08} smoothness={5} position={[0, 0.56, -0.12]} castShadow receiveShadow>
            <meshStandardMaterial color="#5b3e2e" roughness={0.38} />
          </RoundedBox>
          {[-0.86, 0.86].map((x) => (
            <mesh key={x} position={[x, 0.26, -0.13]} castShadow>
              <cylinderGeometry args={[0.045, 0.055, 0.5, 12]} />
              <meshStandardMaterial color="#372a24" metalness={0.2} roughness={0.42} />
            </mesh>
          ))}
          <RoundedBox args={[2.27, 1.47, 0.14]} radius={0.11} smoothness={8} position={[0, 1.93, 0.07]} castShadow>
            <meshStandardMaterial color="#15191b" metalness={0.34} roughness={0.25} emissive={hovered ? "#534b40" : "#000000"} emissiveIntensity={0.12} />
          </RoundedBox>
          <mesh ref={screenGlow} position={[0, 1.93, 0.148]}>
            <planeGeometry args={[2.04, 1.23]} />
            <meshStandardMaterial color={lit ? "#337888" : "#080b0d"} emissive={lit ? "#287d91" : "#000000"} emissiveIntensity={0} roughness={0.19} metalness={0.08} />
          </mesh>
          {lit && (
            <group position={[0, 1.93, 0.16]}>
              <mesh position={[-0.55, 0.1, 0]}>
                <planeGeometry args={[0.52, 1.2]} />
                <meshBasicMaterial color="#9dd3d0" transparent opacity={0.28} />
              </mesh>
              <mesh position={[0.48, -0.34, 0.001]}>
                <circleGeometry args={[0.32, 32]} />
                <meshBasicMaterial color="#e5ae72" transparent opacity={0.58} />
              </mesh>
            </group>
          )}
          <pointLight ref={light} position={[0, 1.92, 0.42]} color="#79d8e5" intensity={0} distance={2.8} decay={2} />
          <mesh position={[0, 1.08, 0.16]}>
            <boxGeometry args={[0.24, 0.13, 0.12]} />
            <meshStandardMaterial color="#858989" metalness={0.62} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.19, 0.16]}>
            <boxGeometry args={[0.16, 0.08, 0.025]} />
            <meshStandardMaterial color="#bd9a66" metalness={0.66} roughness={0.26} />
          </mesh>
        </group>
      )}
    </ApplianceTarget>
  );
}

function WallAC({ active, supplyOn, onToggle }) {
  const air = useRef();
  const lit = active && supplyOn;

  useFrame(({ clock }) => {
    if (air.current) air.current.material.opacity = lit ? 0.1 + (Math.sin(clock.elapsedTime * 1.3) + 1) * 0.035 : 0;
  });

  return (
    <ApplianceTarget id="ac" label="AIR CONDITIONER" labelPosition={[1.48, 4.2, -4.04]} active={active} supplyOn={supplyOn} onToggle={onToggle}>
      {(hovered) => (
        <group position={[1.48, 3.65, -4.04]}>
          <RoundedBox args={[1.75, 0.47, 0.45]} radius={0.12} smoothness={8} castShadow>
            <meshStandardMaterial color="#eee9dc" roughness={0.32} emissive={hovered ? "#726b58" : "#000000"} emissiveIntensity={0.12} />
          </RoundedBox>
          <RoundedBox args={[1.35, 0.045, 0.05]} radius={0.018} smoothness={4} position={[0, -0.15, 0.235]}>
            <meshStandardMaterial color="#b3b0a6" roughness={0.46} />
          </RoundedBox>
          <mesh position={[0.67, 0.08, 0.238]}>
            <sphereGeometry args={[0.034, 16, 12]} />
            <meshStandardMaterial color={lit ? "#53b7a1" : "#747773"} emissive={lit ? "#36b890" : "#000000"} emissiveIntensity={lit ? 1.2 : 0} />
          </mesh>
          <mesh ref={air} position={[0, -0.42, 0.26]}>
            <planeGeometry args={[1.28, 0.62]} />
            <meshBasicMaterial color="#b6e8ed" transparent opacity={0} side={2} />
          </mesh>
        </group>
      )}
    </ApplianceTarget>
  );
}

function Switchboard() {
  return (
    <group position={[3.28, 2.2, -4.3]}>
      <RoundedBox args={[0.54, 0.8, 0.12]} radius={0.06} smoothness={5}>
        <meshStandardMaterial color="#eee9df" roughness={0.5} />
      </RoundedBox>
      {[0.2, 0, -0.2].map((y) => (
        <mesh key={y} position={[0, y, 0.072]}>
          <boxGeometry args={[0.22, 0.075, 0.035]} />
          <meshStandardMaterial color="#a8a399" roughness={0.46} />
        </mesh>
      ))}
      <mesh position={[0, -0.33, 0.076]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 20]} />
        <meshStandardMaterial color="#c19d62" metalness={0.62} roughness={0.3} />
      </mesh>
    </group>
  );
}

function PrepaidMeter({ balance, energy, power, current, voltage, supplyOn }) {
  const display = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 400;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "#14231d";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = "#385544";
      context.lineWidth = 5;
      context.strokeRect(9, 9, canvas.width - 18, canvas.height - 18);
      context.textBaseline = "middle";
      context.fillStyle = "#a5d0ae";
      context.font = "600 35px Rajdhani, sans-serif";
      context.fillText("PREPAID", 28, 48);
      context.fillStyle = "#efffe7";
      context.font = "700 74px Rajdhani, sans-serif";
      context.fillText(`₹${balance.toFixed(2)}`, 26, 133);
      context.fillStyle = supplyOn ? "#84d59b" : "#f08c78";
      context.font = "700 32px Rajdhani, sans-serif";
      context.fillText(supplyOn ? "SUPPLY ON" : "SUPPLY OFF", 28, 205);
      context.fillStyle = "#b8dcbe";
      context.font = "600 29px Rajdhani, sans-serif";
      context.fillText(`${voltage}V   ${current.toFixed(2)}A`, 28, 278);
      context.fillText(`${power}W   ${energy.toFixed(3)}kWh`, 28, 345);
    }

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, [balance, current, energy, power, supplyOn, voltage]);

  useEffect(() => () => display.dispose(), [display]);

  return (
    <group position={[3.42, 1.35, -4.18]}>
      <RoundedBox args={[1.32, 1.72, 0.25]} radius={0.1} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial color="#e5e4db" roughness={0.38} metalness={0.06} />
      </RoundedBox>
      <mesh position={[0, 0.19, 0.151]}>
        <planeGeometry args={[1.08, 0.9]} />
        <meshBasicMaterial map={display} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.52, 0.137]}>
        <boxGeometry args={[0.72, 0.1, 0.025]} />
        <meshStandardMaterial color="#bdbab0" roughness={0.42} />
      </mesh>
      <mesh position={[-0.37, 0.66, 0.138]}>
        <sphereGeometry args={[0.04, 18, 12]} />
        <meshStandardMaterial color={supplyOn ? "#54be84" : "#c75143"} emissive={supplyOn ? "#45b875" : "#c75143"} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function IndoorPlant() {
  return (
    <group position={[-4.05, 0, 2.45]}>
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.27, 0.72, 28, 1, true]} />
        <meshStandardMaterial color="#76503b" roughness={0.75} side={2} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.045, 28]} />
        <meshStandardMaterial color="#49372e" roughness={0.95} />
      </mesh>
      {[
        [-0.42, 1.35, 0.04, 0.3], [-0.2, 1.78, 0.06, -0.4], [0.15, 1.55, -0.05, 0.35],
        [0.43, 1.92, 0.04, 0.55], [0.12, 2.16, 0, -0.15], [-0.48, 2.04, 0.02, -0.7],
      ].map(([x, y, z, rotation], index) => (
        <mesh key={index} position={[x * 0.5, y, z]} rotation={[0, 0, rotation]} scale={[0.24, 0.58, 0.11]} castShadow>
          <sphereGeometry args={[1, 18, 14]} />
          <meshStandardMaterial color={index % 2 ? "#50784b" : "#6e9258"} roughness={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ appliances, balance, energy, power, current, voltage, supplyOn, onToggle }) {
  const roomLight = useRef();
  useFrame((_, delta) => {
    const target = appliances.light && supplyOn ? 1.05 : 0.35;
    if (roomLight.current) roomLight.current.intensity += (target - roomLight.current.intensity) * Math.min(1, delta * 2.5);
  });

  return (
    <>
      <color attach="background" args={["#d6c9b6"]} />
      <fog attach="fog" args={["#d6c9b6", 13, 26]} />
      <ambientLight intensity={0.72} color="#fff0db" />
      <hemisphereLight intensity={0.62} color="#fff4e2" groundColor="#665142" />
      <directionalLight position={[-4, 8, 5]} intensity={2.1} color="#fff0d7" castShadow shadow-mapSize={[1536, 1536]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-6} shadow-bias={-0.0002} />
      <pointLight position={[-3.4, 3.8, -3.5]} intensity={0.9} color="#ffe5b6" distance={7} decay={2} />
      <pointLight ref={roomLight} position={[0, 4.45, -0.25]} intensity={0.35} color="#ffd99f" distance={10} decay={1.7} />

      <RoomShell />
      <WindowAndCurtains />
      <FrontDoor />
      <SofaAndTable />
      <IndoorPlant />
      <Switchboard />
      <PrepaidMeter balance={balance} energy={energy} power={power} current={current} voltage={voltage} supplyOn={supplyOn} />
      <Television active={appliances.tv} supplyOn={supplyOn} onToggle={onToggle} />
      <WallAC active={appliances.ac} supplyOn={supplyOn} onToggle={onToggle} />
      <CeilingFan active={appliances.fan} supplyOn={supplyOn} onToggle={onToggle} />
      <CeilingLight active={appliances.light} supplyOn={supplyOn} onToggle={onToggle} />

      <mesh position={[0, 4.93, -4.25]}>
        <boxGeometry args={[9.5, 0.12, 0.2]} />
        <meshStandardMaterial color="#d3c4ad" roughness={0.72} />
      </mesh>
    </>
  );
}

function Home3D({ appliances, balance, energy, power, current, voltage, supplyOn, onToggle }) {
  const [portrait, setPortrait] = useState(() => window.matchMedia("(max-width: 640px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const updateFraming = () => setPortrait(query.matches);
    query.addEventListener("change", updateFraming);
    return () => query.removeEventListener("change", updateFraming);
  }, []);

  return (
    <div className="home-scene" aria-label="Interactive 3D residential living room">
      <Canvas shadows dpr={[1, 1.6]} camera={{ position: [0, 7.3, 14.2], fov: portrait ? 70 : 39, near: 0.1, far: 45 }}>
        <Scene appliances={appliances} balance={balance} energy={energy} power={power} current={current} voltage={voltage} supplyOn={supplyOn} onToggle={onToggle} />
        <OrbitControls
          makeDefault
          target={[0, 1.95, -0.55]}
          minDistance={12}
          maxDistance={17.5}
          minPolarAngle={Math.PI / 3.8}
          maxPolarAngle={Math.PI / 2.08}
          minAzimuthAngle={-0.36}
          maxAzimuthAngle={0.36}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}

export default Home3D;