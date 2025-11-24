import AppRouter from "@/router/AppRouter";
import LoaderGlobal from "@/components/ui/LoaderGlobal";
import { useLoader } from "@/hooks/useLoader";

function App() {
  const loading = useLoader();

  return loading ? <LoaderGlobal /> : <AppRouter />;
}

export default App;
