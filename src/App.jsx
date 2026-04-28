import { useState, useEffect } from "react";

// ── EMAILJS ────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_fpvhlyr";
const EMAILJS_TEMPLATE_ID = "template_ps4e8dq";
const EMAILJS_PUBLIC_KEY  = "M_-ZcSaSXDvOx1Ol4";

const sendViaEmailJS = async (templateParams) => {
  const url = "https://api.emailjs.com/api/v1.0/email/send";
  const body = {
    service_id:  EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id:     EMAILJS_PUBLIC_KEY,
    template_params: templateParams,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`EmailJS error: ${res.status}`);
};

// ── BHI BRAND COLOURS ──────────────────────────────────────────────────────
const B = {
  purple:     "#5B4B9A",
  purpleDark: "#4a3d85",
  purpleLight:"#EEEDfe",
  teal:       "#1D9E75",
  tealLight:  "#E1F5EE",
  tealMid:    "#5DCAA5",
  white:      "#FFFFFF",
  offwhite:   "#F6F6F9",
  ink:        "#1A1A2E",
  muted:      "#5A5A7A",
  rule:       "#E0E0EF",
  card:       "#F0F0FA",
  low:        "#1D9E75",
  mid:        "#C07800",
  high:       "#B02020",
};

// ── DOMAINS ────────────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id: "nervous-system",
    title: "Your Nervous System",
    subtitle: "How your body is holding the load",
    science: "Polyvagal Theory (Porges, 2011) · Window of Tolerance (Siegel, 1999)",
    scienceNote: "Your nervous system governs your capacity to think clearly, connect authentically, and lead under pressure. When it is chronically activated, it costs you in ways that willpower cannot fix.",
    intro: "These questions are not about how you think you should feel. They are about what is actually happening in your body right now, and in the weeks behind you.",
    questions: [
      {
        text: "In a typical working week, how often do you find yourself in a state of high alert: scanning for problems, unable to fully settle, even when nothing urgent is happening?",
        sub: "Not stress about a specific thing. Just a background hum of readiness.",
        options: [
          { text: "Rarely. I move in and out of alert states but return to settled fairly easily.", value: 1 },
          { text: "Sometimes. There are stretches where I cannot quite land, but they pass.", value: 2 },
          { text: "Often. The settled feeling is harder to find and does not last long when I do.", value: 3 },
          { text: "Almost always. I am not sure I know what settled feels like any more.", value: 4 },
        ],
      },
      {
        text: "When a difficult conversation or high-stakes moment is over, how long does it take you to return to a state where you feel clear and grounded?",
        sub: "Not pretending to be fine. Actually feeling it.",
        options: [
          { text: "Not long. I process it and feel the release relatively quickly.", value: 1 },
          { text: "A few hours. It lingers but I find my way back.", value: 2 },
          { text: "It stays with me for most of the day, sometimes longer.", value: 3 },
          { text: "I am not sure I return to grounded between events. The next thing arrives before I have landed from the last.", value: 4 },
        ],
      },
      {
        text: "When you notice physical signals: tension, shallow breathing, a tight chest, jaw clenched. What do you do with them?",
        sub: "Your body keeps the score even when your mind has moved on.",
        options: [
          { text: "I notice them and respond. They are useful information.", value: 1 },
          { text: "I notice them occasionally and try to attend to them.", value: 2 },
          { text: "I notice them but mostly push through.", value: 3 },
          { text: "I have stopped noticing. Or I notice and there is nothing to be done.", value: 4 },
        ],
      },
    ],
  },
  {
    id: "demands-resources",
    title: "Demand and Recovery",
    subtitle: "What is being asked and what you have to give",
    science: "Job Demands-Resources Model (Demerouti et al., 2001) · Allostatic Load (McEwen, 1998)",
    scienceNote: "When demands consistently exceed available resources, including the invisible ones such as emotional labour, cognitive load, and relational strain, the deficit accumulates in the body before it appears in the performance data.",
    intro: "High performance is not about doing more. It is about the ratio between what is demanded of you and what you have available. When that ratio tips too far and stays there, the cost compounds quietly.",
    questions: [
      {
        text: "If you mapped your week honestly: the visible demands and the invisible ones. How would you describe the ratio?",
        sub: "Not what you can push through. What is actually sustainable.",
        options: [
          { text: "Manageable. Demanding but I have enough in reserve.", value: 1 },
          { text: "Stretched. I am meeting it but there is very little left over.", value: 2 },
          { text: "The demands are outpacing my resources most of the time.", value: 3 },
          { text: "I am running a significant deficit. I have been for a while.", value: 4 },
        ],
      },
      {
        text: "How would you honestly describe the quality of your recovery between demands: evenings, weekends, time away from work?",
        sub: "Restored, or simply less depleted.",
        options: [
          { text: "Good. I recover well and come back genuinely refreshed.", value: 1 },
          { text: "Partial. I get some recovery but it does not feel complete.", value: 2 },
          { text: "Minimal. I rest but I do not really recover.", value: 3 },
          { text: "I am not sure I experience real recovery. The load is present even when I am not working.", value: 4 },
        ],
      },
      {
        text: "The things that genuinely restore you: the activities, the quiet, the connection. How present are they in your current life?",
        sub: "Not the things you know you should do. The ones that actually work.",
        options: [
          { text: "Present. I protect them and they work.", value: 1 },
          { text: "Occasional. They happen but not reliably enough.", value: 2 },
          { text: "Rare. They have been displaced by everything else.", value: 3 },
          { text: "Absent. I cannot remember the last time I felt genuinely restored.", value: 4 },
        ],
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep as Performance",
    subtitle: "The recovery you cannot negotiate with",
    science: "Sleep and Cognitive Performance (Walker, 2017) · Sleep Deprivation and Leadership (Harrison and Horne, 2000)",
    scienceNote: "Sleep is the primary physiological mechanism through which the brain consolidates, your nervous system resets, and your capacity for clear decision-making is restored. It is not a lifestyle choice. It is the infrastructure of your performance.",
    intro: "Sleep is not rest. It is the process through which your brain consolidates, your nervous system resets, and your capacity for clear decision-making is restored. What your sleep looks like is data.",
    questions: [
      {
        text: "How would you describe your sleep over the past month: not the hours, but the quality?",
        sub: "What your body is actually getting, not what you aim for.",
        options: [
          { text: "Restorative most nights. I wake feeling that sleep has done something.", value: 1 },
          { text: "Variable. Some nights are good. Others undo them.", value: 2 },
          { text: "Consistently disrupted. I wake tired more often than rested.", value: 3 },
          { text: "Chronically poor. I have adapted to functioning on insufficient sleep but I know the cost.", value: 4 },
        ],
      },
      {
        text: "When you cannot sleep: or sleep badly. What is most often present?",
        sub: null,
        options: [
          { text: "Nothing particular. It comes and goes without a clear pattern.", value: 1 },
          { text: "Physical restlessness or discomfort.", value: 2 },
          { text: "My mind running: reviewing, planning, processing things from the day.", value: 3 },
          { text: "A kind of vigilance I cannot switch off. Alert without a reason.", value: 4 },
        ],
      },
      {
        text: "How honest are you with the people around you about the impact that poor sleep is having?",
        sub: "Not managing it. Naming it.",
        options: [
          { text: "Fairly honest. I acknowledge it and take it seriously.", value: 1 },
          { text: "Partially. I mention it but do not let on how significant it is.", value: 2 },
          { text: "I minimise it. It is easier to say I am fine.", value: 3 },
          { text: "No one knows. Including perhaps me.", value: 4 },
        ],
      },
    ],
  },
  {
    id: "isolation",
    title: "The Load You Carry Alone",
    subtitle: "Isolation, loneliness and the cost of being the one others lean on",
    science: "Leadership Loneliness (Cacioppo and Patrick, 2008) · Emotional Labour (Hochschild, 1983) · Gender and Network Narrowing in Senior Leadership",
    scienceNote: "Research consistently shows that perceived isolation, particularly the gap between the face presented and the reality lived, is one of the most significant and least measured contributors to leader depletion. The higher women rise, the narrower the circle of people they can be fully honest with.",
    intro: "The higher you go, the fewer people you can be fully honest with. This is not a personal failing. It is a structural reality of senior leadership. And it has a cost that does not appear in any performance review.",
    questions: [
      {
        text: "How many people in your life can you be completely honest with about what leading actually costs you?",
        sub: "Not venting. Genuine honesty about the weight of it.",
        options: [
          { text: "Several. I have people I can be fully honest with and they can hold it.", value: 1 },
          { text: "One or two. It is limited but it is there.", value: 2 },
          { text: "Almost no one. There are fragments of honesty but not the whole picture.", value: 3 },
          { text: "No one. The position itself makes full honesty impossible.", value: 4 },
        ],
      },
      {
        text: "When you are the person others bring their difficulties to: at work, at home, in both. Where do you take yours?",
        sub: "Not managing it. Not resolving it. Just: where does it go?",
        options: [
          { text: "I have somewhere to take them and I use it.", value: 1 },
          { text: "I have somewhere but I do not use it as much as I should.", value: 2 },
          { text: "Mostly I carry them. There is not really a place for them to go.", value: 3 },
          { text: "They stay with me. I have learned to hold them without anywhere to put them.", value: 4 },
        ],
      },
      {
        text: "How would you describe the gap between how you appear in your professional life and what is actually happening inside you?",
        sub: "Not imposter syndrome. The performance of okayness.",
        options: [
          { text: "Small. What people see is reasonably close to what is actually happening.", value: 1 },
          { text: "Moderate. There is a gap but it does not feel unsustainable.", value: 2 },
          { text: "Significant. A considerable amount of energy goes into managing that gap.", value: 3 },
          { text: "Very large. The version of me that leads and the version of me that is actually here are quite different people.", value: 4 },
        ],
      },
    ],
  },
  {
    id: "somatic",
    title: "Your Body as Data",
    subtitle: "The intelligence you have been trained to override",
    science: "Somatic Experiencing (Levine, 1997) · Interoception and Decision-Making (Damasio, 1994) · Embodied Cognition (Craig, 2009)",
    scienceNote: "Interoception, the ability to read and use internal body signals, is directly linked to decision quality, emotional regulation, and the capacity to lead under pressure. It is a trainable skill, and one that high-achieving women are often systematically trained out of.",
    intro: "Your body has been tracking everything. The meetings that cost more than they should. The decisions that did not sit right. The relationships that drain rather than restore. It has data you have not been given a framework to read.",
    questions: [
      {
        text: "When you make a decision that does not feel right: even if you cannot explain why. What do you do?",
        sub: "The physical knowing that arrives before the words do.",
        options: [
          { text: "I take it seriously. It is usually telling me something worth attending to.", value: 1 },
          { text: "I notice it but weigh it against the rational case.", value: 2 },
          { text: "I override it if I cannot justify it logically.", value: 3 },
          { text: "I do not really experience it that way. Or I have learned not to trust it.", value: 4 },
        ],
      },
      {
        text: "Your body keeps a different kind of record than your calendar does. If your body could report on the last six months, what would it say?",
        sub: null,
        options: [
          { text: "That it has been well used and well cared for. Challenged but not depleted.", value: 1 },
          { text: "That it has been working hard and is getting what it needs, mostly.", value: 2 },
          { text: "That it has been giving more than it has been receiving for some time.", value: 3 },
          { text: "That it is exhausted and has been waiting for someone to notice.", value: 4 },
        ],
      },
      {
        text: "The version of you that performs at your best: calm, clear, decisive, present. How accessible is she right now?",
        sub: "Not on a good day. On an ordinary Tuesday.",
        options: [
          { text: "Close. I can find her reliably and she shows up when I need her.", value: 1 },
          { text: "Available but not always. Some days are much harder than others.", value: 2 },
          { text: "Distant. She requires significant effort to access and does not always come.", value: 3 },
          { text: "I am not sure I know where she is any more.", value: 4 },
        ],
      },
    ],
  },
];

const TOTAL_Q = DOMAINS.reduce((a, d) => a + d.questions.length, 0);
const riskLevel = avg => avg <= 1.75 ? "regulated" : avg <= 2.75 ? "stretched" : "depleted";
const riskLabel = { regulated: "Regulated", stretched: "Under pressure", depleted: "Depleted" };
const riskColor = { regulated: B.low, stretched: B.mid, depleted: B.high };
const riskPct   = avg => Math.round(((avg - 1) / 3) * 100);

function BHILogo({ style = {}, height = 52 }) {
  return (
    <div style={{ ...style }}>
      <img src="/bhi_logo.jpg" alt="Business Health Institute" style={{ height: height, width: "auto", display: "block" }} />
    </div>
  );
}

const Mono = ({ children, style = {} }) => (
  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", ...style }}>
    {children}
  </span>
);

const Dots = () => (
  <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: B.purple, opacity: 0.2, animation: `dotPulse 1.3s ease-in-out ${i * 0.22}s infinite` }} />
    ))}
  </span>
);

