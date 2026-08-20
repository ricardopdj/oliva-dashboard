import { TOKENS } from "./styles/tokens";
import { BriefingProvider } from "./state/BriefingContext";
import { useBriefing } from "./state/useBriefing";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { StepNav } from "./components/StepNav";
import { WelcomeStep } from "./components/steps/WelcomeStep";
import { CadastroStep } from "./components/steps/CadastroStep";
import { EmpresaStep } from "./components/steps/EmpresaStep";
import { PublicoStep } from "./components/steps/PublicoStep";
import { DiferenciaisStep } from "./components/steps/DiferenciaisStep";
import { ReferenciasStep } from "./components/steps/ReferenciasStep";
import { RedesStep } from "./components/steps/RedesStep";
import { MateriaisStep } from "./components/steps/MateriaisStep";
import { ChecklistStep } from "./components/steps/ChecklistStep";
import { ResumoStep } from "./components/steps/ResumoStep";

function BriefingLayout() {
  const { currentId } = useBriefing();

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: TOKENS.bgPage, minHeight: "100vh", color: TOKENS.ink }}>
      <TopBar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="oliva-content" style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <div style={{ width: "100%", maxWidth: 680, minWidth: 0 }}>
            {currentId === "boasvindas" && <WelcomeStep />}
            {currentId === "cadastro" && <CadastroStep />}
            {currentId === "empresa" && <EmpresaStep />}
            {currentId === "publico" && <PublicoStep />}
            {currentId === "diferenciais" && <DiferenciaisStep />}
            {currentId === "referencias" && <ReferenciasStep />}
            {currentId === "redes" && <RedesStep />}
            {currentId === "materiais" && <MateriaisStep />}
            {currentId === "checklist" && <ChecklistStep />}
            {currentId === "resumo" && <ResumoStep />}

            <StepNav />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BriefingProvider>
      <BriefingLayout />
    </BriefingProvider>
  );
}
