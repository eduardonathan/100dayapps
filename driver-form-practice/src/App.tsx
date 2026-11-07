import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { DriverFormPage } from "./pages/DriverFormPage";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <DriverFormPage driverId={14} />
    </LocalizationProvider>
  );
}

export default App;