const PAD = "48px clamp(20px, 6vw, 80px)";

function ScreenIntro({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ background: B.purple, padding: "40px clamp(20px,6vw,80px) 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", right: 40, bottom: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(93,202,165,0.08)" }} />
        <BHILogo style={{ marginBottom: 44 }} />
        <Mono style={{ color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 18 }}>A performance intelligence tool for women leaders</Mono>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,6vw,4.8rem)", fontWeight: 300, color: B.white, lineHeight: 1.2, marginBottom: 0 }}>
          The <em style={{ color: "#5DCAA5", fontStyle: "italic" }}>Unseen</em> Load
        </h1>
      </div>
      <div style={{ flex: 1, background: B.white, padding: PAD, display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.88, color: B.muted, marginBottom: 14 }}>
            You are performing. You are delivering. And something underneath it all is working harder than anyone can see.
          </p>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.88, color: B.muted, marginBottom: 36 }}>
            This is a structured reflection across five domains of performance that conventional leadership frameworks do not measure. At the end you will receive a personal performance map.
          </p>
          <div style={{ background: B.offwhite, border: `1.5px solid ${B.rule}`, borderLeft: `3px solid ${B.purple}`, padding: "18px 22px", borderRadius: 6, marginBottom: 36 }}>
            <Mono style={{ color: B.purple, display: "block", marginBottom: 8 }}>Please read before you begin</Mono>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.72, color: B.muted }}>
              The Unseen Load is a reflective tool grounded in published research. It is intended for personal reflection only and does not constitute medical, psychological, or occupational health advice. It does not diagnose or treat any condition. Business Health Institute accepts no liability for decisions made on the basis of this tool alone.
            </p>
          </div>
          <button onClick={onStart} style={btnStyle(B.purple)}>Begin &rarr;</button>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 36, display: "flex", gap: 32, flexWrap: "wrap" }}>
          {["5 domains", "15 questions", "Personal performance map", "Approx 20 minutes"].map(t => (
            <Mono key={t} style={{ color: B.muted }}>{t}</Mono>
          ))}
        </div>
      </div>
    </div>
  );
}

// FIXED: onChange handlers use direct field update — no currying bug
function ScreenContext({ onSubmit, onBack }) {
  const [form, setForm] = useState({ name: "", role: "", sector: "", stage: "", concern: "" });

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const valid = form.name && form.role && form.sector && form.stage && form.concern;

  const FL = ({ label, children }) => (
    <div>
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.muted, display: "block", marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: B.purple, padding: "28px clamp(20px,6vw,80px)" }}>
        <BHILogo />
      </div>
      <div style={{ flex: 1, background: B.white, padding: PAD }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <Mono style={{ color: B.purple }}>Before we begin</Mono>
          <div style={{ flex: 1, height: 1, background: B.rule, maxWidth: 200 }} />
        </div>
        <p style={{ color: B.muted, fontSize: "0.93rem", lineHeight: 1.8, maxWidth: 480, marginBottom: 36 }}>
          A few things that will allow your map to be specific to you. Your responses are not stored or shared.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, maxWidth: 600, marginBottom: 36 }}>
          <FL label="Your name">
            <input style={inputStyle} value={form.name} onChange={handleChange("name")} placeholder="First name is enough" />
          </FL>
          <FL label="Your current role">
            <input style={inputStyle} value={form.role} onChange={handleChange("role")} placeholder="How you would describe it honestly" />
          </FL>
          <FL label="Sector">
            <select style={inputStyle} value={form.sector} onChange={handleChange("sector")}>
              <option value="">Select</option>
              {["Financial Services","Healthcare","Education","Professional Services","Public Sector","Third Sector and NGO","Technology","Legal","Creative and Media","Manufacturing and Engineering","Retail and Consumer","Other"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </FL>
          <FL label="Stage of career">
            <select style={inputStyle} value={form.stage} onChange={handleChange("stage")}>
              <option value="">Select</option>
              <option value="early">Building: early leadership</option>
              <option value="mid">Established: mid career</option>
              <option value="senior">Senior: significant responsibility</option>
              <option value="transition">In transition or at a threshold</option>
            </select>
          </FL>
          <FL label="What brought you here today">
            <select style={inputStyle} value={form.concern} onChange={handleChange("concern")}>
              <option value="">Select the closest</option>
              <option value="tired">I am tired in a way I cannot explain</option>
              <option value="performing">I am performing well but it is costing more than it should</option>
              <option value="capacity">I feel like I am operating below my actual capacity</option>
              <option value="alone">I am carrying more than I can share with anyone</option>
              <option value="change">Something needs to change and I do not know what</option>
              <option value="curious">I am curious about what I might not be seeing</option>
            </select>
          </FL>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onBack} style={ghostBtn}>Back</button>
          <button onClick={() => valid && onSubmit(form)} style={btnStyle(valid ? B.purple : "#ccc", !valid)}>Continue &rarr;</button>
        </div>
      </div>
    </div>
  );
}

function ScreenDomainIntro({ domain, domainIndex, onContinue, onBack }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: B.purple, padding: "28px clamp(20px,6vw,80px) 44px" }}>
        <BHILogo style={{ marginBottom: 32 }} />
        <Mono style={{ color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 10 }}>
          Domain {domainIndex + 1} of {DOMAINS.length}
        </Mono>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem,4.5vw,3rem)", fontWeight: 300, color: B.white, lineHeight: 1.25, marginBottom: 8 }}>
          {domain.title}
        </h2>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#5DCAA5", fontSize: "1.05rem", fontWeight: 300 }}>
          {domain.subtitle}
        </p>
      </div>
      <div style={{ flex: 1, background: B.white, padding: PAD }}>
        <div style={{ maxWidth: 580 }}>
          <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: B.muted, marginBottom: 24 }}>{domain.intro}</p>
          <div style={{ background: B.offwhite, border: `1.5px solid ${B.rule}`, borderLeft: `3px solid ${B.teal}`, padding: "18px 22px", borderRadius: 6, marginBottom: 36 }}>
            <Mono style={{ color: B.purple, display: "block", marginBottom: 8 }}>Research foundation</Mono>
            <p style={{ fontSize: "0.81rem", lineHeight: 1.72, color: B.muted, marginBottom: 8 }}>{domain.scienceNote}</p>
            <Mono style={{ color: B.muted, lineHeight: 1.6 }}>{domain.science}</Mono>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onBack} style={ghostBtn}>Back</button>
            <button onClick={onContinue} style={btnStyle(B.purple)}>Begin this domain &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenQuestion({ domain, domainIndex, qIndex, answer, onSelect, onNext, onBack, isLast }) {
  const q = domain.questions[qIndex];
  const globalQ = DOMAINS.slice(0, domainIndex).reduce((a, d) => a + d.questions.length, 0) + qIndex;
  const pct = Math.round((globalQ / TOTAL_Q) * 100);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: B.purple, padding: "18px clamp(20px,6vw,80px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Mono style={{ color: "rgba(255,255,255,0.5)" }}>{domain.title}</Mono>
          <Mono style={{ color: "rgba(255,255,255,0.35)" }}>{globalQ + 1} / {TOTAL_Q}</Mono>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#5DCAA5", borderRadius: 2, transition: "width 0.5s ease" }} />
        </div>
      </div>
      <div style={{ flex: 1, background: B.white, padding: PAD, display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: 580, flex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem,2.7vw,1.8rem)", fontWeight: 300, color: B.ink, lineHeight: 1.5, marginBottom: q.sub ? 12 : 28 }}>
            {q.text}
          </h2>
          {q.sub && (
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: B.muted, fontSize: "0.95rem", marginBottom: 28, lineHeight: 1.6 }}>
              {q.sub}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt, i) => (
              <div
                key={i}
                onClick={() => onSelect(i)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px",
                  border: `1.5px solid ${answer === i ? B.purple : B.rule}`,
                  background: answer === i ? B.purpleLight : B.white,
                  borderRadius: 8, cursor: "pointer", transition: "all 0.17s"
                }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", fontWeight: 500, color: B.purple, minWidth: 18, marginTop: 2 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ fontSize: "0.92rem", lineHeight: 1.65, color: B.muted, fontWeight: 300 }}>{opt.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          <button onClick={onBack} style={ghostBtn}>Back</button>
          {answer !== null && answer !== undefined && (
            <button onClick={onNext} style={btnStyle(B.purple)}>
              {isLast ? "Create my map \u2192" : "Continue \u2192"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ScreenEmail({ onSubmit, onSkip }) {
  const [email, setEmail] = useState("");
  const hasEmail = email.trim().length > 0;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: B.purple, padding: "28px clamp(20px,6vw,80px)" }}>
        <BHILogo />
      </div>
      <div style={{ flex: 1, background: B.white, padding: PAD }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ marginBottom: 44 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem,2.4vw,1.4rem)", fontWeight: 300, color: B.ink, lineHeight: 1.75, marginBottom: 20 }}>
              If I asked you honestly: not the version you present at work, the honest version. Is there a part of you that knows something is off?
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1rem,2.2vw,1.3rem)", fontWeight: 300, color: B.muted, lineHeight: 1.75, marginBottom: 20 }}>
              Not wrong exactly. Just not right.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2.2vw,1.3rem)", fontWeight: 300, color: B.ink, lineHeight: 1.75, marginBottom: 24 }}>
              You are tired in a way that sleep does not fix. You are performing but it is costing you more than anyone sees. You are good at your job and you are not sure how much longer you can be this good at this cost.
            </p>
            <div style={{ borderLeft: `3px solid ${B.teal}`, paddingLeft: 20 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2.2vw,1.3rem)", fontWeight: 300, color: B.ink, lineHeight: 1.75 }}>
                That gap has a name. And it has a cost. And what you are about to read is the most honest picture of your performance that most leadership frameworks have never given you.
              </p>
            </div>
          </div>
          <div style={{ height: 1, background: B.rule, marginBottom: 36 }} />
          <Mono style={{ color: B.purple, display: "block", marginBottom: 16 }}>Your map is ready</Mono>
          <p style={{ color: B.muted, fontSize: "0.91rem", lineHeight: 1.8, marginBottom: 28 }}>
            Your performance map will display immediately. We will also send you a copy so you can return to it, and a member of the BHI team may follow up: only if that would be welcome.
          </p>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{ ...inputStyle, fontSize: "1rem", marginBottom: 20, maxWidth: 400, display: "block" }}
          />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => { if (hasEmail) onSubmit(email.trim()); }} style={btnStyle(hasEmail ? B.purple : "#ccc", !hasEmail)}>
              Show me my map &rarr;
            </button>
            <button onClick={onSkip} style={ghostBtn}>Skip for now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenGenerating({ status }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: B.purple, padding: "28px clamp(20px,6vw,80px)" }}>
        <BHILogo />
      </div>
      <div style={{ flex: 1, background: B.white, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: PAD, textAlign: "center" }}>
        <Mono style={{ color: B.purple, marginBottom: 24, display: "block" }}>Reading your responses</Mono>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3.8vw,2.6rem)", fontWeight: 300, color: B.ink, marginBottom: 36 }}>
          Creating your performance map
        </h2>
        <div style={{ width: 48, height: 48, border: `2px solid ${B.purple}`, borderRadius: "50%", animation: "pulsRing 2s ease-in-out infinite", marginBottom: 32 }} />
        <div style={{ minHeight: 22 }}>
          {status ? <Mono style={{ color: B.muted }}>{status}</Mono> : <Dots />}
        </div>
      </div>
    </div>
  );
}

function ScreenMap({ domainResults, narrative, openQuestion, userData, email }) {
  const [barsReady, setBarsReady] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setTimeout(() => setBarsReady(true), 300); }, []);

  const overallAvg = domainResults.reduce((a, d) => a + d.avg, 0) / domainResults.length;
  const overall = riskLevel(overallAvg);
  const headlines = {
    regulated: "You are operating with more regulation than many.",
    stretched:  "You are managing more than is visible.",
    depleted:   "Your system is working harder than it should have to.",
  };
  const sublines = {
    regulated: "There is capacity here. The question is how you protect it.",
    stretched:  "The performance is real. So is the cost beneath it.",
    depleted:   "What you are carrying deserves to be seen clearly.",
  };

  const handleShare = () => {
    const msg = "I just completed The Unseen Load: a performance intelligence tool for women leaders from Business Health Institute. unseenload.co.uk";
    if (navigator.share) { navigator.share({ title: "The Unseen Load", text: msg }); }
    else { navigator.clipboard.writeText(msg).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); }
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ background: B.purple, padding: "28px clamp(20px,6vw,80px) 48px" }}>
        <BHILogo style={{ marginBottom: 32 }} />
        <Mono style={{ color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 12 }}>
          Personal Performance Map {userData.name ? `— ${userData.name}` : ""}{email ? ` · ${email}` : ""}
        </Mono>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,3.8vw,2.7rem)", fontWeight: 300, color: B.white, lineHeight: 1.3, marginBottom: 10 }}>
          {headlines[overall]}
        </h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#5DCAA5", fontSize: "1.05rem", fontWeight: 300 }}>
          {sublines[overall]}
        </p>
      </div>

      <div style={{ background: B.white, padding: PAD }}>
        <div style={{ maxWidth: 660, marginBottom: 44, padding: "28px 32px", background: B.offwhite, borderLeft: `3px solid ${B.teal}`, borderRadius: 6 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.02rem", fontWeight: 300, color: B.ink, lineHeight: 1.82, marginBottom: 14 }}>
            You are not burned out. You are not failing. You are not too sensitive for the role.
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.02rem", fontWeight: 300, color: B.ink, lineHeight: 1.82 }}>
            You are a high-performing woman who has been leading without the full instrument panel. This map changes that.
          </p>
        </div>

        <Mono style={{ color: B.muted, display: "block", marginBottom: 16 }}>Your five domains</Mono>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 680, marginBottom: 44 }}>
          {domainResults.map((d, i) => {
            const lv = riskLevel(d.avg);
            const col = riskColor[lv];
            const pct = barsReady ? riskPct(d.avg) : 0;
            return (
              <div key={i} style={{ background: B.offwhite, padding: "20px 24px", borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <Mono style={{ color: B.muted, display: "block", marginBottom: 5 }}>Domain {i + 1}</Mono>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 300, color: B.ink }}>{d.title}</div>
                  </div>
                  <Mono style={{ color: col }}>{riskLabel[lv]}</Mono>
                </div>
                <div style={{ height: 3, background: B.rule, borderRadius: 2, maxWidth: 420 }}>
                  <div style={{ height: "100%", background: col, borderRadius: 2, width: `${pct}%`, transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)" }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ maxWidth: 680, background: B.offwhite, padding: "32px 36px", borderLeft: `3px solid ${B.purple}`, borderRadius: 6, marginBottom: 44 }}>
          <Mono style={{ color: B.purple, display: "block", marginBottom: 22 }}>What your map is saying</Mono>
          {narrative ? (
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.04rem", fontWeight: 300, color: B.ink, lineHeight: 1.85 }}>
              {narrative.split(/\n\n+/).filter(p => p.trim()).map((p, i, arr) => (
                <p key={i} style={{ marginBottom: i < arr.length - 1 ? 18 : 0 }}>{p.trim()}</p>
              ))}
            </div>
          ) : <Dots />}
        </div>

        {openQuestion && (
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <Mono style={{ color: B.purple, display: "block", marginBottom: 14 }}>The question this opens</Mono>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem,2.3vw,1.4rem)", fontWeight: 300, color: B.ink, lineHeight: 1.75 }}>
              {openQuestion}
            </p>
          </div>
        )}

        <div style={{ maxWidth: 660, marginBottom: 44, padding: "28px 32px", background: B.offwhite, borderLeft: `3px solid ${B.purple}`, borderRadius: 6 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.02rem", fontWeight: 300, color: B.ink, lineHeight: 1.82, marginBottom: 14 }}>
            Consider what another year without this picture actually means.
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.02rem", fontWeight: 300, color: B.ink, lineHeight: 1.82, marginBottom: 14 }}>
            Another year of decisions made from a nervous system you cannot read. Another year of performance sustained by reserves you cannot see. Another year of carrying what you carry, without knowing the cost or having the framework to change it.
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", fontWeight: 300, color: B.muted, lineHeight: 1.75 }}>
            The retreat does not cost you three days. Not going costs you everything that follows.
          </p>
        </div>

        <div style={{ maxWidth: 660, border: `1.5px solid ${B.rule}`, padding: "36px 40px", borderRadius: 10, marginBottom: 44 }}>
          <Mono style={{ color: B.purple, display: "block", marginBottom: 14 }}>The next layer</Mono>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 300, color: B.ink, marginBottom: 20 }}>
            Your map in words. Your data in your body.
          </h3>
          <div style={{ background: B.offwhite, borderLeft: `3px solid ${B.teal}`, padding: "14px 18px", borderRadius: 4, marginBottom: 24 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.93rem", color: B.muted, lineHeight: 1.75, marginBottom: 10 }}>
              The women who have sat with this data describe a particular moment. Not overwhelm. Not distress. Recognition.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.93rem", color: B.muted, lineHeight: 1.75 }}>
              That moment is available to you.
            </p>
          </div>
          <p style={{ color: B.muted, fontSize: "0.88rem", lineHeight: 1.82, marginBottom: 24 }}>
            I want you to do something. Three days. Because in three days I am going to show you things about yourself that you have never been shown before. Not what a coach thinks. Not what a 360 says. What your body is actually doing. What the system around you is actually asking. And what becomes possible when you can finally see it all in one place.
          </p>
          <div style={{ marginBottom: 24 }}>
            {[
              { n: "01", title: "The Unseen Load", color: B.purple, desc: "Your performance map: what you sense, what you carry, what the pattern reveals. The starting point for everything that follows." },
              { n: "02", title: "Firstbeat Life HRV", color: B.teal, desc: "Imagine having someone show you, in real physiological data, exactly when your body was under stress, when it was recovering, and when it was not recovering at all. Firstbeat makes that possible." },
              { n: "03", title: "OHFB Assessment", color: B.purpleDark, desc: "And imagine sitting with a diagnostic that maps the system around you: the demands it places, the resources it provides or withholds, and where the gap between the two is costing you most. Developed by Afriforte and the WorkWell Research Unit at North-West University, South Africa." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 18, padding: "14px 0", borderBottom: i < 2 ? `1px solid ${B.rule}` : "none" }}>
                <Mono style={{ color: item.color, flexShrink: 0, paddingTop: 2 }}>{item.n}</Mono>
                <div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.87rem", color: B.ink, marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: "0.81rem", lineHeight: 1.7, color: B.muted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: B.offwhite, border: `1.5px solid ${B.rule}`, padding: "16px 20px", borderRadius: 6, marginBottom: 24 }}>
            <Mono style={{ color: B.purple, display: "block", marginBottom: 10 }}>What you will leave with</Mono>
            <p style={{ fontSize: "0.83rem", lineHeight: 1.78, color: B.muted }}>
              You will not leave with a folder of insights and a list of things to think about. You will leave with a complete physiological and organisational picture of your performance, a personalised map of the specific leverage points that will make the most difference, and the clarity to act on it.
            </p>
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: B.muted, fontSize: "0.97rem", lineHeight: 1.75, marginBottom: 24 }}>
            You have been performing without the full picture. The Unseen Load gives you the first layer. The retreat gives you the rest.
          </p>
          <div style={{ borderLeft: `3px solid ${B.purple}`, paddingLeft: 20, marginBottom: 28 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.97rem", fontWeight: 300, color: B.ink, lineHeight: 1.8, marginBottom: 12 }}>
              This will feel like time away from your leadership. It is not. It is the most strategic investment in your performance you can make.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.97rem", fontWeight: 300, color: B.ink, lineHeight: 1.8 }}>
              Everything you lead flows through the instrument you are. You have spent years developing your technical capability, your strategic thinking, your relational intelligence. This is the part you have not yet been given the tools to develop.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => alert("Thank you. The BHI team will be in touch shortly.")} style={btnStyle(B.purple)}>
              I want to attend &rarr;
            </button>
            <button onClick={() => alert("A BHI consultant will be in touch to tell you more.")} style={ghostBtn}>
              Tell me more
            </button>
          </div>
        </div>

        <div style={{ maxWidth: 660, marginBottom: 44 }}>
          <div style={{ background: B.offwhite, border: `1.5px solid ${B.rule}`, borderRadius: 8, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.97rem", color: B.ink, marginBottom: 4 }}>Know someone who needs to see this?</div>
              <p style={{ fontSize: "0.79rem", color: B.muted, lineHeight: 1.6 }}>Women leaders rarely receive tools built specifically for what they carry. Share it.</p>
            </div>
            <button onClick={handleShare} style={{ ...ghostBtn, whiteSpace: "nowrap" }}>
              {copied ? "Copied" : "Share \u2192"}
            </button>
          </div>
        </div>

        <div style={{ maxWidth: 660, paddingTop: 24, borderTop: `1px solid ${B.rule}` }}>
          <Mono style={{ color: B.muted, lineHeight: 1.85, display: "block", marginBottom: 10 }}>
            The Unseen Load is a reflective performance intelligence tool developed by Business Health Institute. It is intended for personal reflection only and does not constitute medical, psychological, or occupational health advice. It does not diagnose or treat any condition.
          </Mono>
          <Mono style={{ color: B.muted, lineHeight: 1.85, display: "block", marginBottom: 10 }}>
            The retreat incorporates Firstbeat Life HRV technology (Firstbeat Technologies Ltd) and the OHFB Workplace Analytics System, developed by Afriforte and the WorkWell Research Unit, Faculty of Economic and Management Sciences, North-West University, Potchefstroom, South Africa.
          </Mono>
          <Mono style={{ color: B.muted, lineHeight: 1.85, display: "block" }}>
            &copy; {new Date().getFullYear()} Business Health Institute. All rights reserved. The Unseen Load and its frameworks are the intellectual property of Business Health Institute and may not be reproduced, adapted, or distributed without written permission.
          </Mono>
        </div>
      </div>
    </div>
  );
}

const btnStyle = (bg, disabled = false) => ({
  fontFamily: "'DM Mono', monospace",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: "0.62rem",
  background: bg,
  color: bg === B.white ? B.ink : B.white,
  border: "none",
  borderRadius: 6,
  padding: "14px 32px",
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.45 : 1,
  transition: "opacity 0.17s, transform 0.17s",
});

const ghostBtn = {
  fontFamily: "'DM Mono', monospace",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: "0.62rem",
  background: "transparent",
  color: B.muted,
  border: `1.5px solid ${B.rule}`,
  borderRadius: 6,
  padding: "13px 24px",
  cursor: "pointer",
  transition: "border-color 0.17s, color 0.17s",
};

const inputStyle = {
  width: "100%",
  background: B.white,
  border: "none",
  borderBottom: `1.5px solid ${B.rule}`,
  padding: "11px 0",
  fontFamily: "'Lato', sans-serif",
  fontSize: "0.95rem",
  color: B.ink,
  outline: "none",
  fontWeight: 300,
};

const injectGlobalStyles = () => {
  if (document.getElementById("bhi-global")) return;
  const s = document.createElement("style");
  s.id = "bhi-global";
  s.textContent = `
    @keyframes pulsRing { 0%,100%{transform:scale(1);opacity:0.5;} 50%{transform:scale(1.3);opacity:1;} }
    @keyframes dotPulse  { 0%,80%,100%{opacity:0.12;} 40%{opacity:1;} }
    @keyframes fadeUp    { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
    * { box-sizing: border-box; }
    body { margin: 0; background: #F6F6F9; }
    select option { font-family: 'Lato', sans-serif; }
    input::placeholder { color: #9090AA; }
  `;
  document.head.appendChild(s);
};

export default function App() {
  useEffect(() => { injectGlobalStyles(); }, []);

  const [screen, setScreen]       = useState("intro");
  const [userData, setUserData]   = useState({});
  const [email, setEmail]         = useState("");
  const [domainIdx, setDomainIdx] = useState(0);
  const [qIdx, setQIdx]           = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [answers, setAnswers]     = useState(() => DOMAINS.map(d => new Array(d.questions.length).fill(null)));
  const [genStatus, setGenStatus] = useState("");
  const [results, setResults]     = useState(null);

  const currentAnswer = answers[domainIdx]?.[qIdx];
  const globalQ = DOMAINS.slice(0, domainIdx).reduce((a, d) => a + d.questions.length, 0) + qIdx;
  const isLastQ = globalQ === TOTAL_Q - 1;

  const setAnswer = val => {
    setAnswers(prev => { const n = prev.map(d => [...d]); n[domainIdx][qIdx] = val; return n; });
  };

  const goNext = () => {
    const d = DOMAINS[domainIdx];
    if (qIdx < d.questions.length - 1) { setQIdx(q => q + 1); }
    else if (domainIdx < DOMAINS.length - 1) { setDomainIdx(d => d + 1); setQIdx(0); setShowIntro(true); }
    else { setScreen("email"); }
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (screen === "email") { setScreen("questions"); return; }
    if (qIdx > 0) { setQIdx(q => q - 1); }
    else if (showIntro) {
      if (domainIdx === 0) setScreen("context");
      else { setDomainIdx(d => d - 1); setQIdx(DOMAINS[domainIdx - 1].questions.length - 1); setShowIntro(false); }
    } else { setShowIntro(true); }
    window.scrollTo(0, 0);
  };

  const generateMap = async (capturedEmail = "") => {
    setScreen("generating");
    setGenStatus("");

    const statuses = [
      "Reading your nervous system patterns...",
      "Mapping demand and recovery...",
      "Analysing sleep as performance...",
      "Weighing the load you carry alone...",
      "Interpreting your body as data...",
      "Building your personal map...",
    ];
    let si = 0;
    const interval = setInterval(() => { si = (si + 1) % statuses.length; setGenStatus(statuses[si]); }, 1600);

    const domainResults = DOMAINS.map((d, di) => {
      const scores = d.questions.map((q, qi) => q.options[answers[di][qi] ?? 0].value);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return { ...d, avg, scores };
    });

    const domainSummary = domainResults.map(d => `${d.title}: ${riskLabel[riskLevel(d.avg)]} (average score ${d.avg.toFixed(2)})`).join("\n");
    const answerDetail = DOMAINS.map((d, di) =>
      `--- ${d.title} ---\n` + d.questions.map((q, qi) => `Q: ${q.text}\nA: ${q.options[answers[di][qi] ?? 0].text}`).join("\n")
    ).join("\n\n");

    const prompt = `You are writing a personal performance map for a woman leader who has just completed The Unseen Load, a five-domain performance intelligence tool by Business Health Institute.

Her context:
Name: ${userData.name || "the leader"}
Role: ${userData.role || "senior leader"}
Sector: ${userData.sector || "unspecified"}
Career stage: ${userData.stage || "unspecified"}
What brought her here: ${userData.concern || "unspecified"}

Domain results:
${domainSummary}

Her actual responses:
${answerDetail}

Write two things.

FIRST: A narrative of 3 to 4 short paragraphs. No title. Draw directly from the pattern of her answers. Name what is actually happening without euphemism. Write as if you are sitting across from her.

Absolute tone rules:
- UK English only. No em dashes. No hyphens except genuine compound words.
- Short paragraphs. Maximum four sentences per paragraph.
- Declarative statements. No rhetorical questions whatsoever.
- Do not name any frameworks or research terms. Speak her truth without their labels.
- Do not use: journey, holistic, transformative, empower, boundaries, self-care, resilience (as advice), or any coaching cliches.
- She is intelligent. Do not explain. Reflect her back to herself.
- If isolation score is high, name the specific weight of carrying this without anywhere to put it.
- If sleep score is high, acknowledge what that costs physiologically without advice.
- If demand score is high, name the invisible labour specifically.

SECOND: One single open question. One sentence only. Something she cannot stop thinking about after she reads it.

Format: narrative paragraphs, then a blank line, then exactly "OPEN QUESTION:" on its own line, then the question.`;

    let narrative = "", openQuestion = "";
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const parts = raw.split(/OPEN QUESTION:/i);
      narrative = parts[0]?.trim() || "";
      openQuestion = parts[1]?.trim() || "";
    } catch {
      const high = domainResults.filter(d => riskLevel(d.avg) === "depleted");
      const isolationHigh = riskLevel(domainResults[3].avg) !== "regulated";
      const sleepHigh = riskLevel(domainResults[2].avg) !== "regulated";
      narrative = [
        "What your responses reveal is a pattern that is more common among high-performing women than most leadership cultures acknowledge. The load is real. The gap between what is visible and what is actually happening is significant.",
        high.length > 0 ? `The areas where the weight is most concentrated: ${high.map(d => d.title).join(" and ")}. These are not peripheral concerns. They are at the centre of what is costing you.` : null,
        isolationHigh ? "There is a particular weight that comes from being the person others bring their difficulties to, while having no equivalent place to take your own. That structural isolation is not a personal failing. It is a feature of the position, and it has a cost that compounds silently." : null,
        sleepHigh ? "The sleep picture matters more than it is usually given credit for. What insufficient sleep costs physiologically: in decision quality, emotional regulation, and the nervous system's ability to reset, is not recoverable through effort alone." : null,
        "The question this opens is not about working differently. It is about understanding, for the first time, the full picture of what your performance is actually built on.",
      ].filter(Boolean).join("\n\n");
      openQuestion = "What would it mean for the way you lead if the invisible cost of your performance became as measurable as the results you produce?";
    }

    // ── EMAILJS: send directly from browser, no server needed ─────────────
    if (capturedEmail) {
  try {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: capturedEmail,
        name: userData.name,
        role: userData.role,
        sector: userData.sector,
        stage: userData.stage,
        concern: userData.concern,
        domainScores: domainSummary,
        narrative,
        openQuestion,
      })
    });
  } catch (err) {
    console.warn("Email failed:", err);
  }
}
  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: B.offwhite, minHeight: "100vh" }}>
      {screen === "intro"      && <ScreenIntro onStart={() => setScreen("context")} />}
      {screen === "context"    && <ScreenContext onSubmit={data => { setUserData(data); setDomainIdx(0); setShowIntro(true); setScreen("questions"); }} onBack={() => setScreen("intro")} />}
      {screen === "questions"  && showIntro  && <ScreenDomainIntro domain={DOMAINS[domainIdx]} domainIndex={domainIdx} onContinue={() => setShowIntro(false)} onBack={goBack} />}
      {screen === "questions"  && !showIntro && <ScreenQuestion domain={DOMAINS[domainIdx]} domainIndex={domainIdx} qIndex={qIdx} answer={currentAnswer} onSelect={setAnswer} onNext={goNext} onBack={goBack} isLast={isLastQ} />}
      {screen === "email"      && <ScreenEmail onSubmit={e => { setEmail(e); generateMap(e); }} onSkip={() => generateMap("")} />}
      {screen === "generating" && <ScreenGenerating status={genStatus} />}
      {screen === "map"        && results && <ScreenMap {...results} userData={userData} email={email} />}
    </div>
  );
}
